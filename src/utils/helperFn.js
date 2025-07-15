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
    let randomNumber = Math.floor(Math.random() * (arr.length));
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


import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';


