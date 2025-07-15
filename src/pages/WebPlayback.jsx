import { getLocalStorage } from "@/utils/localStorageServices";
import React, { useEffect, useState } from "react";

const track = {
  album: {
    album_type: "single",
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/4kwkSF1jJalibmNlh4Z8Of",
        },
        href: "https://api.spotify.com/v1/artists/4kwkSF1jJalibmNlh4Z8Of",
        id: "4kwkSF1jJalibmNlh4Z8Of",
        name: "Faceless",
        type: "artist",
        uri: "spotify:artist:4kwkSF1jJalibmNlh4Z8Of",
      },
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/2WBBOY2ru2VV81lWHw6lzp",
        },
        href: "https://api.spotify.com/v1/artists/2WBBOY2ru2VV81lWHw6lzp",
        id: "2WBBOY2ru2VV81lWHw6lzp",
        name: "Serøtonin",
        type: "artist",
        uri: "spotify:artist:2WBBOY2ru2VV81lWHw6lzp",
      },
    ],
    external_urls: {
      spotify: "https://open.spotify.com/album/6VbLBFjsXbH8AP3MIgqB2n",
    },
    href: "https://api.spotify.com/v1/albums/6VbLBFjsXbH8AP3MIgqB2n",
    id: "6VbLBFjsXbH8AP3MIgqB2n",
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/ab67616d0000b2738733f2e8a1db14bd2f9e9033",
        width: 640,
      },
      {
        height: 300,
        url: "https://i.scdn.co/image/ab67616d00001e028733f2e8a1db14bd2f9e9033",
        width: 300,
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/ab67616d000048518733f2e8a1db14bd2f9e9033",
        width: 64,
      },
    ],
    is_playable: true,
    name: "Venus",
    release_date: "2024-11-28",
    release_date_precision: "day",
    total_tracks: 1,
    type: "album",
    uri: "spotify:album:6VbLBFjsXbH8AP3MIgqB2n",
  },
  artists: [
    {
      external_urls: {
        spotify: "https://open.spotify.com/artist/4kwkSF1jJalibmNlh4Z8Of",
      },
      href: "https://api.spotify.com/v1/artists/4kwkSF1jJalibmNlh4Z8Of",
      id: "4kwkSF1jJalibmNlh4Z8Of",
      name: "Faceless",
      type: "artist",
      uri: "spotify:artist:4kwkSF1jJalibmNlh4Z8Of",
    },
    {
      external_urls: {
        spotify: "https://open.spotify.com/artist/2WBBOY2ru2VV81lWHw6lzp",
      },
      href: "https://api.spotify.com/v1/artists/2WBBOY2ru2VV81lWHw6lzp",
      id: "2WBBOY2ru2VV81lWHw6lzp",
      name: "Serøtonin",
      type: "artist",
      uri: "spotify:artist:2WBBOY2ru2VV81lWHw6lzp",
    },
  ],
  disc_number: 1,
  duration_ms: 139199,
  explicit: false,
  external_ids: {
    isrc: "QMFME2402548",
  },
  external_urls: {
    spotify: "https://open.spotify.com/track/2pNjk1fIZTMtj8ry6SdEmB",
  },
  href: "https://api.spotify.com/v1/tracks/2pNjk1fIZTMtj8ry6SdEmB",
  id: "2pNjk1fIZTMtj8ry6SdEmB",
  is_local: false,
  is_playable: true,
  name: "Venus",
  popularity: 77,
  preview_url: null,
  track_number: 1,
  type: "track",
  uri: "spotify:track:2pNjk1fIZTMtj8ry6SdEmB",
};

export default function WebPlayback() {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(getLocalStorage("token")?.access_token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });
      player.connect();
    };
  }, []);

  const transferPlayback = async () => {
    const token = getLocalStorage("token")?.access_token;

    await fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        play: true,
      }),
    });
  };

  useEffect(() => {
          console.log(deviceId,"here")
    if (deviceId) {

      transferPlayback();
    }
  }, [deviceId]);

  return (
    <div className="container">
      <div className="main-wrapper">
        <img src="https://i.scdn.co/image/ab6761610000e5eb133962d37b88a7870f6886a4" alt="" />
        <>
          <div className="container">
            <div className="main-wrapper">
              {/* <img
                src={current_track.album.images[0].url}
                className="now-playing__cover"
                alt=""
              /> */}

              <div className="now-playing__side">
                <div className="now-playing__name">{current_track.name}</div>

                <div className="now-playing__artist">
                  {current_track.artists[0].name}
                </div>
              </div>
            </div>
          </div>

          <button
            className="btn-spotify"
            onClick={() => {
              player.previousTrack();
            }}
          >
            &lt;&lt;
          </button>

          <button
            className="btn-spotify"
            onClick={() => {
              player.togglePlay();
            }}
          >
            {is_paused ? "PLAY" : "PAUSE"}
          </button>

          <button
            className="btn-spotify"
            onClick={() => {
              player.nextTrack();
            }}
          >
            &gt;&gt;
          </button>
        </>
      </div>
    </div>
  );
}
