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
