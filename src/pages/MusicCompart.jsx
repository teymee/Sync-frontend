import { getUserTopItems } from "@/features/Logic/logicAPI";
import { logicState } from "@/features/Logic/logicSlice";
import { topArtists, topTracks } from "@/utils/data";
import { encodeBase64, generateRandomArrValues } from "@/utils/helperFn";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MusicCompart() {
  const dispatch = useDispatch();

  const { userTopTracks } = useSelector(logicState);

  // console.log(userTopTracks, "state");

  useEffect(() => {
    const items = {
      type: "artists",
      time_range: "short_term",
    };
    dispatch(getUserTopItems(items));
  }, [dispatch]);

  const topTracksUrl = generateRandomArrValues(topTracks, 10);
  const topArtistUrl = generateRandomArrValues(topArtists, 10);
  const data = { artists: topArtistUrl, tracks: topTracksUrl };

  const encodedTracks = encodeBase64(data);

  const shareLink = `/check-compart/${encodedTracks}`;

  return (
    <div>
      MusicCompart
      <div>
        <Link target="_blank" to={shareLink}>
          share
        </Link>
      </div>
    </div>
  );
}
