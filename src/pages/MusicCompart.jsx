import { getUserTopItems } from "@/features/Logic/logicAPI";
import { logicState } from "@/features/Logic/logicSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MusicCompart() {
  const dispatch = useDispatch();

  const { userTopTracks } = useSelector(logicState);

  console.log(userTopTracks, "state");

  useEffect(() => {
    const items = {
      type: "tracks",
      time_range: "short_term",
    };
    dispatch(getUserTopItems(items));
  }, [dispatch]);

  return <div>MusicCompart</div>;
}
