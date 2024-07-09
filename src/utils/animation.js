import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger)
export const animatedWithGsap = (target,animationProps,scrolProps) =>{
    gsap.to(target,{
        ...animationProps,
        scrollTrigger:{
            trigger:target,
            toggleActions:'restart reverse restart reverse',
            start:'top 85%',
            ...scrolProps

        },
    })
}
export const animatedWithGsapTimeline = (timeline,rotationRef,rotationState,
    firstTarget,secondTarget,animationProps
) =>{
    timeline.to(rotationRef.current.rotation,{
        y:rotationState,
        duration:1,
        ease:'power2.inOut'
    })    
    
    timeline.to(firstTarget,{
        ...animationProps,
        ease:'power2.inOut'
    },
    '<'   //-< berguna untuk memberi tahukan animasi dilakukan di awal
)
    timeline.to(secondTarget,{
        ...animationProps,
        ease:'power2.inOut'
    },
    '<'   //-< berguna untuk memberi tahukan animasi dilakukan di awal
)
}