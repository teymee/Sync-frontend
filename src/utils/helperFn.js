export const generateRandomString = (length) => {
  const possibleText =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";

  for (let i = 0; i < length; i++) {
    text += possibleText.charAt(
      Math.floor(Math.random() * possibleText.length)
    );
  }

  return text;
};

export const trimText = (str, num = 7) => {
  if(!str) return "N/A"
  if(str.length >  num){
  return `${str.slice(0, num)}...`;
  }else{
    return str
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
