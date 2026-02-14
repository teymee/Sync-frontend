export const generateRandomString = (length) => {
  const possibleText =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";

  for (let i = 0; i < length; i++) {
    text += possibleText.charAt(
      Math.floor(Math.random() * possibleText.length),
    );
  }

  return text;
};

export function getHumanReadableDuration(createdAt, eventDate) {
  const created = new Date(createdAt);
  const event = new Date(eventDate);

  const diffMs = event - created;

  // Handle negative duration (event in the past)
  if (diffMs < 0) {
    return "Event is in the past";
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  const parts = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);

  return parts.join(", ") || "Less than a minute";
}

export const trimText = (str, num = 7) => {
  if (!str) return "N/A";
  if (str.length > num) {
    return `${str.slice(0, num)}...`;
  } else {
    return str;
  }
};

export const spotifySignInLink = () => {
  let scope = [
    "ugc-image-upload",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
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

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const lowerCase = (string) => {
  if (!string) return "no string passed";
  return string.toLowerCase();
};

export const formatNumber = (num) => {
  if (num === undefined || num === null) return;
  return Number(num.toFixed(1));
};

export const generateRandomArrValues = (arr, len) => {
  if (len > arr.length) len = arr.length;
  let newArr = [];
  let selectedNumbers = new Set();

  while (newArr.length < len) {
    let randomNumber = Math.floor(Math.random() * arr.length);
    if (!selectedNumbers.has(randomNumber)) {
      newArr.push(arr[randomNumber]);
      selectedNumbers.add(randomNumber);
    }
  }

  return newArr;
};

export const encodeBase64 = (obj) => {
  const json = JSON.stringify(obj);
  return compressToEncodedURIComponent(json);
};

export const decodeBase64 = (str) => {
  const json = decompressFromEncodedURIComponent(str);
  return JSON.parse(json);
};

import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
