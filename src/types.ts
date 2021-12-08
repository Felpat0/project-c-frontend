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

export type Period = {
  startDate: Date;
  endDate: Date;
};

export enum TaskType {
  "free" = "free",
  "busy" = "busy",
}

export type Task = {
  id: number;
  type: TaskType;
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
