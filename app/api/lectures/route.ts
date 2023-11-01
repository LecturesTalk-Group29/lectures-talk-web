import { NextResponse } from 'next/server';
import OpenAI, { toFile } from 'openai';
import dbClient from '../db';
import { authenticate } from '../auth-service';
import { LectureData, LectureSegment } from '@/app/lecture';
import internal, { Readable, Writable } from 'node:stream';
import fs from 'node:fs';
import ffmpeg from 'fluent-ffmpeg';
import { finished } from 'stream/promises';
import { ChatCompletionMessageParam } from 'openai/resources/chat/index.mjs';

const videoColl = dbClient.db('lectures_talk').collection('videos')

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query: any = {}
  for(const param of searchParams.entries()) {
    query[param[0]] = param[1]
  }
  console.log(query)
  const lectures = videoColl.find(query);  

  return NextResponse.json(await lectures.toArray());
}

const openai = new OpenAI();

export async function POST(request: Request) {
  const user = authenticate(request)

  if(!user) {
    return NextResponse.json({message: 'Invalid token or token missing'}, {status: 401})
  }

  const video = await request.json()

  console.log(video)

  if(!video.url) {
    return NextResponse.json({message: 'Missing video URL'}, {status: 400})
  }

  // // TODO: Create index for videoUrl?
  const savedVideo = await videoColl.findOne({url: video.url});
  // const savedVideo = JSON.parse(fs.readFileSync('./test_document.json', 'utf-8'));

  if(savedVideo) {
    return NextResponse.json(savedVideo._id);
  }

  const doc = {
    url: video.url,
    submitter: user.username,
    status: 'pending',
    title: video.title
  } as unknown as LectureData

  doc._id = (await videoColl.insertOne(doc as any)).insertedId
  // const id = new ObjectId('651d8065b5733e28dce1cb66')
  
  start(doc)

  return NextResponse.json(doc._id);
}

async function waitForEnd(command: Writable | internal.PassThrough) {
  return new Promise((resolve) => {
    command.on('end', resolve)
  })
}

async function start(video: LectureData) {
  console.log('lecture started, time: ' +  + Date.now())
  const body = (await fetch(video.url)).body
  if (!body) {
    // TODO: Update DB document
    throw 'Unable to fetch video';
  }
  const videoPath = `${video._id}.mp4`
  const videoStream = fs.createWriteStream(videoPath);
  await finished(Readable.fromWeb(body as any).pipe(videoStream));
  console.log('video download complete')
  console.log('start conversion...')
  const command = ffmpeg(videoPath).noVideo().audioFrequency(22050).audioBitrate('32k').audioChannels(1).format('mp3').pipe();
  const chunks: Buffer[] = []
  command.on('data', function (chunk: Buffer) {
    chunks.push(chunk)
  });
  command.on('error', function(err: any, stdout: any, stderr: any) {
    console.log(err.message);
    console.log("stdout:\n" + stdout);
    console.log("stderr:\n" + stderr);
  })
  await waitForEnd(command);
  console.log('conversion complete')

  fs.unlink(videoPath, function() {console.log('file deleted')})

  // fs.writeFileSync('test.mp3', Buffer.concat(chunks))

  const api_transcription = await openai.audio.transcriptions.create({
    file: await toFile(Buffer.concat(chunks), 'unknown.mp3'),
    model: 'whisper-1',
    response_format: 'verbose_json'
  })  as any

  console.log(api_transcription);

  fs.writeFileSync('ph_test_api_transcript.txt', JSON.stringify(api_transcription))

  // const api_transcription = JSON.parse(fs.readFileSync('./api_transcript.json', 'utf-8'));

  const segments: LectureSegment[] = [];

  for(const segment of api_transcription.segments) {
    segments.push({
      id: segment.id,
      start: segment.start,
      end: segment.end,
      text: segment.text
    })
  }

  const summarySegements = await summarize(segments)
  console.log(summarySegements)

  video.language = api_transcription.language
  video.duration = api_transcription.duration
  video.text = api_transcription.text
  video.segments = segments
  video.summarySegments = summarySegements
  video.status = 'complete'
  
  console.log('lecture created, time; ' + Date.now())

  const result = await videoColl.replaceOne({_id: video._id}, video);
}

async function summarize(segments: LectureSegment[]) {
  const blocks: string[] = []
  const blockLen = 64
  for(let i = 0; i < segments.length; i += blockLen) {
    blocks.push(
      segments
        .slice(i, Math.min(i + blockLen, segments.length))
        .map(segments => segments.text)
        .join()
    )
  }
  const promises = []
  for(let i = 0; i != blocks.length; ++i) {
    const systemPrompt: ChatCompletionMessageParam = {
      role: 'system',
      content: 'The user will enter a section of a transcript, respond with a summary of the section. Use passive voice. Only respond with summary, no preamble or postamble.'
    }
    if(i !== 0) {
      const lastBlock = blocks[i - 1]
      systemPrompt.content += ' For context, this was the previous block in the transcript: ' + lastBlock.slice(Math.max(0, lastBlock.length - 200))
    }

    const userPrompt: ChatCompletionMessageParam = {
      role: 'user',
      content: blocks[i]
    }

    promises.push(openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemPrompt, userPrompt]
    }))
  }
  const responses = await Promise.all(promises)

  const summarySegements: LectureSegment[] = []

  for(let i = 0; i != responses.length; ++i) {
    summarySegements.push({
      id: i,
      start: segments[i * blockLen].start,
      end: segments[Math.min(segments.length, (i + 1) * blockLen) - 1].end,
      text: responses[i].choices[0].message.content ?? ''
    })
  }

  console.log(summarySegements)

  return summarySegements
}
// https://ia801801.us.archive.org/32/items/twitter-1055445425405263875/1055445425405263875.mp4
// aHR0cHM6Ly9pYTgwMTgwMS51cy5hcmNoaXZlLm9yZy8zMi9pdGVtcy90d2l0dGVyLTEwNTU0NDU0MjU0MDUyNjM4NzUvMTA1NTQ0NTQyNTQwNTI2Mzg3NS5tcDQ=

// http://hydro.ijs.si/v01b/c9/zfxdikmedp5hoksg7zv7ok6pgmikavnz.mp4
// aHR0cDovL2h5ZHJvLmlqcy5zaS92MDFiL2M5L3pmeGRpa21lZHA1aG9rc2c3enY3b2s2cGdtaWthdm56Lm1wNA==

// ffmpeg -vn -sn -dn -i test_vid.mp4 -c:a aac -ar 22050 -b:a 32k -ac 1 test_3.m4a
