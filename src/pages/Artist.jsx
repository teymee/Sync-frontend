import React from "react";

// assets
// import noise from "@/assets/svg/noise.svg";
import tag from "@/assets/svg/tag.svg";
import add from "@/assets/svg/add-circle.svg";
import { topTracks } from "@/utils/data";
export default function Artist() {
  return (
    <section className=" w-[90%] mx-auto flex gap-x-4">
      <section className="w-[10%]  flex flex-col justify-between relative">
        <section>CHART</section>

        <section
          className="  absolute bottom-0  w-full leading-0 rotate-[180deg]"
          style={{ writingMode: "vertical-rl" }}
        >
          <div className="flex items-center gap-x-4">
            <h1 className="text-[80px] font-bold ] leading-30 uppercase">
              Micheal
            </h1>

            <div className="w-4 h-4 rounded-full bg-green-2000  "></div>
            <h1 className="text-neutral-900 text-[38px] font-medium ">
              Jackson
            </h1>
          </div>

          <div>
            <h2 className="text-[20px] font-semibold text-green-1100 mr-[-10px]">
              HIP-HOP/RAP
            </h2>
          </div>
        </section>
      </section>

      <section className="w-[90%] relative border border-gray-1000 rounded-4xl bg-primary flex ">
        {/* 🚨 follow details  */}
        <section className="absolute bottom-2 bg-green-2500/90 w-full z-20 py-4">
          <section className="w-1/2 flex items-center justify-between pl-10">
            <div className="flex gap-x-3 text-white uppercase">
              <h1 className="font-bold text-3xl">78.2M</h1>
              <h2 className="self-end text-sm mb-1">Followers</h2>
            </div>

            <div className="w-fit py-2 px-4 bg-black flex items-center gap-x-1 rounded-full">
              <p className="text-xl text-green-3500 font-medium">Follow</p>
              <img src={add} alt="" />
            </div>
          </section>
        </section>
        {/* 🚨 details  */}
        <section className="px-6 py-6 space-y-10">
          {/* 🚨 top albums  */}
          <section className="space-y-3">
            <div className="flex gap-x-4">
              <h1 className="font-medium uppercase text-[20px]">Top album</h1>
              <img src={tag} alt="" />
            </div>

            <div className="flex gap-x-4">
              <img
                src="https://i.scdn.co/image/ab67616d0000b2738733f2e8a1db14bd2f9e9033"
                alt=""
                className="w-[8rem] rounded-full"
              />

              <img
                src="https://i.scdn.co/image/ab67616d0000b2730d8a09a42bed291ae23f85df"
                alt=""
                className="w-[8rem] rounded-full"
              />

              <img
                src="https://i.scdn.co/image/ab67616d0000b273a76e3261ee1bb95a9c129ab4"
                alt=""
                className="w-[8rem] rounded-full"
              />
              <img
                src="https://i.scdn.co/image/ab67616d0000b273682c3dea486ecfc440e9a1bf"
                alt=""
                className="w-[8rem] rounded-full"
              />
            </div>
          </section>

          {/* 🚨 top songs  */}
          <section className="space-y-3">
            <div className="flex gap-x-4">
              <h1 className="font-medium uppercase text-[20px]">Top tracks</h1>
              <img src={tag} alt="" />
            </div>

            <div className="space-y-4">
              {topTracks.slice(0, 5).map(({ id, name }, index) => {
                return (
                  <div key={id} className="flex gap-x-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-sec text-white flex items-center justify-center">
                      <p>0{++index}</p>
                    </div>

                    <p className="uppercase text-green-2000 font-semibold">
                      {name}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
        {/* 🚨image  */}
        <section className="absolute right-0 w-[50%] h-full">
          <img
            // src="https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9"
            src="https://i.scdn.co/image/ab6761610000e5ebaca4e6273434083133d51d3c"
            // src="https://i.scdn.co/image/ab6761610000e5eb3a7215b26592dab23e90d364"
            alt=""
            className="h-full w-full  rounded-t-2xl"
          />
        </section>
      </section>
    </section>
  );
}
