import {
  APICalendarType,
  APITask,
  CalendarDayState,
  CalendarType,
  Period,
  Provider,
  Task,
  User,
} from "../types";

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

export const APITaskToTask = (apiTask: APITask, user: User): Task => {
  return {
    id: apiTask.id,
    startDate: new Date(apiTask.startDate),
    endDate: new Date(apiTask.endDate),
    type: apiTask.type,
    user: user,
    calendarId: apiTask.ofCalendarId,
    description: apiTask.description,
    isGlobal: apiTask.isGlobal,
  };
};

export const APITasksToTasks = (apiTasks: APITask[]): Task[] => {
  let toReturn: Task[] = [];

  apiTasks.map((task) => {
    if (task.user) {
      toReturn.push(APITaskToTask(task, task.user));
    } else if (task.createdBy) {
      toReturn.push(APITaskToTask(task, task.createdBy));
    }
    return task;
  });
  return toReturn;
};

export const APICalendarToCalendar = (
  apiCalendar: APICalendarType,
  apiTasks: APITask[]
): CalendarType => {
  return {
    id: apiCalendar.id,
    name: apiCalendar.name,
    description: apiCalendar.description,
    tasks: APITasksToTasks(apiTasks),
    users: [],
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

export const areDatesEqual = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getDatesBetweenTwoDates = (start: Date, end: Date): Date[] => {
  let toReturn: Date[] = [];
  if (start > end) {
    let temp = start;
    start = end;
    end = temp;
  }
  for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    toReturn.push(new Date(dt));
  }
  return toReturn;
};

export const getFirstAndLastDate = (dates: Date[]): Period | undefined => {
  if (dates.length === 0) return undefined;
  if (dates.length === 1)
    return {
      startDate: dates[0],
      endDate: dates[0],
    };
  let toReturn: Period = {
    startDate: dates[0],
    endDate: dates[0],
  };

  dates.map((date) => {
    if (date < toReturn.startDate) toReturn.startDate = date;
    if (date > toReturn.endDate) toReturn.endDate = date;

    return date;
  });

  return toReturn;
};

export const dateToDatePickerFormat = (date: Date): string => {
  return (
    date.getFullYear().toString() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
};

export const isDateBetweenTwoDates = (
  from: Date,
  to: Date,
  date: Date
): boolean => {
  let fromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  let toDate = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  let dateDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (toDate >= dateDate && fromDate <= dateDate) {
    return true;
  } else {
    return false;
  }
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

//------------------------------ CALENDAR ------------------------------
export const getCalendarDayState = (
  calendar: CalendarType,
  day: Date
): CalendarDayState => {
  let state: CalendarDayState = {
    state: "none",
    freeUsers: [],
    busyUsers: [],
  };

  calendar.tasks.map((task) => {
    if (isDateBetweenTwoDates(task.startDate, task.endDate, day)) {
      if (task.type === "free") {
        state.freeUsers.push(task.user);
      } else if (task.type === "busy") {
        state.busyUsers.push(task.user);
      }
    }
    return [];
  });

  if (state.freeUsers.length >= calendar.users.length) {
    state.state = "available";
  } else if (state.busyUsers.length > 0) {
    state.state = "busy";
  }

  return state;
};
