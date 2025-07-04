import { generateRandomString } from "@/utils/helperFn";
import React from "react";

export default function Login() {
  let scope = [
    "ugc-image-upload",
    "user-top-read",
    "user-read-playback-state",
    "user-read-currently-playing",
    "streaming",
    "playlist-read-private",
    "playlist-modify-private",
    "playlist-modify-public",
    "user-follow-read",
    "user-read-private",
    "user-read-email",
    "user-library-read",
    "user-library-modify",
  ];

  const params = new URLSearchParams({
    response_type: "code",
    client_id: import.meta.env.VITE_CLIENT_ID,
    scope: scope.join(" "),
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    state: generateRandomString(16),
  });

  const link = `https://accounts.spotify.com/authorize?${params.toString()}`;

  return (
    <section className="w-90 mx-auto border rounded-xl py-4">
      <div className="flex flex-col items-center">
        <h2>Sign into your spotify account</h2>
        {link}
        {/* <Link to={link}> */}
        <a href={link}>
          <button>Sign in</button>
        </a>

        {/* </Link> */}
      </div>
    </section>
  );
}
