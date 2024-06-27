import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { rightImg, watchImg } from '../utils'
import VideoCoursel from './VideoCoursel'
const Highlights = () => {
  useGSAP(()=>{
    gsap.to('#title',{opacity:1,y:0})
    gsap.to('.link',{opacity:1,y:0,duration:1,stagger:0.25})
  },[])
  return (
   <section id='highlights' className='w-screen overflow-hidden 
   h-full common-padding bg-zinc '>
    <div className='screen-max-width'>
      <div className='mb-12 w-full items-end md:flex  justify-between'>
        <h1 id='title' className='section-heading'>Get the HighLights.</h1>

        <div className='flex flex-wrap items-end gap-5'>
        <p className='link'>Watch the flim
        <img src={watchImg} alt='watch' className='ml-2'></img>
        </p>
        <p className='link'>Watch the flim
        <img src={rightImg} alt='right' className='ml-2'></img>
        </p>

        </div>
      </div>
      <VideoCoursel/>
    </div>
    </section>
  )
}

export default Highlights