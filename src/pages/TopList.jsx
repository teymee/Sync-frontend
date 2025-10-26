import { topTracks } from "@/utils/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

export default function TopList() {
  const topItems = topTracks;
  const mainWrapper = useRef();

  useGSAP(
    () => {
      const coverImgs = gsap.utils.toArray(".item");

      gsap.set(".cover", {
        x: 100,
        opacity: 0,
        rotation: 8,
      });

      gsap.set(".desc-bg", {
        opacity: 0,
      });

      coverImgs.forEach((item) => {
        const cover = item.querySelector(".cover");
        const desc = item.querySelector(".desc-bg");
        ScrollTrigger.create({
          trigger: item,
          start: "top 70%",
          onEnter: () => {
            const tl = gsap.timeline();
            tl.to(cover, {
              x: 0,
              rotation: 0,
              opacity: 1,
              duration: 1,
            });

            tl.to(desc, {
              opacity: 1,
              duration: 1,
              ease: "back.inOut",
            });
          },
        });
      });
    },
    { scope: mainWrapper }
  );
  return (
    <section className="wrapper" ref={mainWrapper}>
      <h1 className="text-2xl font-bold text center">Top List</h1>

      <ul className="grid grid-cols-4 gap-x-4 gap-y-20 justify-center">
        {topItems.map((item, index) => {
          const {
            album: { images },
            name,
            artists,
          } = item;
          let src = images?.[0]?.url;

          const artistNames = artists?.map((artist) => artist?.name);
          console.log(src, "kkk");

          return (
            <Link key={name} to={"/artist-details"}>
              <li className=" relative item">
                <img src={src} alt="" className="rounded-full cover" />
                <section className="desc-bg text-white bg-sec absolute w-[60%] inset-y-0 right-0">
                  <section className="flex flex-col justify-between p-4 h-full">
                    <div className="space-y-2">
                      <h1 className="text-xl font-semibold">{name}</h1>
                      <h3 className="text-sm">{artistNames.join(",")}</h3>
                    </div>

                    <div className="pb-4">
                      <h1 className="text-7xl">{++index}</h1>
                    </div>
                  </section>
                </section>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
