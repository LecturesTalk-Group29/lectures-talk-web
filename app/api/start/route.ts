import { NextResponse } from 'next/server';
import ffmpeg from 'fluent-ffmpeg';
import internal, { Readable, Writable } from 'node:stream';
import OpenAI, { toFile } from 'openai';
import fs from 'node:fs';
import { Buffer } from 'node:buffer';

// Dummy data
const posts = [
  {
    title: 'Lorem Ipsum',
    slug: 'lorem-ipsum',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  },
];

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  // let url = searchParams.get('url');
  // if (url == null) {
  //   throw 'URL parameter missing'
  // }
  // url = atob(url);
  // const buffer = Buffer.from(await (await fetch(url)).arrayBuffer())
  // if (!buffer) {
  //   throw 'Unable to fetch video';
  // }
  // const reader = new Readable();
  // reader._read = function () { };
  // reader.push(buffer);
  // reader.push(null);

  // const command = ffmpeg(reader).format('mp3').pipe();

  // const chunks: Buffer[] = []

  // command.on('data', function (chunk: Buffer) {
  //   chunks.push(chunk)
  // });

  // await waitForEnd(command);

  // // fs.writeFileSync('test.mp3', Buffer.concat(chunks))

  // const api_transcription = await new OpenAI().audio.transcriptions.create({
  //   file: await toFile(Buffer.concat(chunks), 'unknown.mp3'),
  //   model: 'whisper-1',
  //   response_format: 'verbose_json'
  // })

  const api_transcription = JSON.parse(fs.readFileSync('./whisper_response_example.json', 'utf-8'))

  const transcription: {language: string, duration: number, segments: {id: number, start: number, end: number, text: string}[]} = {
    language: api_transcription.language,
    duration: api_transcription.language,
    // text: api_transcription.text,
    segments: []
  }

  for(const segment of api_transcription.segments) {
    transcription.segments.push({
      id: segment.id,
      start: segment.start,
      end: segment.end,
      text: segment.text
    })
  }

  console.log(transcription);

  return NextResponse.json(transcription);
}

async function waitForEnd(command: Writable | internal.PassThrough) {
  return new Promise((resolve) => {
    command.on('end', resolve)
  })
}
// https://ia801801.us.archive.org/32/items/twitter-1055445425405263875/1055445425405263875.mp4
// aHR0cHM6Ly9pYTgwMTgwMS51cy5hcmNoaXZlLm9yZy8zMi9pdGVtcy90d2l0dGVyLTEwNTU0NDU0MjU0MDUyNjM4NzUvMTA1NTQ0NTQyNTQwNTI2Mzg3NS5tcDQ=
