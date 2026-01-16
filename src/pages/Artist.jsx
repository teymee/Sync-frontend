import React from "react";

// assets
// import noise from "@/assets/svg/noise.svg";
import tag from "@/assets/svg/tag.svg";
import add from "@/assets/svg/add-circle.svg";
import { topTracks } from "@/utils/data";
export default function Artist() {
  const topSongs = Array(6).fill({
    img: "https://i.scdn.co/image/ab67616d00001e028733f2e8a1db14bd2f9e9033",
    name: "Venus",
    id: "6VbLBFjsXbH8AP3MIgqB2n",
  });

  const genres = ["Prog rock", "Grunge"];
  return (
    <section className="h-full overflow-hidden ">
      <section className="h-full flex gap-x-4 justify-between">
        <section className="w-[50%] border-r-2 border-[#A0A0A0]">
          {/* 🚨 Artist info  */}
          <section className="h-1/2 px-7 border-b-2 border-[#A0A0A0]">
            <div className="pt-10 ">
              <h1 className=" text-[110px] font-bold ">Marlon Craft</h1>

              <section className="space-y-2 mt-[-20px] ">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base  ">
                    200,000 followers
                  </h3>
                  <h3 className="font-semibold text-base  ">70% popularity</h3>
                </div>
                <div className="gap-x-2 flex-wrap flex items-center">
                  {genres.map((genre) => {
                    return (
                      <p className="px-3 rounded py-1 bg-black-1000 text-sm text-white">
                        {genre}
                      </p>
                    );
                  })}
                </div>
              </section>
            </div>
          </section>
          {/*  */}

          <section className="h-1/2 w-11/12 py-4 mx-auto">
            {/* top tracks  */}
            <section className=" border-l-5 border-gray-800 pl-5 py-4 space-y-4">
              <h2 className="uppercase text-4xl font-semibold">Top Songs</h2>

              <div className="grid grid-cols-3 ">
                {topSongs.map((track, index) => {
                  const { img, name } = track ?? {};
                  return (
                    <div
                      className={`flex font-semibold items-center   pl-2 py-2  ${
                        index < 3 ? "border-b-1" : ""
                      }
                        
                        ${index === 2 || index === 5 ? "" : "border-r-1"}`}
                    >
                      <p className="">{++index}</p>
                      <img
                        src={img}
                        alt={name}
                        className="w-[50px] h-[40px] ml-2 rounded"
                      />
                      <p className="text-base ml-3">{name}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </section>
        </section>

        <section className="   w-[50%] flex justify-center items-center">
          <img
            // src="https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9"
            src="https://i.scdn.co/image/ab6761610000e5ebaca4e6273434083133d51d3c"
            // src="https://i.scdn.co/image/ab6761610000e5eb3a7215b26592dab23e90d364"
            alt=""
            className="  w-[700px] h-[550px] rounded-4xl object-cover"
          />
        </section>
      </section>
    </section>
  );
}
