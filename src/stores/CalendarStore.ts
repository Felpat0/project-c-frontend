import { makeAutoObservable } from "mobx";
import api from "../services/api";
import { CalendarType, Stores, Task, User } from "./../types";
import { configure } from "mobx";

configure({
  enforceActions: "never",
});

export class CalendarStore {
  isInitialized = false;
  isFetching = false;
  stores: Stores;
  currentCalendar: CalendarType | undefined;

  constructor(stores: Stores) {
    this.stores = stores;
    makeAutoObservable(this);
  }

  //--------------------------------------------------------------------- CALENDAR ---------------------------------------------------------------------
  getCalendarUsers = async (calendarId: number): Promise<User[]> => {
    this.isFetching = true;
    let toReturn: User[] = [];
    try {
      if (this.stores.session.user)
        toReturn = await api.getCalendarUsers(
          this.stores.session.user.id,
          calendarId
        );
    } catch (e) {
      console.log(e);
    } finally {
      this.isFetching = false;
      return toReturn;
    }
  };

  getCalendar = async (
    calendarId: number
  ): Promise<CalendarType | undefined> => {
    this.isFetching = true;
    let toReturn: CalendarType | undefined;
    try {
      if (this.stores.session.user) {
        toReturn = await api.getCalendar(
          this.stores.session.user.id,
          calendarId
        );
        toReturn.tasks = await api.getCalendarTasks(toReturn.id);
        toReturn.users = [this.stores.session.user];
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.isFetching = false;
      this.currentCalendar = toReturn;
      return toReturn;
    }
  };

  //--------------------------------------------------------------------- TASKS ---------------------------------------------------------------------
  getGlobalTasks = async (): Promise<Task[]> => {
    this.isFetching = true;
    let toReturn: Task[] = [];
    try {
      if (this.stores.session.user)
        toReturn = await api.getGlobalTasks(this.stores.session.user.id);
    } catch (e) {
      console.log(e);
    } finally {
      this.isFetching = false;
      return toReturn;
    }
  };

  getCalendarTasks = async (): Promise<Task[]> => {
    this.isFetching = true;
    let toReturn: Task[] = [];
    try {
    } catch (e) {
      console.log(e);
    } finally {
      this.isFetching = false;
      return toReturn;
    }
  };

  createTask = async (
    task: Task,
    calendarId: number
  ): Promise<Task | undefined> => {
    if (!this.stores.session.user) return undefined;
    this.isFetching = true;
    task.user = this.stores.session.user;
    task.calendarId = calendarId;
    let toReturn: Task | undefined;
    try {
      toReturn = await api.createTask(task);
    } catch (e) {
      console.log(e);
    } finally {
      this.isFetching = false;
      return toReturn;
    }
  };
}
