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
