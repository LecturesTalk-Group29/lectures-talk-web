import { NextResponse } from 'next/server';

import dbClient from '../db';

const video_coll = dbClient.db('lectures_talk').collection('videos')

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query: any = {}
  for(const param of searchParams.entries()) {
    query[param[0]] = param[1]
  }
  console.log(query)
  const lectures = video_coll.find(query);  

  return NextResponse.json(await lectures.toArray());
}
