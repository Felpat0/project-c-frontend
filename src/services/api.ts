import {
  APICalendarToCalendar,
  APITasksToTasks,
  APITaskToTask,
  toUser,
} from "./utils";
import { APITask, CalendarType, Task, User } from "./../types";

let sessionToken: string | undefined;

const getSessionToken = () => {
  return sessionToken;
};
const setSession = (token: string) => {
  sessionToken = token;
};

const parseErrorMessage = async (response: Response) => {
  try {
    const data = await response.json();
    if (!data.ErrorMessage) {
      throw new Error();
    }
    return data.ErrorMessage;
  } catch (err) {
    return "";
  }
};

const makeApiRequest = async (
  method: "POST" | "GET" | "PATCH" | "DELETE",
  path: string,
  body?: any
): Promise<any> => {
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  if (sessionToken) {
    headers.append("Authorization", `Bearer ${sessionToken}`);
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}${path}`,
      {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
        headers: headers,
      }
    );

    if (!response.ok) {
      const message = await parseErrorMessage(response);
      throw new Error(`${response.status}: ${response.statusText}. ${message}`);
    }
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.warn(`Failed request ${method} ${path}`, err);
    throw err;
  }
};

//------------------------------------------------------------ USER ------------------------------------------------------------
const login = async (email: string, password: string) => {
  // Delete old token
  localStorage.removeItem("session");
  const body = {
    email,
    password,
  };
  const response = await makeApiRequest("POST", "auth/login", body);

  localStorage.setItem("session", response.token);
  setSession(response.token);

  return toUser(response.user);
};

const forgotPassword = async (email: string): Promise<boolean> => {
  const response = await makeApiRequest("POST", "auth/forgotPassword", {
    email,
  });

  return !response.error;
};

const verifyPasswordResetCode = async (
  email: string,
  passwordResetCode: string
): Promise<boolean> => {
  const response = await makeApiRequest(
    "POST",
    "auth/verifyPasswordResetCode",
    {
      email,
      passwordResetCode,
    }
  );
  return !response.error;
};

const updatePassword = async (
  email: string,
  passwordResetCode: string,
  newPassword: string
) => {
  const response = await makeApiRequest("POST", "auth/updatePassword", {
    email,
    passwordResetCode,
    newPassword,
  });

  return !response.error;
};

const logout = async () => {
  sessionToken = undefined;
  window.open(process.env.REACT_APP_API_BASE_URL + "auth/logout/", "_self");
};

const signup = async (user: any) => {
  const payload = {
    nominative: user.nominative,
    email: user.email,
    password: user.password,
  };

  return await makeApiRequest("POST", "auth/signup", payload);
};

const getCurrentUser = async (): Promise<User | null> => {
  const sessionData = localStorage.getItem("session");
  if (!sessionData) return null;
  setSession(JSON.parse(sessionData).token);
  const result = await makeApiRequest("GET", `auth/me`);

  if (result.facebookId) {
    const profilePhoto = (
      await fetch(
        "https://graph.facebook.com/v12.0/" +
          result.facebookId +
          "/picture?height=500&width=500",
        {
          method: "GET",
        }
      )
    ).url;
    result.profilePhoto = profilePhoto;
  }
  return toUser(result);
};

const getUserByCookie = async () => {
  // Delete old token
  localStorage.removeItem("session");
  const response = await fetch(
    process.env.REACT_APP_API_BASE_URL + "auth/login/success",
    {
      method: "GET",
      credentials: "include",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      }),
    }
  );

  let user = (await response.json()).user;

  if (user.facebookId) {
    const profilePhoto = (
      await fetch(
        "https://graph.facebook.com/v12.0/" +
          user.facebookId +
          "/picture?height=500&width=500",
        {
          method: "GET",
        }
      )
    ).url;
    user.profilePhoto = profilePhoto;
  }
  localStorage.setItem("session", user.token);
  setSession(user.token);

  return toUser(user);
};

const updateUser = async (data: any, userId: number) => {
  const payload = {
    nominative: data.nominative,
    email: data.email,
  };

  return await makeApiRequest("PATCH", "users/" + userId, payload);
};

const setUserAvatar = async (avatarUrl: string, userId: number) => {
  return await makeApiRequest("PATCH", "users/" + userId, {
    profilePhoto: avatarUrl,
  });
};

const uploadAndSetUserAvatar = async (formData: FormData, userId: number) => {
  const response = await fetch(
    process.env.REACT_APP_API_BASE_URL + "upload/profileImage",
    {
      method: "POST",
      body: formData,
    }
  );

  return await setUserAvatar((await response.json()).imageUrl, userId);
};

//------------------------------------------------------------ CALENDAR ------------------------------------------------------------
const getCalendarUsers = async (
  userId: string,
  calendarId: number
): Promise<User[]> => {
  //return
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve([
        {
          id: "ao",
          email: "b994@live.com",
          nominative: "Federico Cattini",
          profilePhoto:
            "https://cdn.images.express.co.uk/img/dynamic/67/590x/Francesco-Totti-Roma-Real-Madrid-918704.jpg",
          role: "user",
        },
      ]);
    }, 1000);
  });
};

const getCalendar = async (
  userId: string,
  calendarId: number
): Promise<CalendarType> => {
  const response = await makeApiRequest("GET", "calendar/" + calendarId);

  const calendarTasks = await getCalendarTasks(calendarId);

  return APICalendarToCalendar(response, calendarTasks);
  /* return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({
        id: 1,
        tasks: [
          {
            id: 1,
            type: "free" as TaskType,
            startDate: new Date(),
            endDate: new Date(),
            user: {
              id: "ao",
              email: "b994@live.com",
              nominative: "Federico Cattini",
              profilePhoto:
                "https://cdn.images.express.co.uk/img/dynamic/67/590x/Francesco-Totti-Roma-Real-Madrid-918704.jpg",
              role: "user",
            },
            calendarId: 1,
            isGlobal: false,
          },
          {
            id: 2,
            type: "busy" as TaskType,
            startDate: new Date(),
            endDate: new Date(),
            user: {
              id: "ao",
              email: "b994@live.com",
              nominative: "Federico Cattini",
              profilePhoto:
                "https://cdn.images.express.co.uk/img/dynamic/67/590x/Francesco-Totti-Roma-Real-Madrid-918704.jpg",
              role: "user",
            },
            calendarId: 1,
            isGlobal: false,
          },
        ],
        users: [
          {
            id: "ao",
            email: "b994@live.com",
            nominative: "Federico Cattini",
            profilePhoto:
              "https://cdn.images.express.co.uk/img/dynamic/67/590x/Francesco-Totti-Roma-Real-Madrid-918704.jpg",
            role: "user",
          },
        ],
      });
    }, 1000);
  }); */
};

//------------------------------------------------------------ TASK ------------------------------------------------------------
const getTaskCreator = async (taskId: number): Promise<User> => {
  let response = await makeApiRequest("GET", "users/task/" + taskId);

  return toUser(response);
};

const getGlobalTasks = async (userId: string): Promise<Task[]> => {
  //return
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve([]);
    }, 1000);
  });
};

const getTask = async (taskId: number): Promise<Task> => {
  const response = await makeApiRequest("GET", "task/" + taskId);

  const user = toUser(await getTaskCreator(response.id));

  return APITaskToTask(response, user);
};

const getCalendarTasks = async (calendarId: number): Promise<Task[]> => {
  const response: APITask[] = await makeApiRequest(
    "GET",
    "task/calendar/" + calendarId
  );

  return APITasksToTasks(response);
};

const createTask = async (task: Task): Promise<Task> => {
  const payload = {
    calendarId: task.calendarId,
    startDate: task.startDate,
    endDate: task.endDate,
    type: task.type,
    isGlobal: task.isGlobal,
  };
  const response = await makeApiRequest("POST", "task", payload);

  const user = toUser(await getTaskCreator(response.id));

  return APITaskToTask(response, user);
};

const api = {
  getSessionToken,
  setSession,
  login,
  forgotPassword,
  verifyPasswordResetCode,
  updatePassword,
  logout,
  signup,
  getCurrentUser,
  getUserByCookie,
  updateUser,
  setUserAvatar,
  uploadAndSetUserAvatar,
  getCalendar,
  getCalendarUsers,
  getGlobalTasks,
  getTask,
  getCalendarTasks,
  createTask,
};

export default api;
