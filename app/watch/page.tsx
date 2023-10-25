'use client'

import styles from './styles.module.css'
import { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react'

import { useSearchParams } from 'next/navigation'
import { VideoData, VideoSegment } from '../video'
import apiClient from '../api_client'
import { PubSub } from '../pubsub'

export default function Page() {
  const tabs = ['transcript', 'summary', 'chat']
  const [tab, setTab] = useState(tabs[0])
  const [id, setId] = useState(useSearchParams().get('id'))
  const [currentTime, setCurrentTime] = useState(0)
  const [videoData, setVideoData] = useState<VideoData | null>(null)
  const ref = useRef(null)

  useEffect(() => {
    async function startFetching() {
      const data = await (await fetch(`/api/lecture?id=${id}`)).json();
      setVideoData(data);
    }
    startFetching();
    console.log(`Fething: ${id}`)
  }, [id]);

  useEffect(() => {
    if (ref.current == null) {
      return
    }
    const video = ref.current as HTMLVideoElement
    let lastTime = 0;
    const listener = () => {
      if (Math.abs(video.currentTime - lastTime) > 1) {
        lastTime = video.currentTime
        setCurrentTime(video.currentTime)
        console.log(`currentTime: ${video.currentTime}`)
      }
    }
    video.addEventListener('timeupdate', listener)
    console.log(`Added timeupdate listener`)
    return () => video.removeEventListener('timeupdate', listener)
  }, [videoData])

  const handleChangeTime = (time: number) => {
    console.log('setting time')
    if (ref.current === null) {
      return
    }
    const video = ref.current as HTMLVideoElement
    video.currentTime = time
    setCurrentTime(time)
  }

  if (videoData == null) {
    return <main>Loading...</main>;
  }

  return (
    <main id={styles.main} className='page-width'>
      <div id={styles.contentContainer}>
        <video ref={ref} src={videoData.url} id={styles.video} controls></video>
        {tab === 'transcript' || tab === 'summary' ?
          // TODO: summary segments
          <Transcript setCurrentTime={handleChangeTime} currentTime={currentTime} segments={tab === 'transcript' ? videoData.segments : []} />
          // TODO: chat
          : <div>TODO</div>
        }

      </div>
      <div id={styles.tabsContainer}>
        <div id={styles.tabs} className='page-width'>
          {tabs.map((thisTab, index) => <Tab key={index} name={thisTab} tab={tab} setTab={setTab} />)}
        </div>
      </div>
    </main>
  )
}

function Tab({ name, tab, setTab }: { name: string, tab: string, setTab: Dispatch<SetStateAction<string>> }) {
  return <button className={styles.tab} id={name === tab ? styles.currentTab : ''} onClick={() => setTab(name)}>{name}</button>
}

function Transcript({ segments, currentTime, setCurrentTime }: { setCurrentTime: (time: number) => void, currentTime: number, segments: VideoSegment[] }) {
  const ref = useRef(null)
  let isAutoScrolling = useRef(false)
  let isManualScrolling = useRef(false)
  const [manualScroll, setManualScroll] = useState(false)
  const [currentSegment, setCurrentSegement] = useState<any>(null)

  useEffect(() => {
    if (ref.current === null) {
      return
    }
    const div = ref.current as HTMLElement
    const listener = () => {
      console.log('is scrolling, isAutoScrolling: ' + isAutoScrolling.current)
      if (isAutoScrolling.current) {
        isAutoScrolling.current = false
      } else {
        setManualScroll(true)
        isManualScrolling.current = true
      }
    }
    div.addEventListener('scroll', listener)
    console.log(`Added scroll listener`)
    return () => div.removeEventListener('scroll', listener)
  }, [segments])

  const handleCurrentSegementChange = (segment: HTMLElement) => {
    setCurrentSegement(segment)
    if (!isManualScrolling.current) {
      isAutoScrolling.current = true
      segment.scrollIntoView(false)
    }
  }

  const disableManualScroll = (event: any) => {
    setManualScroll(false)
    isManualScrolling.current = false
    handleCurrentSegementChange(currentSegment)
  }

  return (
    <div id={styles.transcript} ref={ref}>
      {segments.map(segment =>
        <TranscriptSegment
          key={segment.id}
          segment={segment}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setCurrentSegement={handleCurrentSegementChange}
        />
      )}
      {
        manualScroll &&
        // <div id={styles.manualScrollContainer}>
         <button id={styles.manualScroll} onClick={disableManualScroll}>Synchronize Scroll</button>
        // </div>
      }
    </div>
  )
}

function TranscriptSegment(
  { segment, currentTime, setCurrentTime, setCurrentSegement }:
    { setCurrentTime: (time: number) => void, segment: VideoSegment, currentTime: number, setCurrentSegement: (segment: HTMLElement) => void }
) {
  const ref = useRef(null)
  const [current, setCurrent] = useState(false)
  useEffect(() => {
    if (ref.current === null) {
      return
    }
    const div = ref.current as HTMLElement
    if (currentTime >= segment.start && currentTime < segment.end) {
      setCurrent(true)
      setCurrentSegement(div)
    } else {
      setCurrent(false)
    }
  }, [currentTime])
  return (
    <div
      className={`${styles.transcriptSegment} ${current ? styles.highlightTranscriptSegment : ''}`}
      ref={ref}
      onClick={() => setCurrentTime(segment.start)}>
      {segment.text}
    </div>
  )
}
