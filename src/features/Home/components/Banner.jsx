import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

export default function Banner() {
  const wrapperRef = useRef();
  const titleRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl
        .to(".title", {
          y: -10,
          opacity: 0,
          duration:1,
        } , 1).to(".main", { opacity: 1 });

      // Initial states - combined similar elements
      gsap.set([".banner-title", ".banner-subtext"], { y: 200, opacity: 0 });
      gsap.set(".banner-subtext", { y: 50 }); // Override y for subtext
      gsap.set(".artist", {
        x: 0,
        y: 300,
        opacity: 0,
        scale: 0.8,
        rotation: -40,
      });

      tl
        // Title entrance
        .to(".banner-title", { y: 0, opacity: 1, duration: 1 }, 2)

        // Artist entrance with image center rotation
        .to(
          ".artist",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scale: 1,
            stagger: 0.01,
            rotation: 0,
          },
          "-=0.3"
        )
        .to(".image-center", { rotation: -3 }, "<")

        // Images spread - batch left and right side animations
        .to([".image-1", ".image-2", ".image-3"], {
          x: (i) => `${-90 - i * 50}%`,
          y: (i) => [1, -40, 6][i],
          rotation: -4,
          duration: 1,
          ease: "power2.out",
        })
        .to(
          [".image-4", ".image-5", ".image-6"],
          {
            x: (i) => `${80 + i * 40}%`,
            y: (i) => [1, 1, -20][i],
            rotation: 4,
            duration: 1,
            ease: "power2.out",
          },
          "<"
        )

        // Subtext entrance
        .to(
          ".banner-subtext",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        )

        // Floating animation
        .to(
          ".artist",
          {
            y: "+=10",
            yoyo: true,
            repeat: -1,
            duration: 2,
            stagger: { each: 0.2, from: "random" },
          },
          "+=1"
        );
    },
    { scope: wrapperRef }
  );

  return (
    <section ref={wrapperRef} className=" relative wrapper">
      <section className="sync">
        <div
          ref={titleRef}
          className="text-[140px] position-center absolute  title font-bold  "
        >
          SYNC.
        </div>
      </section>

      <section className=" w-full py-10 h-screen main">
        <div className="banner-title">
          <h1 className="text-[80px] text-center leading-20">
            A place to display your <br /> masterpiece
          </h1>
        </div>
        {/* 🚨Artist image showcase  */}
        <section className="relative mt-8 showcase  w-full h-[300px]">
          {/* 🚨 Left images  */}
          <>
            <div className="artist absolute position-center shadow-2xl image-1 ">
              <img
                className="w-[200px] h-[200px] rounded-lg"
                src="https://i.scdn.co/image/ab67616100005174c2384c86f647f1d9ae9fb3ed"
                alt=""
              />
            </div>
            <div className="artist absolute position-center shadow-2xl image-2 space-y-6 ">
              <div className="w-full flex justify-center">
                <div className="bg-[#0C252D] px-4 w-fit font-medium text-sm text-white rounded-full py-1 ">
                  JP Saxe
                </div>
              </div>
              <img
                className="w-[200px] h-[200px] rounded-lg"
                src="https://i.scdn.co/image/ab67616100005174f1b69cfc6644a19595de37be"
                alt=""
              />
            </div>

            <div className="artist absolute position-center shadow-2xl image-3">
              <img
                src="https://i.scdn.co/image/ab676161000051741cf142a710a2f3d9b7a62da1"
                className="w-[200px] h-[200px] rounded-lg"
                alt=""
              />
            </div>
          </>

          {/* 🚨 center image  */}
          <div className=" artist position-center shadow-2xl absolute image-center">
            <img
              className="w-[200px] h-[200px] rounded-lg"
              src="https://i.scdn.co/image/ab676161000051746e835a500e791bf9c27a422a"
              alt=""
            />
          </div>
          {/* 🚨Right images  */}
          <>
            <div className="artist absolute position-center shadow-2xl image-4  ">
              <img
                className="w-[200px] h-[200px] rounded-lg"
                src="https://i.scdn.co/image/ab676161000051744293385d324db8558179afd9"
                alt=""
              />
            </div>

            <div className="artist absolute position-center shadow-2xl image-5">
              <img
                className="w-[200px] h-[200px] rounded-lg"
                src="https://i.scdn.co/image/ab67616100005174ad85a585103dfc2f3439119a"
                alt=""
              />
            </div>
            <div className="artist absolute position-center image-6  space-y-6">
              <div className="w-full flex justify-center">
                <div className="bg-black-1000 px-4 w-fit font-medium text-sm text-white rounded-full py-1 ">
                  Sam smith
                </div>
              </div>
              <img
                className="w-[200px] h-[200px] rounded-lg shadow-2xl "
                src="https://i.scdn.co/image/ab67616100005174c4c97d96c08e4bb7c5f574aa"
                alt=""
              />
            </div>
          </>
        </section>

        <section className="text-center space-y-8 banner-subtext mt-8">
          <p className="font-semibold">
            Artist can display their masterpiece and buyers can discover
          </p>
          <div className="flex gap-x-4 items-center justify-center">
            <button className="text-sm bg-black-1000 px-6 cursor-pointer py-2 rounded-full text-white">
              Join for $80.99
            </button>
            <button className="font-semibold cursor-pointer border px-6 py-1 border-black-1000 rounded-full ">
              Read more
            </button>
          </div>
        </section>
      </section>
    </section>
  );
}
