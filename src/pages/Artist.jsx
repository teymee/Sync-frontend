import React, { useEffect } from "react";

// assets
// import noise from "@/assets/svg/noise.svg";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getArtistAlbums, getArtistDetails } from "@/features/Logic/logicAPI";
import { logicState } from "@/features/Logic/logicSlice";
import { trimText } from "@/utils/helperFn";
import { Tooltip } from "antd";
export default function Artist() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { artistDetails, artistAlbums } = useSelector(logicState);

  useEffect(() => {
    dispatch(getArtistDetails(id));
    dispatch(getArtistAlbums(id));
  }, [dispatch, id]);

  console.log(artistAlbums, "lll");
  const { name, popularity, followers, images, genres } =
    artistDetails?.details ?? {};

  const albums = artistAlbums?.albums?.items?.slice(0, 6);

  return (
    <section className="h-full overflow-hidden ">
      {!artistDetails?.isLoading && (
        <section className="h-full flex gap-x-4 justify-between">
          <section className="w-[52%] border-r-2 border-[#A0A0A0]">
            {/* 🚨 Artist info  */}
            <section className="h-1/2 px-7 border-b-2 border-[#A0A0A0]">
              <div className="pt-10 ">
                <h1
                  className={` ${name?.length > 12 ? "text-[80px]" : "text-[110px]"}  font-bold `}
                >
                  {name}
                </h1>

                <section className="space-y-2 mt-[-20px] ">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base  ">
                      {followers.total.toLocaleString()} followers
                    </h3>
                    <h3 className="font-semibold text-base  ">
                      {popularity}% popularity
                    </h3>
                  </div>
                  <div className="gap-x-2 flex-wrap flex items-center">
                    {genres &&
                      genres.map((genre) => {
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
              <section className=" border-l-5 border-gray-800 pl-4 py-4 space-y-4">
                <h2 className="uppercase text-4xl font-semibold">ALBUMS </h2>

                {!artistAlbums.isLoading && (
                  <section>
                    {albums.length > 0 ?  (
                      <div className="grid grid-cols-3 ">
                        {albums &&
                          albums.map((album, index) => {
                            const { images, name, total_tracks } = album ?? {};
                            return (
                              <div
                                className={`flex font-semibold items-center   pl-2 py-3  ${
                                  index < 3 ? "border-b-1" : ""
                                }
                        
                        ${index === 2 || index === 5 ? "" : "border-r-1"}`}
                              >
                                <p className="">{++index}</p>
                                <img
                                  src={images?.[0]?.url}
                                  alt={name}
                                  className="w-[50px] h-[40px] ml-2 rounded"
                                />
                                <div className="text-left ml-2">
                                  <p className="text-base cursor-pointer">
                                    <Tooltip title={name}>
                                      {trimText(name, 12)}
                                    </Tooltip>
                                  </p>
                                  <p className="text-sm">
                                    {" "}
                                    ({total_tracks} tracks)
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <p className="text-center text-xl font-semibold py-10"> {name} has no recorded album </p>
                    )}
                  </section>
                )}
              </section>
            </section>
          </section>

          <section className="w-[48%] flex justify-center items-center">
            <img
              alt={name}
              src={images[0].url}
              className="  w-[700px] h-[550px] rounded-4xl object-cover"
            />
          </section>
        </section>
      )}
    </section>
  );
}
