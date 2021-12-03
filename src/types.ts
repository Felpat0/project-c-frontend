import { SessionStore } from "./stores/Session";
import { CalendarStore } from "./stores/CalendarStore";

export type Stores = {
  session: SessionStore;
  calendar: CalendarStore;
};

export type User = {
  id: string;
  email: string;
  nominative: string;
  profilePhoto?: string;
  role: string;
  facebookId?: string;
  googleId?: string;
  twitterId?: string;
};

export type Provider = "facebook" | "twitter" | "google";

export type DayState = "available" | "busy" | "none";
export type CalendarDayState = {
  state: DayState;
  busyUsers: User[];
  freeUsers: User[];
};

export type Task = {
  id: number;
  type: "free" | "busy";
  startDate: Date;
  endDate: Date;
  user: User;
  calendarId?: number;
  isGlobal?: boolean;
};

export type CalendarType = {
  id: number;
  users: User[];
  tasks: Task[];
};
