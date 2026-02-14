import { getUserTopItems } from "@/features/Logic/logicAPI";
import { logicState } from "@/features/Logic/logicSlice";
// import { topArtists } from "@/utils/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function TopArtists() {
  const dispatch = useDispatch();
  const artistWrapper = useRef();

  const [topArtists, setTopArtists] = useState(null);
  const [duration, setDuration] = useState("short_term");

  const { userTopTracks } = useSelector(logicState);

  // 🚨 useEffect
  useEffect(() => {
    const items = {
      type: "artists",
      time_range: duration,
    };

    dispatch(getUserTopItems(items));
  }, [dispatch, duration]);

  useEffect(() => {
    if (!userTopTracks.isLoading && userTopTracks.artists) {
      setTopArtists(() => {
        return userTopTracks.artists.items;
      });
    }
  }, [userTopTracks]);

  // 🚨 GSAP
  useGSAP(
    () => {
      let images = gsap.utils.toArray(".artist-image");
      let imageContainers = gsap.utils.toArray(".artist-container");

      imageContainers.forEach((container, index) => {
        const img = images[index];
        console.log(img, "bbbb");
        gsap.fromTo(
          container,
          {
            opacity: 0,
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            delay: index * 0.05,
            scrollTrigger: {
              trigger: container,
              start: "left 92%",
              end: "left 20%",
              horizontal: true,
              scroller: ".artist-list",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.fromTo(
          img,
          {
            // xPercent: -0.4,
            x: "-1vw",
          },
          {
            // xPercent: 0.4,
            x: "0.6vw",
            ease: "none",
            scrollTrigger: {
              trigger: container,
              scroller: ".artist-list",
              start: "left 90%",
              end: "left 10%",
              scrub: 1.5,
              horizontal: true,
            },
          },
        );
      });
    },
    { scope: artistWrapper },
  );

  return (
    <section
      ref={artistWrapper}
      className="w-11/12 mx-auto relative h-full flex items-center flex-col"
    >
      <div>
        <select
          onChange={(e) => setDuration(e.target.value)}
          className=" border"
        >
          <option value="short_term"> 4 weeks</option>
          <option value="medium_term"> 6 months</option>
          <option value="long_term"> 1 year</option>
        </select>
      </div>
      <section className="w-full my-auto overflow-x-scroll hide-scrollbar artist-list">
        <section className=" w-max flex flex-col items-center justify-center">
          <section className="w-max flex gap-x-10 items-center justify-center px-10 py-20">
            {topArtists &&
              topArtists.map((artist, index) => {
                const { id, name, images } = artist ?? {};
                let image = images?.[0]?.url;
                // let follows = followers?.total
                return (
                  <Link to={`/artist-details/${id}`}>
                    <div key={id} className="space-y-1 text-sm ">
                      {/* hover:scale-[1.3] duration-500 */}
                      <div className=" font-semibold">
                        <p>{++index}</p>

                        <p>{name}</p>
                        {/* <p className="font-semibold">{follows?.toLocaleString()} followers</p> */}
                      </div>
                      <div className="artist-container shadow-xl cursor-pointer rounded-md overflow-hidden h-[250px] w-[205px]">
                        <img
                          src={image}
                          alt=""
                          className=" min-w-[120%] h-full object-cover    artist-image "
                        />
                      </div>
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
