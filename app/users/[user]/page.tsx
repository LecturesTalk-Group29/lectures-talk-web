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
        <main id={styles.main} className='page-width-no-padding'>
            <div className={styles.profile}>
                <svg className={styles.profileSvg} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#8a1c8d"></rect>
                    <text className={styles.profileSvgText} x="50%" y="50%" dominantBaseline="central" textAnchor="middle">{params.user[0]}</text>
                </svg>
                <h1 className={styles.resetFont}>{params.user}</h1>
            </div>
            {pendingLectures.length !== 0 && <LectureList heading={'Pending'} lectures={pendingLectures} />}
            {completeLectures.length !== 0 && <LectureList heading={'All'} lectures={completeLectures} />}
        </main>
    )
}

function LectureList({heading, lectures}: {heading: string, lectures: LectureData[]}) {
    return (
        <>
            <h2 className={`${styles.resetFont} ${styles.listHeading}`}>{heading}</h2>
            { lectures.map((lecture, index) => <Lecture lecture={lecture} key={index} />)}
        </>
    )
}

function Lecture({lecture }: {lecture: LectureData}) {
    return (
        <Link href={`/lectures/${lecture._id}`} className={styles.lecture}>
            <img className={styles.thumbnail}
                src={lecture.thumbnail ? `data:image/png;base64,${lecture.thumbnail.toString('base64')}` : '/thumbnail_missing.svg'} />
            <div className={styles.lectureInfo}>
                <h3 className={`${styles.resetFont} ${styles.lectureHeading}`}>{lecture.title}</h3>
                <div>Lecturer: {lecture.lecturer ?? 'Unknown'}</div>
                <div>Poster: {lecture.submitter}</div>
            </div>
        </Link>
    )
}