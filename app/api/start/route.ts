import { NextResponse } from 'next/server';
import ffmpeg from 'fluent-ffmpeg';
import internal, { Readable, Writable } from 'node:stream';
const { finished } = require('stream/promises');
import OpenAI, { toFile } from 'openai';
import fs from 'node:fs';
import { Buffer } from 'node:buffer';

import dbClient from '../../db';
import { ObjectId } from 'mongodb';

const video_coll = dbClient.db('lectures_talk').collection('videos');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let url = searchParams.get('url');
  if (url === null) {
    throw 'URL parameter missing'
  }

  url = atob(url);

  // // TODO: Create index for videoUrl?
  const savedVideo = await video_coll.findOne({videoUrl: url});
  // const savedVideo = JSON.parse(fs.readFileSync('./test_document.json', 'utf-8'));

  if(savedVideo) {
    return NextResponse.json(savedVideo._id);
  }

  const doc = {
    videoUrl: url,
    status: 'pending'
  }

  const id = (await video_coll.insertOne(doc)).insertedId
  // const id = new ObjectId('651d8065b5733e28dce1cb66')

  start(url, id)

  return NextResponse.json(id);
}

async function waitForEnd(command: Writable | internal.PassThrough) {
  return new Promise((resolve) => {
    command.on('end', resolve)
  })
}

async function start(url: string, id: ObjectId) {
  // console.log('download video...')

  // const body = (await fetch(url)).body

  // if (!body) {
  //   throw 'Unable to fetch video';
  // }

  // const videoPath = `${id}.mp4`
  
  // const videoStream = fs.createWriteStream(videoPath);
  // await finished(Readable.fromWeb(body as any).pipe(videoStream));

  // console.log('video download complete')

  // // const reader = new Readable();
  // // reader._read = function () { };
  // // reader.push(buffer);
  // // reader.push(null);

  // console.log('start conversion...')

  // const command = ffmpeg(videoPath).noVideo().audioFrequency(22050).audioBitrate('32k').audioChannels(1).format('mp3').pipe();

  // const chunks: Buffer[] = []

  // command.on('data', function (chunk: Buffer) {
  //   chunks.push(chunk)
  // });

  // command.on('error', function(err: any, stdout: any, stderr: any) {
  //   console.log(err.message);
  //   console.log("stdout:\n" + stdout);
  //   console.log("stderr:\n" + stderr);
  // })

  // await waitForEnd(command);

  // console.log('conversion complete')

  // fs.unlink(videoPath, function() {console.log('file deleted')})

  // fs.writeFileSync('test.mp3', Buffer.concat(chunks))

  // const api_transcription = await new OpenAI().audio.transcriptions.create({
  //   file: await toFile(Buffer.concat(chunks), 'unknown.mp3'),
  //   model: 'whisper-1',
  //   response_format: 'verbose_json'
  // })  as any

  // console.log(api_transcription);

  // fs.writeFileSync('api_transcript.txt', JSON.stringify(api_transcription))

  const api_transcription = JSON.parse(fs.readFileSync('./api_transcript.json', 'utf-8'));


  const segments: {id: number, start: number, end: number, text: string}[] = [];

  for(const segment of api_transcription.segments) {
    segments.push({
      id: segment.id,
      start: segment.start,
      end: segment.end,
      text: segment.text
    })
  }

  const doc = {
    videoUrl: url,
    language: api_transcription.language,
    duration: api_transcription.duration,
    text: api_transcription.text,
    segments: segments,
    status: 'complete'
  }

  const result = await video_coll.replaceOne({_id: id}, doc);
}
// https://ia801801.us.archive.org/32/items/twitter-1055445425405263875/1055445425405263875.mp4
// aHR0cHM6Ly9pYTgwMTgwMS51cy5hcmNoaXZlLm9yZy8zMi9pdGVtcy90d2l0dGVyLTEwNTU0NDU0MjU0MDUyNjM4NzUvMTA1NTQ0NTQyNTQwNTI2Mzg3NS5tcDQ=

// http://hydro.ijs.si/v01b/c9/zfxdikmedp5hoksg7zv7ok6pgmikavnz.mp4
// aHR0cDovL2h5ZHJvLmlqcy5zaS92MDFiL2M5L3pmeGRpa21lZHA1aG9rc2c3enY3b2s2cGdtaWthdm56Lm1wNA==

// ffmpeg -vn -sn -dn -i test_vid.mp4 -c:a aac -ar 22050 -b:a 32k -ac 1 test_3.m4a
