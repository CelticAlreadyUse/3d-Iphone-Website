import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { animatedWithGsap } from "../utils/animation";
import { explore1Img, explore2Img, exploreVideo } from "../utils";

const Features = () => {
  const videoRef = useRef();
  useGSAP(() => {
    animatedWithGsap('#exploreVideo')
    animatedWithGsap("#features_title", { y: 0, opacity: 1 });
    animatedWithGsap("#features_second_title", { y: 0, opacity: 1,duration:0.5 });
    animatedWithGsap(
      ".g_grow",
      {
        scale: 1,
        opacity: 1,
        ease: "power1",
      },
      { scrub: 5.5 }
    )
    animatedWithGsap('.g_text',{
        y:0,
        opacity:1,
        duration:1,
        ease:"power2.inOut"
    })
  }, []);
  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">
            Explore the full story.
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div  id="features_second_title" className="mb-24 section-heading pl-24 ">
            <h2  className=" text-5xl lg:text-7xl font-semibold">iPhone.</h2>
            <h2 className="text-5xl mb-24 lg:text-7xl font-semibold">
              Forged in titanium
            </h2>
          </div>
        </div>
        <div className="flex-center flex-col smm:px-10">
          <div className="relative h-[50vh] w-full flex items-center">
            <video
              playsInline
              id="exploreVideo"
              preload="none"
              muted
              autoPlay
              className="w-full h-full object-cover"
              ref={videoRef}
            >
              <source src={exploreVideo} type="video/mp4"></source>
            </video>
          </div>
          <div className="flex flex-col w-full relative">
            <div className="overflow-hidden flex-1 h-[50vh]">
              <img
                src={explore1Img}
                alt="titanium"
                className="feature-video g_grow"
              />
            </div>
            <div className="overflow-hidden flex-1 h-[50vh]">
              <img
                src={explore2Img}
                alt="titanium"
                className="feature-video g_grow"
              />
            </div>
          </div>
          <div className="feature-text-container">
            <div className="flex-1 flex-center">
              <p className="feature-text g_text">
                iPhone 15 pro{" "}
                <span className="text-white">
                  the first iPhone to feature an aerospace-grade titanium design
                </span>
                using the same alloy that spacecrafts use for mission to Mars
              </p>
            </div>

            <div className="flex-1 flex-center">
              <p className="feature-text g_text">
               Titanium has one of the best strength-to-weight ratios of
               any metal,making these our {" "}
                <span className="text-white"    >
                lightest Pro models ever
                </span>
        You'll notice the difference the moment you pink one up.
          </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
