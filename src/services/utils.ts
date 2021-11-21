import { Provider, User } from "../types";

export const toUser = (data: any): User => {
  return {
    id: data.id,
    email: data.email,
    nominative: data.nominative,
    profilePhoto: data.profilePhoto,
    role: data.role,
    facebookId: data.facebookId,
    googleId: data.googleId,
    twitterId: data.twitterId,
  };
};

export const isPasswordEnoughComplex = (
  password: string | undefined
): boolean => {
  if (!password) return false;
  if (password.length < 6) return false;
  return true;
};

const replaceStringCharacterByIndex = (
  data: string,
  index: number,
  replaceMent: string
): string => {
  if (index >= data.length) return data;
  return data.substring(0, index) + replaceMent + data.substring(index + 1);
};

export const dateToString = (
  date: Date,
  language?: "it-IT" | "en-US",
  options?: any
): string => {
  let toReturn = "";
  toReturn = date.toLocaleString(
    language ? language : "it-IT",
    options
      ? options
      : {
          weekday: "long",
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        }
  );
  toReturn = replaceStringCharacterByIndex(
    toReturn,
    0,
    toReturn[0].toUpperCase()
  );
  return toReturn;
};

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export const openOAuthWindow = (provider: Provider) => {
  window.open(
    process.env.REACT_APP_API_BASE_URL + "auth/" + provider + "/",
    "_self"
  );
};

export const deleteAllCookies = () => {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};
