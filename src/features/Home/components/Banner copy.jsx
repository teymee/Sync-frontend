import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Banner() {
  const containerRef = useRef();

  useGSAP(() => {
    // Set initial states
    gsap.set(".banner-title", {
      y: 100,
      opacity: 0
    });

    gsap.set(".floating-image", {
      y: 200,
      opacity: 0,
      scale: 0.8,
      x: 0, // Start all images at center
      rotation: 0 // Start without rotation
    });

    gsap.set(".bottom-content", {
      y: 50,
      opacity: 0
    });

    // Create master timeline
    const masterTl = gsap.timeline();

    // 1. Animate title sliding up
    masterTl.to(".banner-title", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    });

    // 2. Animate images sliding up as a stack (deck of cards effect)
    masterTl.to(".floating-image", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.05 // Very small stagger for deck effect
    }, "-=0.3");

    // 3. Spread images apart to their final positions with rotations
    masterTl.to(".image-1", {
      x: "calc(-50vw + 40%)",
      y: 1,
      rotation: -4,
      duration: 1,
      ease: "power2.out"
    }, "+=0.5")
    .to(".image-2", {
      x: "calc(-50vw + 30%)",
      y: -30,
      rotation: -4,
      duration: 1,
      ease: "power2.out"
    }, "<")
    .to(".image-3", {
      x: "calc(-50vw + 24%)",
      y: 24,
      rotation: -7,
      duration: 1,
      ease: "power2.out"
    }, "<")
    .to(".image-center", {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1,
      ease: "power2.out"
    }, "<")
    .to(".image-4", {
      x: "calc(-50vw + 58%)",
      y: -4,
      rotation: 2,
      duration: 1,
      ease: "power2.out"
    }, "<")
    .to(".image-5", {
      x: "calc(-50vw + 64%)",
      y: 12,
      rotation: 5,
      duration: 1,
      ease: "power2.out"
    }, "<")
    .to(".image-6", {
      x: "calc(-50vw + 74%)",
      y: -40,
      rotation: 6,
      duration: 1,
      ease: "power2.out"
    }, "<");

    // 4. Animate bottom content sliding up
    masterTl.to(".bottom-content", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3");

    // 5. Add subtle floating animation after everything is in place
    masterTl.add(() => {
      gsap.to(".floating-image", {
        y: "+=10",
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.2,
          from: "random"
        }
      });
    }, "+=0.5");

  }, { scope: containerRef });

  return (
    <section className="w-full" ref={containerRef}>
      <div className="banner-title">
        <h1 className="text-[80px] text-center leading-20">
          A place to display your <br /> masterpiece
        </h1>
      </div>
      
      {/* 🚨Artist image showcase  */}
      <section className="relative mt-16 w-full h-[300px]">
        {/* All images start at center and will spread apart */}
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] shadow-2xl floating-image image-1">
          <img
            className="w-[200px] h-[200px] rounded-lg"
            src="https://i.scdn.co/image/ab67616100005174c2384c86f647f1d9ae9fb3ed"
            alt=""
          />
        </div>
        
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] shadow-2xl floating-image image-2">
          <div className="space-y-6">
            <div className="w-full flex justify-center">
              <div className="bg-[#0C252D] px-4 w-fit font-medium text-sm text-white rounded-full py-1">
                JP Saxe
              </div>
            </div>
            <img
              className="w-[200px] h-[200px] rounded-lg"
              src="https://i.scdn.co/image/ab67616100005174f1b69cfc6644a19595de37be"
              alt=""
            />
          </div>
        </div>
        
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] shadow-2xl floating-image image-3">
          <img
            src="https://i.scdn.co/image/ab676161000051741cf142a710a2f3d9b7a62da1"
            className="w-[200px] h-[200px] rounded-lg"
            alt=""
          />
        </div>
        
        {/* Center image */}
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] shadow-2xl floating-image image-center">
          <img
            className="w-[200px] h-[200px] rounded-lg"
            src="https://i.scdn.co/image/ab676161000051746e835a500e791bf9c27a422a"
            alt=""
          />
        </div>
        
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] shadow-2xl floating-image image-4">
          <img
            className="w-[200px] h-[200px] rounded-lg"
            src="https://i.scdn.co/image/ab676161000051744293385d324db8558179afd9"
            alt=""
          />
        </div>
        
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] shadow-2xl floating-image image-5">
          <img
            className="w-[200px] h-[200px] rounded-lg"
            src="https://i.scdn.co/image/ab67616100005174ad85a585103dfc2f3439119a"
            alt=""
          />
        </div>
        
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] floating-image image-6">
          <div className="space-y-6">
            <div className="w-full flex justify-center">
              <div className="bg-black-1000 px-4 w-fit font-medium text-sm text-white rounded-full py-1">
                Sam smith
              </div>
            </div>
            <img
              className="w-[200px] h-[200px] rounded-lg shadow-2xl"
              src="https://i.scdn.co/image/ab67616100005174c4c97d96c08e4bb7c5f574aa"
              alt=""
            />
          </div>
        </div>
      </section>
      
      <section className="text-center space-y-8 bottom-content">
        <p className="font-semibold">
          Artist can display their masterpiece and buyers can discover
        </p>
        <div className="flex gap-x-4 items-center justify-center">
          <button className="text-sm bg-black-1000 px-6 cursor-pointer py-2 rounded-full text-white">
            Join for $80.99
          </button>
          <button className="font-semibold cursor-pointer border px-6 py-1 border-black-1000 rounded-full">
            Read more
          </button>
        </div>
      </section>
    </section>
  );
}