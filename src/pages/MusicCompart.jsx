import { getUserTopItems } from "@/features/Logic/logicAPI";
import { logicState } from "@/features/Logic/logicSlice";
import { topArtists, topTracks } from "@/utils/data";
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

  const topTracksUrl = topTracks?.slice(0, 5)?.map((track) => track?.uri);
  const topArtistUrl = topArtists?.slice(0, 5)?.map((artist) => artist?.uri);
  const data = { artists: topArtistUrl, tracks: topTracksUrl };
  const encodedTracks = btoa(JSON.stringify(data));
  console.log(topArtistUrl, "yrl");
  console.log(encodedTracks, "joined");

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
