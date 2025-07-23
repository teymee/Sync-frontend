import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

import { SplitText, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Showcase() {
  const showCaseRef = useRef();
  useGSAP(
    () => {
      let headerSplit = SplitText.create(".header", { type: "words" });
      let descSplit = SplitText.create(".desc", { type: "words" });
      const allWords = [...headerSplit.words, ...descSplit.words];
      gsap.set(".artist-show", {
        opacity: 0,
      });

      gsap.set(allWords, {
        opacity: 0,
        y: 50,
      });

      gsap.to(headerSplit.words, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".header",
          start: "top 70%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Description animation - triggers when desc comes into view
      gsap.to(descSplit.words, {
        y: 0,
        opacity: 1,
        duration: 0.3,

        ease: "power2.out",
        scrollTrigger: {
          trigger: ".desc",
          start: "top 80%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      });
      let showcaseTL = gsap.timeline({
        scrollTrigger: {
          trigger: showCaseRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      const allArtists = gsap.utils.toArray(".artist-show");
      showcaseTL.to(".artist-show", {
        y: 0,
        opacity: 1,
        duration: 1,

        ease: "back.out",
      });

      showcaseTL.to(
        allArtists,
        {
          y: (i) => [100, 180, 280, 350][i],
          rotation: (i) => (i % 2 ? -4 : 4),
          duration: 2,
          ease: "sine.inOut",
        },
        "-=0.4"
      );
    },
    { scope: showCaseRef }
  );

  const images = [
    {
      artist: "artist",
      img: "https://i.scdn.co/image/ab67616100005174f1b69cfc6644a19595de37be",
    },
    {
      artist: "artist",
      img: "https://i.scdn.co/image/ab67616100005174c4c97d96c08e4bb7c5f574aa",
    },
    {
      artist: "artist",
      img: "https://i.scdn.co/image/ab67616100005174ad85a585103dfc2f3439119a",
    },
    {
      artist: "artist",
      img: "https://i.scdn.co/image/ab676161000051744293385d324db8558179afd9",
    },
  ];
  return (
    <section className=" wrapper">
      <section
        ref={showCaseRef}
        className="next-section  flex justify-between py-20 "
      >
        <section className=" space-y-10 w-[40%] ">
          <h2 className="text-[60px] leading-16 font-bold header">
            Showcase, Sell, <br />
            <span className="text-red-600">& acquire arts to</span> <br />
            our marketplace.
          </h2>

          <section className="w-9/12 space-y-10">
            <p className="text-gray-600 w-[70%] desc">
              Dynamic community where artists and buyers seamlessly merge.
              ArtFusion brings together creators and enthusiasts to share
              creativity.
            </p>
            <div className="flex gap-x-4 items-center">
              <button className="text-sm bg-black px-6 cursor-pointer py-2 rounded-full text-white">
                Join for $99.99
              </button>
              <button className="font-semibold cursor-pointer border px-6 py-1 border-black rounded-full">
                Read more
              </button>
            </div>
          </section>
        </section>

        <section className="w-[60%]">
          <section className="relative w-full h-[300px] ">
            {images.map(({ artist, img }, index) => {
              return (
                <div
                  key={index}
                  className="artist-show absolute position-center !top-[-8%]  "
                >
                  <img
                    src={img}
                    alt={artist}
                    className="w-[300px] h-[300px]  rounded-lg"
                  />
                </div>
              );
            })}
          </section>
        </section>
      </section>
    </section>
  );
}
