import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import React from "react";

export default function Third() {
  useGSAP(() => {
    const text1 = SplitText.create(".text1", { type: "words" });

    const text2 = SplitText.create(".text2", { type: "words" });

    gsap.set([...text1.words, ...text2.words, ".asa"], {
      opacity: 0,
      y: 50,
    });

    gsap.set([".asa"], {
      opacity: 0,
      y: 150,
    });
    gsap.to(text1.words, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "back",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".text1",
        start: "top 60%",
        end: "bottom 60%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(text2.words, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "back",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".text2",
        start: "top 80%",
        end: "bottom 20%",
        triggerActions: "play none none reverse",
        scrub: 1,
      },
    });

    gsap.to(".asa", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "bounce",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".asa",
        start: "top bottom",
        end: "bottom 10%",
        triggerActions: "play none none reverse",
        scrub: 1,
      },
    });
  });
  return (
    <section className="h-screen space-y-8 mt-20 mb-40  wrapper">
      <section className="space-y-2 text-animate">
        <h3 className="text1 uppercase font-bold tracking-[3px] text-sm">
          Class by Godiyah .A. Biscuit
        </h3>
        <h1 className="text2 text-7xl font-extrabold">
          Getway to <br /> artist people
        </h1>
      </section>

      <section>
        <div className=" asa">
          <div className="w-full relative">
            <div className="bg-[#0C252D] rotate-6 px-4 absolute -top-15 right-20 w-fit font-medium text-sm text-white rounded-full py-1 ">
              Arikeh mi fav: Asa
            </div>
          </div>
          <img
            src="https://i.scdn.co/image/ab6761610000e5ebc0616b4b93439a0c72f6c864"
            className="w-full h-[600px] object-cover rounded-2xl"
            alt=""
          />
        </div>
      </section>
    </section>
  );
}
