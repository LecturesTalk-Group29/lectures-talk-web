import { ObjectId } from "mongodb";

export interface VideoSegment {
    id: number;
    start: number;
    end: number;
    text: string;
}

export interface VideoData {
    _id: string;
    videoUrl: string;
    language: string;
    duration: number;
    text: string;
    segments: VideoSegment[];
    title: string,
    uploaderId: ObjectId
}
