import { topTracks } from "@/utils/data";
import { trimText } from "@/utils/helperFn";
import moment from "moment";
import React, { useState } from "react";

export default function TopTracks() {
  const [activeTrack, setActiveTrack] = useState(topTracks[0]);

  const changeActiveTrack = (track) => {
    setActiveTrack(track);
  };

  let currentIndex = topTracks.findIndex(
    (track) => track.id === activeTrack.id
  );

  const handleToggle = (direction) => {
    if (direction === "prev") {
      setActiveTrack(topTracks[currentIndex - 1]);
    } else {
      setActiveTrack(topTracks[currentIndex + 1]);
    }
  };

  return (
    <section className="relative w-11/12 h-screen  flex items-center mx-auto ">
      <section className="flex items-center  w-full ">
        {/* 🚨 ranking  */}
        <section className=" w-[10%] flex justify-start self-start  h-[400px] overflow-y-scroll hide-scrollbar ">
          <div className="space-y-8 text-gray-500 text-lg font-bold h-max ">
            {topTracks.map((track, index) => {
              return (
                <p
                  onClick={() => changeActiveTrack(track)}
                  className={`cursor-pointer ${
                    activeTrack.id === track.id
                      ? "text-6xl font-extrabold tracking-widest text-gray-800"
                      : ""
                  }`}
                >
                  {++index < 10 ? `0${index}` : index}
                </p>
              );
            })}
          </div>
        </section>
        {/*  */}

        {/* 🚨 main  */}
        <section className=" flex justify-between w-[90%] ">
          <section className="flex gap-x-10 items-center">
            <div className="bg-[#DDD9CC] p-2 rounded-full w-[500px]">
              <img
                src={activeTrack?.album?.images[0]?.url}
                alt=""
                className="rounded-full  "
              />
            </div>

            <div className="space-y-2 ">
              <section className="flex justify-between gap-x-6">
                <div className="flex text-4xl font-bold w-fit">
                  <h3>{activeTrack?.popularity}</h3>{" "}
                  <p className="text-sm">% popularity</p>
                </div>

                <p className="flex justify-end mb-[-5px] font-medium">
                  <span className="font-semibold">Release date</span>:{" "}
                  {moment(activeTrack?.release_date).format("Do MMM, YYYY")}
                </p>
              </section>
              <div className="w-full">
                <h1 className="text-8xl font-bold">
                  {" "}
                  {trimText(activeTrack?.name)}
                </h1>
              </div>
              <p className="text-gray-600 text-xl pl-2 font-medium">
                {" "}
                {activeTrack?.artists?.[0]?.name}
              </p>
            </div>
          </section>

          <section>
            <div className="flex gap-x-6 text-xl items-center">
              <button
                disabled={currentIndex === 0}
                onClick={() => handleToggle("prev")}
                className="w-9 cursor-pointer  h-9 text-center rounded-full bg-[#CCC7BA]"
              >
                {" "}
                {"<"}{" "}
              </button>

              <button
                disabled={currentIndex === topTracks.length - 1}
                onClick={() => handleToggle("next")}
                className=" cursor-pointer w-9 h-9 text-center rounded-full bg-gray-900 text-white"
              >
                {" "}
                {">"}{" "}
              </button>
            </div>
          </section>
        </section>
        {/*  */}

        <section className="absolute right-0 bottom-10">
          <section className="max-w-[600px] px-4 overflow-x-scroll hide-scrollbar">
            <section className="w-max flex gap-x-10 ">
              {topTracks.map((track) => {
                let image = track?.album?.images[0]?.url;
                return (
                  <div
                    onClick={() => changeActiveTrack(track)}
                    key={track.name}
                    className="flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-24 h-24 rounded-full object-cover shadow-lg"
                    />
                  </div>
                );
              })}
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
