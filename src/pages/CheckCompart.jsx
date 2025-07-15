import { topArtists, topTracks } from "@/utils/data";
import {
  decodeBase64,
  formatNumber,
  generateRandomArrValues,
  lowerCase,
} from "@/utils/helperFn";
import React from "react";
import { useParams } from "react-router-dom";

export default function CheckCompart() {
  const { id } = useParams();
  const userA = decodeBase64(id);
  console.log(userA, "userA");
  // JSON.parse(atob(id));
  // ?.map((item) => item.uri)
  let userB = {
    tracks: generateRandomArrValues(topTracks, 10),
    artists: generateRandomArrValues(topArtists, 10),
  };

  const jaccardComparison = (userA, userB, compareType = "tracks") => {
    let type = lowerCase(compareType);
    if (compareType === "all") {
      let trackData = jaccardComparison(userA, userB, "tracks")?.percent;
      let artistData = jaccardComparison(userA, userB, "artists")?.percent;

      let allComparison = formatNumber(trackData + artistData / 200);
      return { percent: allComparison };
    }

    let setA = new Set(userA?.[type]);
    let setB = new Set(userB?.[type]);
    const intersect = new Set(
      [...setA].filter((item) => {
        let setBUri = new Set([...setB].map((item) => item.uri));
        return setBUri.has(item?.uri);
      })
    );
    const union = new Set([...setA, ...setB]);
    const finalResult = formatNumber((intersect?.size / union?.size) * 100);
    return {
      percent: finalResult,
      intersect: [...intersect],
      union: [...union],
    };
  };

  const createPlaylist = (userA, userB, intersect, type) => {
    const symmetricA = userA?.[type].filter(
      (item) => !intersect.some((el) => el.uri === item.uri)
    );

    const symmetricB = userB?.[type].filter(
      (item) => !intersect.some((el) => el.uri === item.uri)
    );

    let playlist = [
      ...generateRandomArrValues(intersect, 2),
      ...generateRandomArrValues(symmetricA, 4),
      ...generateRandomArrValues(symmetricB, 4),
    ];

    return playlist;
    // return arrA
  };
  console.log(
    createPlaylist(
      userA,
      userB,
      jaccardComparison(userA, userB, "tracks")?.intersect,
      "tracks"
    ),
    "check"
  );
  // console.log(jaccardComparison(userA, userB, "tracks")?.intersect, "compare");
  // console.log()

  return (
    <div>
      CheckCompart
      <div>{jaccardComparison(userA, userB, "tracks")?.percent}%</div>
    </div>
  );
}
