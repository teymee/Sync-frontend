import { topTracks } from "@/utils/data";
import { trimText } from "@/utils/helperFn";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

export default function TopTracks() {
  const [activeTrack, setActiveTrack] = useState(topTracks[0]);

  const wrapperRef = useRef();
  const listRef = useRef();
  const itemsRef = useRef([]);
  const imgListRef = useRef();
  const imgRef = useRef([]);
  let currentIndex = topTracks.findIndex(
    (track) => track.id === activeTrack.id
  );
  const isLastTrack = currentIndex === topTracks.length - 1;
  const isFirstTrack = currentIndex === 0;

  const changeActiveTrack = (track) => {
    setActiveTrack(track);
  };

  const handleToggle = (direction) => {
    if (direction === "prev") {
      setActiveTrack(topTracks[currentIndex - 1]);
    } else {
      setActiveTrack(topTracks[currentIndex + 1]);
    }
  };

  const imageReveal = () => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".track-image",
      {
        clipPath: "inset(0% 0% 100% 0%)",
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        ease: "power2.inOut",
      },
      "="
    );

    tl.fromTo(
      ".popularity, .release-date, .track-name, .artist-name",
      {
        y: 80,
        opacity: 0,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4",
        stagger: 0.1,
      },
      "="
    );
  };

  // 🚨useEffect
  useEffect(() => {
    if (!activeTrack) return;
    imageReveal();
  }, [activeTrack]);

  useEffect(() => {
    let el = itemsRef.current[currentIndex];
    let imgEl = imgRef.current[currentIndex];
    if (el && imgEl) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });

      imgEl.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
    return () => {};
  }, [currentIndex]);

  // 🚨 GSAP
  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 🚨 Title card animation
      gsap.set(".track-body", {
        display: "none",
      });
      tl.from(
        ".top-text",
        {
          x: "-100%",
          duration: 1.3,
        },
        "="
      );

      tl.from(
        ".tracks",
        {
          x: "100%",
          duration: 1.6,
        },
        "="
      );

      tl.to(".title-card", {
        letterSpacing: "20px",
        opacity: 0.2,
        duration: 0.3,
        delay: 0.5,
      });

      tl.set(".title-card", {
        fontFamily: "Permanent Marker, cursive",
      });

      tl.to(".title-card", {
        letterSpacing: "0px",
        opacity: 1,
        duration: 0.4,
      });

      tl.to(
        ".top-text",
        {
          y: "-100%",
          duration: 1.3,
          opacity: 0,
        },
        "+=1"
      );

      tl.to(
        ".tracks",
        {
          y: "100%",
          duration: 1.6,
          opacity: 0,
        },
        "<"
      );
      tl.to(
        ".title-card",
        {
          display: "none",
        },
        ">"
      );
      tl.to(".track-body", {
        display: "flex",
      });

      // 🚨 Image reveal
      tl.fromTo(
        ".track-image",
        {
          opacity: 0,
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power2.inOut",
        }
      );
    },
    { scope: wrapperRef }
  );

  //

  return (
    <section ref={wrapperRef} className="h-full w-full top-track">
      {/* 🚨 Title header  */}
      <section className="title-card w-full h-full overflow-x-hidden col-center text-9xl font-semibold  uppercase font-orbitron">
        <h1 className="ml-[-190px] top-text">Top</h1>
        <h2 className="ml-40 tracks">Tracks</h2>
      </section>
      {/*  */}
      <section className="relative w-11/12 flex items-center mx-auto track-body h-full  ">
        <section className="flex items-center  w-full ">
          {/* 🚨 ranking  */}
          <section className=" w-[10%] flex justify-start self-start  h-[400px] overflow-y-scroll hide-scrollbar ">
            <ul
              ref={listRef}
              className="space-y-8 text-gray-500 text-lg font-bold h-max "
            >
              {topTracks.map((track, index) => {
                return (
                  <li
                    ref={(e) => (itemsRef.current[index] = e)}
                    onClick={() => changeActiveTrack(track)}
                    className={`cursor-pointer ${
                      activeTrack.id === track.id
                        ? "text-6xl font-extrabold tracking-widest text-gray-800"
                        : ""
                    }`}
                  >
                    {++index < 10 ? `0${index}` : index}
                  </li>
                );
              })}
            </ul>
          </section>
          {/*  */}

          {/* 🚨 main  */}
          <section className=" flex justify-between w-[90%] ">
            <section className="flex gap-x-10 items-center">
              <div className="bg-[#DDD9CC] p-2 rounded-full w-[500px]">
                <img
                  src={activeTrack?.album?.images[0]?.url}
                  alt=""
                  className="rounded-full  track-image "
                />
              </div>

              <div className="space-y-2 ">
                <section className="flex justify-between gap-x-6">
                  <div className="flex text-4xl font-bold w-fit popularity">
                    <h3>{activeTrack?.popularity}</h3>{" "}
                    <p className="text-sm">% popularity</p>
                  </div>

                  <p className="flex justify-end mb-[-5px] font-medium release-date">
                    <span className="font-semibold">Release date</span>:{" "}
                    {moment(activeTrack?.release_date).format("Do MMM, YYYY")}
                  </p>
                </section>
                <div className="w-full track-name">
                  <h1 className="text-8xl font-bold">
                    {" "}
                    {trimText(activeTrack?.name)}
                  </h1>
                </div>
                <p className="text-gray-600 text-xl pl-2 font-medium artist-name">
                  {" "}
                  {activeTrack?.artists?.[0]?.name}
                </p>
              </div>
            </section>

            <section>
              <div className="flex gap-x-6 text-xl items-center">
                <button
                  disabled={isFirstTrack}
                  onClick={() => handleToggle("prev")}
                  className={` ${
                    isFirstTrack
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer hover:bg-gray-900 hover:text-white"
                  }  w-9 h-9 text-center rounded-full bg-[#CCC7BA]  `}
                >
                  {" "}
                  {"<"}{" "}
                </button>

                <button
                  disabled={isLastTrack}
                  onClick={() => handleToggle("next")}
                  className={` ${
                    isLastTrack
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer hover:bg-gray-900 hover:text-white"
                  }  w-9 h-9 text-center rounded-full bg-[#CCC7BA]  `}
                >
                  {" "}
                  {">"}{" "}
                </button>
              </div>
            </section>
          </section>
          {/*  */}

          <section className="absolute right-0 bottom-10 artist-list">
            <section className="max-w-[600px] px-4 py-4 overflow-x-scroll hide-scrollbar">
              <section className="w-max flex gap-x-4 ">
                {topTracks.map((track, index) => {
                  let image = track?.album?.images[0]?.url;
                  return (
                    <div
                      ref={imgListRef}
                      onClick={() => changeActiveTrack(track)}
                      key={track.name}
                      className="flex-shrink-0 cursor-pointer"
                    >
                      <img
                        ref={(e) => (imgRef.current[index] = e)}
                        src={image}
                        alt=""
                        className={`${
                          currentIndex === index
                            ? "scale-[1.3] shadow-2xl "
                            : "scale-80"
                        } transition-all duration-200 w-24 h-24 rounded-full object-cover shadow-lg`}
                      />
                    </div>
                  );
                })}
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
