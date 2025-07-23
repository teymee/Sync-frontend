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

    gsap.from(centerImg, {
      y: -100,
      width: "100%",
      height: "600px",
      duration: 2,
      ease: "back.inOut",
      rotation: 4,
      scrollTrigger: {
        trigger: centerImg,
        start: "top 40%",
        end: "bottom center",
        toggleActions: "play reverse reverse reverse",
      },
    });

    gsap.from(
      ".image-grid",
      {
        scale: 0.5,
        width: "80%",
        height: "600px",
        duration: 2,

        ease: "back.inOut",
        scrollTrigger: {
          trigger: centerImg,
          start: "top 40%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      },
      "+=0.5"
    );

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: "sine.inOut", duration: 2, y: "+=5" },
    });

    tl.to(".center-image img", {
      rotation: 2,
    })
      .to(".center-image img", {
        rotation: -2,
      })
      .to(".center-image img", {
        rotation: 2,
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
      <section className=" pb-20 space-y-10 opacity-90 image-grid w-[80%] mx-auto">
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
