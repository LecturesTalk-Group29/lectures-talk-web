'use client'

import { LectureData } from "@/app/lecture";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from './styles.module.css'

export default function User({ params }: { params: { user: string } }) {
    const [lectures, setLectures] = useState<LectureData[]>([])
    useEffect(() => {
        async function fetchLectures() {
            const data = await (await fetch(`/api/lectures?submitter=${params.user}`)).json();
            setLectures(data);
        }
        fetchLectures();
        console.log(`Fething lectures by: ${params.user}`)
    }, [params.user]);

    const pendingLectures = lectures.filter(lecture => lecture.status !== 'complete')
    const completeLectures = lectures.filter(lecture => lecture.status === 'complete')

    return (
        <main className='page-width'>
            <h1 className={styles.resetFont}>{params.user}</h1>
            {pendingLectures.length !== 0 && <LectureList heading={'Pending'} lectures={pendingLectures} />}
            {completeLectures.length !== 0 && <LectureList heading={'All'} lectures={completeLectures} />}
        </main>
    )
}

function LectureList({heading, lectures}: {heading: string, lectures: LectureData[]}) {
    return (
        <>
            <h2 className={styles.resetFont}>{heading}</h2>
            { lectures.map((lecture, index) => <Lecture lecture={lecture} key={index} />)}
        </>
    )
}

function Lecture({lecture }: {lecture: LectureData}) {
    return (
        <Link href={`/lectures/${lecture._id}`} className={styles.lecture}>
            <h3 className={styles.resetFont}>{lecture.title}</h3>
        </Link>
    )
}