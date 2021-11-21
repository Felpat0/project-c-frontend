import { SessionStore } from "./stores/Session";

export type Stores = {
  session: SessionStore;
};

export type User = {
  email: string;
  nominative: string;
  profilePhoto?: string;
  role: string;
  facebookId?: string;
  googleId?: string;
  twitterId?: string;
  id: string;
};

export type Provider = "facebook" | "twitter" | "google";
