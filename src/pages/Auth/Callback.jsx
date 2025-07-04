import { getSpotifyToken } from "@/features/Logic/logicAPI";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Callback() {
  const [search] = useSearchParams();
  const params = new URLSearchParams(search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = {
    code: params.get("code"),
    grant_type: "authorization_code",
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
  };

  useEffect(() => {
    if (!data) return;
    dispatch(getSpotifyToken(data)).finally(() => navigate("/main"));
  }, [data]);

  //   console.log(data, "jjj");

  return <div>Callback</div>;
}
