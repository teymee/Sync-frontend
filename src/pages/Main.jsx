import { getUserTopTracks } from "@/features/Logic/logicAPI";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserTopTracks());
  }, [dispatch]);

  return <div>Main</div>;
}
