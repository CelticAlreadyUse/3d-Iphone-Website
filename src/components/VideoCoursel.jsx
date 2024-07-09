import React, { useEffect, useRef, useState } from 'react'
import {hightlightsSlides} from '../constants'
import { pauseImg, playImg, replayImg } from '../utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
const VideoCoursel = () => {
  
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])
    const [video,setVideo] = useState({
        isEnd:false,
        startPlay:false,
        videoId:0,
        isLastVideo:false,
        isPlaying:false
    })
    const [loadedData,setLoadedData] = useState([])
    const{isEnd,startPlay,videoId,isLastVideo,isPlaying} =video;

        useGSAP(()=>{
            gsap.to('#slider',{
                transform:`translateX(${-100 * videoId}%)`,
                duration:2,
                ease:'power2.inOut'
            })
            gsap.to('#video',{
                scrollTrigger:{
                    trigger:'#video',
                    toggleActions:'restart none none none',
                },
                onComplete:()=>{
                    setVideo((prevVideo)=>({
                        ...prevVideo,
                        startPlay:true,
                        isPlaying:true  
                    }))
                }
            })
        },[isEnd,videoId])
        useEffect(()=>{
            if(loadedData.length >3){
                if(!isPlaying){
                    videoRef.current[videoId].pause()
                }else{
                    startPlay && videoRef.current[videoId].play()
                }
            }
        },[startPlay,videoId,isPlaying,loadedData])


        const handleLoadedMetaData = (i,e) =>setLoadedData((prev)=>[
            ...prev,e
        ])
        useEffect(()=>{
            let currentProgress = 0;
            let span = videoSpanRef.current

            if(span[videoId]){
                // animasi prosess video
                let animation = gsap.to(span[videoId],{
                    onUpdate : () =>{
                        const progress = Math.ceil(animation.progress() * 100)
                        if(progress != currentProgress){
                                currentProgress = progress

                                gsap.to(videoDivRef.current[videoId],{
                                    width:window.innerWidth<760 
                                    ? '10vw' : window.innerWidth<1200
                                    ?'10vw':'4vw'
                                })

                                gsap.to(span[videoId],{
                                    width:`${currentProgress}%`,
                                    backgroundColor:'white'
                                })
                        }
                    },
                    onComplete: () =>{
                        if(isPlaying){
                            gsap.to(videoDivRef.current[videoId],{
                                width:'12px',
                            })
                            gsap.to(span[videoId],{
                                backgroundColor:'#afafaf'
                            })
                        }
                    },

                })

                if(videoId == 0){
                    animation.restart()
                }
                const animUpdate = ()=>{
                    animation.progress(videoRef.current[videoId].currentTime/ hightlightsSlides[videoId].videoDuration)
                }

                if(isPlaying){
                    gsap.ticker.add(animUpdate)
                }else{
                    gsap.ticker.remove(animUpdate)
                }
            }
        },[videoId,startPlay])
        const handleProcess = (type,i) =>{
            if(type == 'video-end'){
                setVideo((prevVideo)=>({...prevVideo,isEnd:true,videoId:i+1}))
            }else if(type =='video-last'){
                setVideo((prevVideo)=>({...prevVideo,isLastVideo:true}))
            }else if(type =='video-reset'){
                setVideo((prevVideo)=>({...prevVideo,isLastVideo:false,videoId:0}))
            }else if(type == 'play' || 'pause'){
                setVideo((prevVideo)=>({...prevVideo,isPlaying:!prevVideo.isPlaying}))   
            }
            else{
               return video
            }
        }
      return (
    <>
    <div className='flex items-center'>
        {hightlightsSlides.map((list,i)=>(
            <div key={list.id} id='slider'
            className='sm:pr-10 pr-10'>
                <div className='video-carousel_container'>
                        <div className='w-full h-full flex-center 
                        rounded-3xl bg-black overflow-hidden'>
                                <video 
                                id='video' 
                                 muted 
                                 className={`${list.id === 2 && 'translate-x-44'} 
                                 pointer-events-none`}
                                 preload='auto'
                                 onEnded={()=>{
                                     i !== 3 ? handleProcess('video-end',i)
                                     :handleProcess('video-last')
                                 }}
                                ref={(el)=>videoRef.current[i]=el} 
                                onPlay={()=>{setVideo((prevVideo)=>({
                                    ...prevVideo,isPlaying:true
                                })
                            )}
                        }
                                  
                                 playsInline={true}
                                 onLoadedMetadata={(e)=>handleLoadedMetaData(i,e)}>
                                    <source src={list.video} type='video/mp4'></source>
                                </video>
                        </div>
                        <div className='absolute top-12 left-[5%] z-10'>
                            {list.textLists.map((text)=>(
                                <p className='md:text-2xl font-medium text-xl' key={text}>{text}</p>
                            ))}
                        </div>
                    </div>
                </div>
        ))}
    </div>
    <div className='relative flex-center mt-10'>
        <div className='flex-center py-5 px-7 rounded-full bg-gray-300 backdrop-blur'>
            {videoRef.current.map((_,i)=>(
                <span
                key={i}
                ref={(element)=>videoDivRef.current[i]=element}
                className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'>
                    <span className='absolute h-full w-full rounded-full'
                      ref={(element)=>videoSpanRef.current[i]=element}
                    >

                    </span>
                </span>
            ))}
        </div>
        <button className='control-btn'>
            <img src={isLastVideo ? replayImg : !isPlaying? playImg : pauseImg}
            onClick={isLastVideo ? ()=> handleProcess('video-reset') : !isPlaying 
                    ? ()=>handleProcess('play') : ()=>handleProcess('pause')}
            ></img>
        </button>
    </div>
    </>
  )
}

export default VideoCoursel