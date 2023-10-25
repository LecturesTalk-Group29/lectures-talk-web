import { ObjectId } from "mongodb";

export interface LectureSegment {
    id: number
    start: number
    end: number
    text: string
}

export interface LectureData {
    _id: ObjectId
    url: string
    language: string
    duration: number
    text: string
    segments: LectureSegment[]
    title: string
    submitter: string
    status: string
}
