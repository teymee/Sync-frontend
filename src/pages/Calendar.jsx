import React, { useEffect, useRef, useState } from "react";
import { gapi } from "gapi-script";
import { supabase } from "@/utils/config";

function Event({ description }) {
  return (
    <div className="via-navy-500 mt-4 w-1/4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-1 shadow-xl">
      <span className="block rounded-xl bg-white sm:p-2" href="">
        <div className="sm:pr-8">
          <p className="mt-2 text-sm text-black">{description}</p>
        </div>
      </span>
    </div>
  );
}


export default function Calendar() {
  const CALENDAR_CLIENT_ID = import.meta.env.VITE_CALENDAR_CLIENT_ID;
  const CALENDAR_KEY = import.meta.env.VITE_CALENDAR_KEY;
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

  const tokenClient = useRef(null);
  const [events, setEvents] = useState([]);
  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("calendar") || null),
  );

  useEffect(() => {
    if (window.google && window.google.accounts && !accessToken) {
      tokenClient.current = window.google.accounts.oauth2.initTokenClient({
        client_id: CALENDAR_CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
          tokenResponse.expires_in =
            Date.now() + tokenResponse.expires_in * 1000;

          localStorage.setItem("calendar", JSON.stringify(tokenResponse));
          setAccessToken(tokenResponse);
        },
      });
    }
  }, []);

  const googleOAUTHSignIn = () => {
    const hasTokenExpired = accessToken
      ? Date.now() >= parseInt(accessToken.expires_in) - 5 * 60 * 1000
      : false;

      console.log(hasTokenExpired, 'jjjj')
    if (!accessToken || hasTokenExpired) {
      tokenClient.current.requestAccessToken();
    } else {
      getEvents(accessToken);
    }
  };

  useEffect(() => {
    getInstruments();
  }, []);

  const getInstruments = async () => {
    const { data } = await supabase.from("memories").select();
    setEvents(data);
  };

  const getEvents = async (token) => {
    const now = new Date().toISOString();

    const res = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events" +
        `?timeMin=${now}&singleEvents=true&orderBy=startTime&maxResults=10`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      },
    );

    const data = await res.json();
    setEvents(data.items || []);
  };

  useEffect(() => {
    if (accessToken) {
      getEvents(accessToken);
    }
  }, [accessToken]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">
        React App with Google Calendar API!
      </h1>

      <button onClick={googleOAUTHSignIn}>Load Events</button>

      <ul>
        {events?.map((event) => (
          <li key={event.id} className="flex justify-center">
            <Event description={event.summary || event.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
