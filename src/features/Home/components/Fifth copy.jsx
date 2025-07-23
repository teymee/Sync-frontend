import { topArtists } from "@/utils/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

export default function Fifth() {
  const centerImage = useRef();

  const image1 = topArtists.slice(0, 5).map((artist, index) => {
    const src = artist?.images?.[0]?.url;
    return {
      id: ++index,
      src,
      alt: "Forest path",
    };
  });

  const image2 = topArtists.slice(10, 15).map((artist, index) => {
    const src = artist?.images?.[0]?.url;
    return {
      id: ++index,
      src,
      alt: "Forest path",
    };
  });
  const image3 = topArtists.slice(15, 20).map((artist, index) => {
    const src = artist?.images?.[0]?.url;
    return {
      id: ++index,
      src,
      alt: "Forest path",
    };
  });

 useGSAP(() => {
  const centerImg = centerImage.current;

  gsap.set(".center-image img", {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  });

  // Enhanced center image animation with rotation and scale
  gsap.fromTo(centerImg, 
    {
      width: "50px",
      height: "50px",
      rotation: -15,
      scale: 0.3,
      opacity: 0,
      filter: "blur(10px)"
    },
    {
      width: "350px",
      height: "410px",
      rotation: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: centerImg,
        start: "top 60%",
        end: "bottom center",
        toggleActions: "play reverse reverse reverse",
      },
    }
  );

  // Add floating/breathing effect to center image
  gsap.to(centerImg, {
    y: -10,
    duration: 2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: 2
  });

  // Enhanced grid animation with 3D transforms and stagger effects
  const gridImages = gsap.utils.toArray(".image-grid img");
  
  gsap.fromTo(gridImages,
    {
      scale: 0,
      rotationY: 90,
      rotationX: 45,
      opacity: 0,
      y: 100,
      filter: "blur(5px) brightness(0.5)"
    },
    {
      scale: 1,
      rotationY: 0,
      rotationX: 0,
      opacity: 1,
      y: 0,
      filter: "blur(0px) brightness(1)",
      duration: 1.8,
      ease: "elastic.out(1, 0.8)",
      stagger: {
        each: 0.15,
        from: "edges", // Start from outer edges
        grid: "auto"
      },
      scrollTrigger: {
        trigger: centerImg,
        start: "top 50%",
        end: "bottom center",
        toggleActions: "play reverse reverse reverse",
      },
    }
  );

  // Add hover effects for grid images
  gridImages.forEach((img) => {
    const container = img.parentElement;
    
    container.addEventListener("mouseenter", () => {
      gsap.to(img, {
        scale: 1.1,
        rotation: 5,
        filter: "brightness(1.2) saturate(1.3)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    container.addEventListener("mouseleave", () => {
      gsap.to(img, {
        scale: 1,
        rotation: 0,
        filter: "brightness(1) saturate(1)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Add sparkle/particle effect around center image
  const sparkles = [];
  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: linear-gradient(45deg, #fff, #ffd700);
      border-radius: 50%;
      pointer-events: none;
      z-index: 25;
    `;
    centerImg.appendChild(sparkle);
    sparkles.push(sparkle);
  }

  // Animate sparkles in orbit
  sparkles.forEach((sparkle, i) => {
    const angle = (i / sparkles.length) * 360;
    gsap.set(sparkle, {
      transformOrigin: "200px 200px",
      rotation: angle
    });
    
    gsap.to(sparkle, {
      rotation: angle + 360,
      duration: 8,
      ease: "none",
      repeat: -1,
      delay: 2.5
    });
    
    // Pulsing effect
    gsap.to(sparkle, {
      scale: 2,
      opacity: 0.3,
      duration: 1,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 2.5 + (i * 0.2)
    });
  });

  // Background pulse effect
  gsap.to(".main-wrap", {
    background: "linear-gradient(135deg, rgba(255,182,193,0.1) 0%, rgba(255,218,185,0.1) 100%)",
    duration: 3,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: 2
  });
});
  return (
    <section className="relative h-screen wrapper  my-40 main-wrap">
      {/* 🚨center  */}
      <div
        ref={centerImage}
        className="position-center center-image absolute z-20 h-[410px] w-[350px]"
      >
        <img
          src="https://i.scdn.co/image/ab6761610000e5eb1d278c957a461ddee2ffb060"
          alt=""
          className="rounded-4xl  shadow-2xl "
        />
      </div>
      <section className=" pb-20 space-y-10 opacity-90 image-grid w-[76%] mx-auto">
        {/* 🚨top  */}
        <section className="flex gap-x-4 justify-between ">
          {image1.map((img, index) => {
            const { src } = img;
            return (
              <div
                key={`top-${index}`}
                className={`
                ${
                  index === 1
                    ? "mt-[-40px]"
                    : index === 2
                    ? "mt-[-80px]"
                    : index === 3
                    ? "mt-[-40px]"
                    : undefined
                }
            w-[200px] h-[230px]
            last:w-[150px]
              last:h-[190px]
               first:w-[150px]
              first:h-[180px]
            `}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full shadow-lg  rounded-3xl"
                />
              </div>
            );
          })}
        </section>

        {/* 🚨middle  */}
        <section className="flex gap-x-4 justify-between items-center ">
          {image2.map((img, index) => {
            const { src } = img;
            return (
              <div
                key={`middle-${index}`}
                className={`
             
            w-[200px] h-[230px]
             last:w-[150px]
              last:h-[190px]
               first:w-[150px]
              first:h-[180px]
            `}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full shadow-lg  rounded-3xl"
                />
              </div>
            );
          })}
        </section>

        {/* 🚨end  */}
        <section className="flex gap-x-4 justify-between ">
          {image3.map((img, index) => {
            const { src } = img;
            return (
              <div
                key={`end-${index}`}
                className={`
                ${
                  index === 1
                    ? "mt-[40px]"
                    : index === 2
                    ? "mt-[80px]"
                    : index === 3
                    ? "mt-[40px]"
                    : undefined
                }
            w-[200px] h-[230px]
             last:w-[150px]
              last:h-[190px]
               first:w-[150px]
              first:h-[180px]
            `}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full shadow-lg  rounded-3xl"
                />
              </div>
            );
          })}
        </section>
      </section>
    </section>
  );
}
