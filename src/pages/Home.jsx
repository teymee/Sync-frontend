import Banner from "@/features/Home/components/Banner";
import Showcase from "@/features/Home/components/Showcase";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

export default function Home() {
  const bannerRef = useRef();
  const titleRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    // tl.set(".body", {
    //   height: "100vh",
    //   overflow: "hidden",
    // })
    //   .to(
    //     ".title",
    //     {
    //       y: -10,
    //       duration: 0.8,
    //       opacity: 0,
    //     },
    //     1
    //   )
    //   .set(".title", {
    //     display: "none",
    //   })
    //   .set(".body", {
    //     height: "auto",
      
    //   })
      tl.to(bannerRef.current, { opacity: 1 });
  });
  return (
    <section className="body w-[90%] mx-auto ">
      {/* <div
        ref={titleRef}
        className="text-[140px] h-screen overflow-y-hidden title font-bold flex flex-col items-center justify-center "
      >
        SYNC.
      </div> */}
      <div ref={bannerRef} className="opacity-0  space-y-20">
        <Banner />
        <Showcase/>
      </div>
      
    </section>
  );
}
