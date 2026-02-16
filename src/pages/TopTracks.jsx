import { getUserTopItems } from "@/features/Logic/logicAPI";
import { logicState } from "@/features/Logic/logicSlice";
import Memories from "@/features/Memories";
// import { topTracks } from "@/utils/data";
import { trimText } from "@/utils/helperFn";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TopTracks() {
  const dispatch = useDispatch();

  const { userTopTracks } = useSelector(logicState);

  const [activeTrack, setActiveTrack] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [topTracks, setTopTracks] = useState();
  const [duration, setDuration] = useState("short_term");

  // const clickSound = useRef(new Audio("/sounds/click.mp3"));

  // 🚨 useRef
  const wrapperRef = useRef();
  const listRef = useRef();
  const itemsRef = useRef([]);
  const imgListRef = useRef();
  const imgRef = useRef([]);
  const isLastTrack = useRef(false);
  const isFirstTrack = useRef(false);

  useEffect(() => {
    const items = {
      type: "tracks",
      time_range: duration,
    };
    setCurrentIndex(0);
    dispatch(getUserTopItems(items));
  }, [dispatch, duration]);

  useEffect(() => {
    if (!userTopTracks.isLoading && userTopTracks.tracks) {
      setTopTracks(() => {
        return userTopTracks.tracks.items;
      });
    }
  }, [userTopTracks]);

  useEffect(() => {
    if (!topTracks) return;
    setActiveTrack(topTracks[0]);
    setCurrentIndex(() => {
      return topTracks.findIndex((track) => track.id === activeTrack?.id);
    });

    isLastTrack.current = currentIndex === topTracks.length - 1;
    isFirstTrack.current = currentIndex === 0;
  }, [topTracks]);

  // 🚨 Functions
  const changeActiveTrack = (track, index) => {
    setActiveTrack(track);
    setCurrentIndex(index);
  };

  const handleToggle = (direction) => {
    if (direction === "prev") {
      setActiveTrack(topTracks[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    } else {
      setActiveTrack(topTracks[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
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
      "=",
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
      "=",
    );
  };

  const handleModal = () => {
    setIsModalOpen((prevState) => !prevState);
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

      // if (clickSound) {
      //   clickSound.current.currentTime = 0;
      //   clickSound.current
      //     .play()
      //     .catch((err) => console.log(err, "sound play errir"));
      // }
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
        "=",
      );

      tl.from(
        ".tracks",
        {
          x: "100%",
          duration: 1.6,
        },
        "=",
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
        "+=1",
      );

      tl.to(
        ".tracks",
        {
          y: "100%",
          duration: 1.6,
          opacity: 0,
        },
        "<",
      );
      tl.to(
        ".title-card",
        {
          display: "none",
        },
        ">",
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
        },
      );
    },
    { scope: wrapperRef },
  );

  isLastTrack.current = currentIndex === topTracks?.length - 1;
  isFirstTrack.current = currentIndex === 0;
  //

  return (
    <section ref={wrapperRef} className="h-full w-full top-track">
      {/* 🚨Google Calendar implementation  */}
      <section>
        <button onClick={handleModal}>Let's create a memory</button>
      </section>
      {/*  */}

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
              {topTracks &&
                topTracks.map((track, index) => {
                  return (
                    <li
                    key={track.id}
                      ref={(e) => (itemsRef.current[index] = e)}
                      onClick={() => changeActiveTrack(track, index)}
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
          <section className=" flex justify-between w-full ">
            <section className="flex gap-x-10 items-center">
              <div className="bg-[#DDD9CC] p-3 rounded-full w-[500px]">
                <img
                  src={activeTrack?.album?.images[0]?.url}
                  alt=""
                  className="rounded-full  track-image "
                />
              </div>

              <div className="space-y-3 ">
                <section className="flex justify-between gap-x-6">
                  <div className="flex text-4xl font-bold w-fit popularity">
                    <h3>{activeTrack?.popularity}</h3>{" "}
                    <p className="text-sm">% popularity</p>
                  </div>

                  <p className="flex justify-end mb-[-5px] font-medium release-date">
                    <span className="font-semibold">Release date</span>:{" "}
                    {moment(activeTrack?.album?.release_date).format(
                      "Do MMM, YYYY",
                    )}
                  </p>
                </section>
                <div className="w-full track-name">
                  <h1 className="text-[84px] leading-20  font-bold">
                    {" "}
                    {trimText(activeTrack?.name, 20)}
                  </h1>
                </div>
                <p className="text-gray-600 text-xl pl-2 font-medium artist-name">
                  {" "}
                  {activeTrack?.artists?.[0]?.name}
                </p>
              </div>
            </section>

            {/* 🚨 navigation  */}
            <section>
              <div className="flex gap-x-6 text-xl items-center">
                <button
                  disabled={isFirstTrack.current}
                  onClick={() => handleToggle("prev")}
                  className={` ${
                    isFirstTrack.current
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer hover:bg-gray-900 hover:text-white"
                  }  w-9 h-9 text-center rounded-full bg-[#CCC7BA]  `}
                >
                  {" "}
                  {"<"}{" "}
                </button>

                <button
                  disabled={isLastTrack.current}
                  onClick={() => handleToggle("next")}
                  className={` ${
                    isLastTrack.current
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer hover:bg-gray-900 hover:text-white"
                  }  w-9 h-9 text-center rounded-full bg-[#CCC7BA]  `}
                >
                  {" "}
                  {">"}{" "}
                </button>
                <select
                  onChange={(e) => setDuration(e.target.value)}
                  className=" border"
                >
                  <option value="short_term"> 4 weeks</option>
                  <option value="medium_term"> 6 months</option>
                  <option value="long_term"> 1 year</option>
                </select>
              </div>
            </section>
            {/*  */}
          </section>
          {/*  */}

          {/* 🚨 bottom thumbnail  */}
          <section className="absolute right-0 bottom-10 artist-list">
            <section className="max-w-[600px] px-8 py-4 overflow-x-scroll hide-scrollbar">
              <section className="w-max flex gap-x-4 ">
                {topTracks &&
                  topTracks.map((track, index) => {
                    let image = track?.album?.images[0]?.url;
                    return (
                      <div
                        ref={imgListRef}
                        onClick={() => changeActiveTrack(track, index)}
                        key={track.id}
                        className="flex-shrink-0 cursor-pointer"
                      >
                        <img
                          ref={(e) => (imgRef.current[index] = e)}
                          src={image}
                          alt=""
                          className={`${
                            activeTrack.id === track.id
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
          {/*  */}
        </section>
      </section>

      {/* 🚨 Memories Modal   */}

      <Memories isModalOpen={isModalOpen} handleModal={handleModal} />
      {/*  */}
    </section>
  );
}
