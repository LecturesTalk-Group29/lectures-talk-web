'use client'

import styles from './styles.module.css'
import  { Dispatch, SetStateAction, useState, useEffect, useRef} from 'react' 

import { useSearchParams } from 'next/navigation'

export default function Page() {
  const tabs = ['transcript', 'summary', 'chat']
  const [tab, setTab] = useState(tabs[0])
  const [id, setId] = useState(useSearchParams().get('id'))

  const [videoData, setVideoData] = useState(null)
  useEffect(() => {
    let ignore = false;
  
    async function startFetching() {
      const data = await (await fetch(`http://localhost:3000/api/lecture?id=${id}`)).json();
      setVideoData(data);
    }
    startFetching();
    console.log(`Fething: ${id}`)
  }, [id]);

  if(videoData == null) {
    return null;
  }

  return (
    <main id={styles.main}>
      <div id={styles.contentContainer}>
        <Content tab={tab} videoData={videoData} />
      </div>
      <div id={styles.tabsContainer}>
        <div id={styles.tabs} className='page-width'>
          <Tab name={tabs[0]} tab={tab} setTab={setTab} />
          <Tab name={tabs[1]} tab={tab} setTab={setTab} />
          <Tab name={tabs[2]} tab={tab} setTab={setTab} />
        </div>
      </div>
    </main>
  )
}

function Tab({name, tab, setTab}: {name: string, tab: string, setTab: Dispatch<SetStateAction<string>>}) {
  return <button className={styles.tab} id={name === tab ? styles.currentTab : ''} onClick={() => setTab(name)}>{name}</button>
}

function Content({tab, videoData}: {tab: string, videoData: any}) {
  if(tab == 'transcript' || tab == 'summary') {
    return <Player tab={tab} videoData={videoData} />
  } else {
    return null
  }
}

function Player({tab, videoData}: {tab: string, videoData: any}) {
  const [currentTime, setCurrentTime] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    if(ref.current == null) {
      return
    }
    const video = ref.current as HTMLVideoElement
    let lastTime = 0;
    const listener = () => {
      if(Math.abs(video.currentTime - lastTime) > 1) {
        lastTime = video.currentTime
        setCurrentTime(video.currentTime)
        console.log(`currentTime: ${video.currentTime}`)
      }
    }
    video.addEventListener('timeupdate', listener)
    console.log(`Adeded timeupdate listener`)
    return () => video.removeEventListener('timeupdate', listener)
  }, [videoData])
  let handleChangeTime = (time: number) => {
    console.log('setting time')
    if(ref.current === null) {
      return
    }
    const video = ref.current as HTMLVideoElement
    video.currentTime = time
    setCurrentTime(time)
  }
  // TODO: use summary segments
  return (
    <div id={styles.player}>
      <video ref={ref}src={videoData.videoUrl} id={styles.video} controls></video>
      <Transcript setCurrentTime={handleChangeTime} currentTime={currentTime} segments={tab === 'transcript' ? videoData.segments : []}/>
    </div>
  )
}

function Transcript({segments, currentTime, setCurrentTime}: {setCurrentTime: any, currentTime: number, segments: any}) {
  let items = segments.map((segment: any) => <TranscriptSegment key={segment.id} segment={segment} currentTime={currentTime} setCurrentTime={setCurrentTime}/>)
  return (
    <div id={styles.transcript}>
      {items}
    </div>
  )
}



function TranscriptSegment({segment, currentTime, setCurrentTime}: {setCurrentTime: any, segment: any, currentTime: number}) {
  const ref = useRef(null)
  const [current, setCurrent] = useState(false)
  useEffect(() => {
    if(ref.current === null) {
      return
    }
    const div = ref.current as HTMLElement
    if(currentTime >= segment.start && currentTime < segment.end) {
      setCurrent(true)
      div.scrollIntoView(false)
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