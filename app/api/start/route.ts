import { NextResponse } from 'next/server';
import ffmpeg from 'fluent-ffmpeg';
import { Readable, Writable } from 'node:stream';
import OpenAI, { toFile } from 'openai';
import fs from 'node:fs';

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
  const { searchParams } = new URL(request.url);
  let url = searchParams.get('url');
  if (url == null) {
    throw 'URL parameter missing'
  }
  url = atob(url);
  console.log(url);
  const buffer = Buffer.from(await (await fetch(url)).arrayBuffer())
  if (!buffer) {
    throw 'Unable to fetch video';
  }
  const reader = new Readable();
  reader._read = function () { };
  reader.push(buffer);
  reader.push(null);

  const command = ffmpeg(reader).format('mp3').pipe();

  const chunks: Buffer[] = []
  const audio_buffer: Buffer | null = null

  command.on('data', function (chunk) {
    chunks.push(chunk)
  });

  command.on('end', async function () {
    // const transcription = await new OpenAI().audio.transcriptions.create({
    //   file: await toFile(Buffer.concat(chunks), 'audio.mp3'),
    //   model: 'whisper-1'
    // })
    // console.log(transcription);
    // fs.writeFileSync('teste.mp3', Buffer.concat(chunks))
  });




  return NextResponse.json(posts);
}

// https://ia801801.us.archive.org/32/items/twitter-1055445425405263875/1055445425405263875.mp4
// aHR0cHM6Ly9pYTgwMTgwMS51cy5hcmNoaXZlLm9yZy8zMi9pdGVtcy90d2l0dGVyLTEwNTU0NDU0MjU0MDUyNjM4NzUvMTA1NTQ0NTQyNTQwNTI2Mzg3NS5tcDQ=


