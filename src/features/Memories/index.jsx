import { supabase } from "@/utils/config";
import { getHumanReadableDuration } from "@/utils/helperFn";
import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const playlist =
  "https://open.spotify.com/playlist/3q48js1oNeNU5OZX6pgVcV?si=edd77e6f212b4ff1";

const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
const CLOUD_NAME = import.meta.env.VITE_CLOUDNAME;

// 🚨 CALENDAR DETAILS
const CALENDAR_CLIENT_ID = import.meta.env.VITE_CALENDAR_CLIENT_ID;
const CALENDAR_KEY = import.meta.env.VITE_CALENDAR_KEY;
const SCOPES = "https://www.googleapis.com/auth/calendar";
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

export default function Memories({ isModalOpen, handleModal }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [memoryDetails, setMemoryDetails] = useState(null);

  const tokenClient = useRef(null);
  const [events, setEvents] = useState([]);

  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("calendar")) || null,
  );

  // 🚨 Calendar logic

  const googleOAUTHSignIn = () => {
    if (window.google && window.google.accounts) {
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

      tokenClient.current.requestAccessToken();
    }
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

  const triggerGoogleOAUTH = () => {
    const hasTokenExpired = accessToken
      ? Date.now() >= parseInt(accessToken.expires_in) - 5 * 60 * 1000
      : false;

    console.log(hasTokenExpired, accessToken);
    if (hasTokenExpired) {
      googleOAUTHSignIn();
    }
    if (!accessToken) {
      googleOAUTHSignIn();
      // tokenClient.current.requestAccessToken();
    } else {
      const { name, email, title, duration, link } = memoryDetails ?? {};
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const startTime = new Date(memoryDetails.date);
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // +1 hour
      console.log("goooooooooooooogl");
      const event = {
        summary: title,
        description: `🎉 Hey ${name || email}, Sync has something to remind you in ${duration}. I have a surprise for you click here ${link}`,
        start: {
          dateTime: `${memoryDetails.date}:00`,
          timeZone: timezone,
        },
        end: {
          dateTime: endTime.toISOString().slice(0, 19),
          timeZone: timezone,
        },
        reminders: {
          useDefault: false,
          overrides: [{ method: "popup", minutes: 0 }],
        },
        colorId: "10", // Nice color (optional)
      };
      createEvent(event);
      console.log(event);
    }
  };

  const createEvent = async (data) => {
    const token = JSON.parse(localStorage.getItem("calendar"));
    const response = await axios.post(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response, "bbbb");
  };

  ///////////////////

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const newPreview = files.map((img) => URL.createObjectURL(img));

    setSelectedFiles((prevFiles) => [...prevFiles, files]);
    setImgPreview((prevImg) => [...prevImg, ...newPreview]);
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
      formData,
    );

    return response.data;
  };

  const saveMemory = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const title = e.target.title.value;
    const memory = e.target.memory.value;
    const future = e.target.future.value;
    const date = e.target.date.value;
    try {
      // 🚨 Upload to cloudinary
      const cloudinaryUpload = await Promise.all(
        selectedFiles.flat().map((file) => uploadImageToCloudinary(file)),
      );
      setIsLoading(true);
      const imgUrls = cloudinaryUpload.map((url) => url.secure_url);
      console.log(imgUrls, "image urls");

      const data = {
        name,
        email,
        title,
        memory,
        future,
        playlist,
        images: JSON.stringify(imgUrls),
        date,
      };
      console.log(data, "gggggggg");

      const response = await supabase.from("memories").insert(data).select();

      if (response.status !== 201) {
        setIsLoading(false);
      }
      console.log(response, "nnnnnnnnn");
      const baseURL = window.location.origin;
      const resData = response.data[0];
      const memoryId = resData.id;
      setMemoryDetails({
        title,
        link: `${baseURL}/memory/${memoryId}`,
        date,
        name,
        email,
        duration: getHumanReadableDuration(resData.created_at, resData.date),
      });
      triggerGoogleOAUTH();
      setIsLoading(false);
      console.log(response, "hhhhhhh");
    } catch (e) {
      console.log(`Error:${e}`);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Basic Modal"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      footer={false}
      onCancel={handleModal}
    >
      <button onClick={triggerGoogleOAUTH}>Load Events</button>
      <form className="space-y-4" onSubmit={saveMemory}>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="memory">Name </label>
          <input className="border" name="name" id="name" />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="memory">Email </label>
          <input className="border" name="email" id="email" />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="memory">Title </label>
          <input className="border" name="title" id="title" />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="memory">Save a memory </label>
          <textarea
            className="border"
            cols={5}
            rows={3}
            name="memory"
            id="memory"
          ></textarea>
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="future">Message for your future self </label>
          <textarea
            className="border"
            cols={5}
            rows={3}
            name="future"
            id="future"
          ></textarea>
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="future">Seal the deal with memorable pictures</label>
          <input
            onChange={handleFileChange}
            multiple
            type="file"
            name="picture"
            id=""
            className="w-full border"
          />
        </div>

        <div>
          <p>Image Preview</p>
          <div className="flex gap-x-2 flex-wrap">
            {imgPreview.map((img, index) => {
              return (
                <img
                  src={img}
                  alt="picture"
                  key={index}
                  className="w-20 h-20 object-contain"
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="future">Date</label>
          <input type="datetime-local" name="date" id="date" />
        </div>

        <div>
          <button
            type="submit"
            className="border rounded w-full py-1 bg-black-1000 text-white"
          >
            {isLoading ? "Loading" : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
