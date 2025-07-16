import Banner from "@/features/Home/components/Banner";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

export default function Home() {
  const bannerRef = useRef();
  const titleRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(
      ".title",
      {
        y: -10,
        duration: 0.8,
        opacity: 0,
      },
      1
    )
      .set(".title", {
        display: "none",
      })
      .to(bannerRef.current, { opacity: 1 });
  });
  return (
    <section className="h-screen overflow-hidden">
      <div
        ref={titleRef}
        className="text-[140px] title h-full font-bold flex flex-col items-center justify-center "
      >
        SYNC.
      </div>
      <div ref={bannerRef} className="opacity-0">
        <Banner />
      </div>
    </section>
  );
}
