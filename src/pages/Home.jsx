import Banner from "@/features/Home/components/Banner";
import Fouth from "@/features/Home/components/Fouth";
import Showcase from "@/features/Home/components/Showcase";
import Third from "@/features/Home/components/Third";

export default function Home() {
  return (
    <section className="space-y-20 ">
      <Banner />
      <Showcase />
      <Third />

      <Fouth />
    </section>
  );
}
