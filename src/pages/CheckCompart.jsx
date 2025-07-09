import { topArtists, topTracks } from "@/utils/data";
import React from "react";
import { useParams } from "react-router-dom";

export default function CheckCompart() {
  const { id } = useParams();
  const userA = JSON.parse(atob(id));

  let userB = {
    tracks: topTracks?.slice(0, 15)?.map((item) => item.uri),
    artists: topArtists?.slice(0, 15)?.map((artist) => artist?.uri),
  };

  const jaccardComparison = (userA, userB, type='tracks') => {
  
    let setA = new Set(userA?.[type]);
    let setB = new Set(userB?.[type]);
    const intersect = new Set([...setA].filter((item) => setB.has(item)));
    const union = new Set([...setA, ...setB]);
    const finalResult = (intersect?.size / union?.size) * 100;
    return finalResult?.toFixed(2);
  };

  console.log(jaccardComparison(userA, userB, "artists"), "compare");

  return (
    <div>
      CheckCompart
      <div>{jaccardComparison(userA, userB)}%</div>
    </div>
  );
}
