import { topArtists } from "@/utils/data";
import React from "react";
import { Link } from "react-router-dom";

export default function TopArtists() {
  return (
    <section className="w-11/12 mx-auto relative h-[70vh] flex items-center flex-col">
      <section className="w-full my-auto overflow-x-scroll hide-scrollbar artist-list">
        <section className=" w-max flex flex-col items-center justify-center">
          <section className="w-max flex gap-x-10 items-center justify-center px-10 py-20">
            {topArtists.map((artist, index) => {
              let image = artist?.images?.[0]?.url;
              return (
                <Link to={`/artist-details`}>
                  <div
                    key={artist?.id}
                    className="space-y-1 hover:scale-[1.3] duration-500"
                  >
                    <div className=" text-sm font-semibold">
                      <p>{++index}</p>

                      <p>{artist?.name}</p>
                    </div>
                    <img
                      src={image}
                      alt=""
                      className="h-[250px] w-[200px] object-cover rounded-sm cursor-pointer shadow-xl "
                    />
                  </div>
                </Link>
              );
            })}
          </section>
        </section>
      </section>
    </section>
  );
}
