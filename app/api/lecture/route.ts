import { NextResponse } from 'next/server';

import dbClient from '../../db';
import { ObjectId } from 'mongodb';

const video_coll = dbClient.db('lectures_talk').collection('videos');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let id = searchParams.get('id');
  if (id === null) {
    throw 'URL parameter missing'
  }

  const savedVideo = await video_coll.findOne({_id: new ObjectId(id)});

  return NextResponse.json(savedVideo);
}
