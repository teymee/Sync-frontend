import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const Fouth = () => {
  const carouselRef = useRef(null);
  const carouselRef2 = useRef(null);
  // Sample image data
  const images = [
    {
      id: 1,
      src:"https://i.scdn.co/image/ab676161000051741cf142a710a2f3d9b7a62da1",
  alt: "Nature landscape",
    },
    {
      id: 2,
      src: "https://i.scdn.co/image/ab6761610000517439ba6dcd4355c03de0b50918",
    alt: "City architecture",
    },
    {
      id: 3,
      src: "https://i.scdn.co/image/ab676161000051744293385d324db8558179afd9",
     alt: "Ocean waves",
    },
    {
      id: 4,
      src: "https://i.scdn.co/image/ab67616100005174bdc0709eec4b28557926fab6",
        alt: "Mountain peak",
    },
    {
      id: 5,
      src: "https://picsum.photos/400/300?random=5",
      alt: "Forest path",
    },
    {
      id: 6,
      src: "https://picsum.photos/400/300?random=6",
      alt: "Desert sunset",
    },

    
  ];

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images, ...images];

  useGSAP(() => {
    const carousel = carouselRef.current;
    const carousel2 = carouselRef2.current;
    const imageWidth = 120; // 96px + 24px gap
    const singleSetWidth = imageWidth * images.length;
    gsap.set(carousel, { x: 0 });

    // Create infinite animation
    gsap.to(carousel, {
      x: -singleSetWidth,
      duration: 15,
      repeat: -1,
      ease: "none",
      onComplete: () => {
        gsap.set([carousel], { x: 0 });
      },
    });

    gsap.fromTo(
      carousel2,
      { x: -singleSetWidth },
      {
        x: 0,
        duration: 18,
        ease: "none",
        repeat: -1,
        onComplete: () => {
          gsap.set([carousel], { x: 0 });
        },
      }
    );
    // Enhanced slithering motion with middle emphasis
    const topImages = carousel.querySelectorAll(".image");
    const bottomImages = carousel2.querySelectorAll(".image");

    // Top row enhanced slithering with middle peak
    topImages.forEach((img, index) => {
      // Base slithering motion

      // Additional middle peak animation
      gsap.to(img, {
        y: "-=30", // Higher movement when in middle
        scaleX: 1.05,
        scaleY: 0.99,
        yoyo: true,
        repeat: -1,
        duration: 3,
        delay: index * 0.2,
        ease: "power2.inOut",
      });
    });

    // Bottom row enhanced slithering with middle peak
    bottomImages.forEach((img, index) => {
      gsap.to(img, {
        y: "+=35",
        scaleX: 1.05,
        scaleY: 0.99,
        yoyo: true,
        repeat: -1,
        duration: 2.8,
        delay: index * 0.15,
        ease: "power2.inOut",
      });
    });

    const headlineSplit = SplitText.create(".headline", {
      type: "words",
    });
    const descSplit = SplitText.create(".desc", {
      type: "words",
    });
    gsap.set([...headlineSplit.words, ...descSplit.words], {
      opacity: 0,
      y: 100,
    });

    [headlineSplit.words, descSplit.words].forEach((words, i) => {
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "sine.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: i === 0 ? ".headline" : ".desc",
          start: i === 0 ? "top 60%" : "top 62%",
          end: i === 0 ? "bottom 40%" : "bottom 45%",
          toggleActions: "play none none reverse",
        },
      });
    });
  });

  return (
    <section className="relative min-h-screen overflow-x-hidden mt-[300px] ">
      {/* 🚨 top image  */}
      <section className="top-4 w-full absolute py-4">
        <section ref={carouselRef} className="flex gap-x-6 w-fit ">
          {duplicatedImages.map((img, index) => {
            const { src } = img;

            return (
              <div
                className={`even:mt-10 last:mt-40 image flex-shrink-0`}
                key={index}
              >
                <img src={src} alt="" className="h-24 w-24 rounded-xl" />
              </div>
            );
          })}
        </section>
      </section>

      {/* 🚨 middle  */}
      <section className=" middle-text absolute position-center w-full  text-center font-semibold space-y-4">
        <h1 className="text-[90px] leading-20 headline ">
          You will find yourself <br /> among us
        </h1>
        <p className="desc">
          Dive into a Dynamic community where artists <br /> and buyers
          seamlessly merge{" "}
        </p>
      </section>

      {/* 🚨 bottom image  */}
      <section className="bottom-10 w-full absolute">
        <section className="flex gap-x-6 " ref={carouselRef2}>
          {duplicatedImages.map((img, index) => {
            const { src } = img;

            return (
              <div className={`even:mt-10 image flex-shrink-0`} key={index}>
                <img src={src} alt="" className="h-24 w-24 rounded-xl" />
              </div>
            );
          })}
        </section>
      </section>
    </section>
  );
};

export default Fouth;
