import { makeAutoObservable } from "mobx";
import api from "../services/api";
import { Stores, User } from "./../types";
import { configure } from "mobx";

configure({
  enforceActions: "never",
});

export class SessionStore {
  isInitialized = false;
  isSubmitting = false;
  stores: Stores;
  sessionToken: string | undefined = undefined;

  constructor(stores: Stores) {
    this.stores = stores;
    makeAutoObservable(this);
  }

  user: User | null = null;

  get isLogged() {
    return this.user !== null;
  }

  signup = async (nominative: string, email: string, password: string) => {
    this.isSubmitting = true;
    try {
      await api.signup({ nominative, email, password });
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      this.isSubmitting = false;
    }
  };

  login = async (email: string, password: string) => {
    this.isSubmitting = true;
    try {
      await api.login(email, password);
      this.sessionToken = api.getSessionToken();
      this.persistSession();
      this.user = await api.getCurrentUser();
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      this.isSubmitting = false;
    }
  };

  forgotPassword = async (email: string): Promise<boolean> => {
    this.isSubmitting = true;
    let toReturn = false;
    try {
      toReturn = await api.forgotPassword(email);
    } catch (e) {
      console.log(e);
    }

    return toReturn;
  };

  verifyPasswordResetCode = async (
    email: string,
    passwordResetCode: string
  ): Promise<boolean> => {
    this.isSubmitting = true;
    let toReturn = false;
    try {
      toReturn = await api.verifyPasswordResetCode(email, passwordResetCode);
    } catch (e) {
      console.log(e);
    }

    return toReturn;
  };

  updatePassword = async (
    email: string,
    passwordResetCode: string,
    newPassword: string
  ): Promise<boolean> => {
    this.isSubmitting = true;
    let toReturn = false;
    try {
      toReturn = await api.updatePassword(
        email,
        passwordResetCode,
        newPassword
      );
    } catch (e) {
      console.log(e);
    }

    return toReturn;
  };

  getUserByCookie = async () => {
    this.isSubmitting = true;
    try {
      const user = await api.getUserByCookie();
      this.sessionToken = api.getSessionToken();
      this.user = { ...user };
      this.persistSession();
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      this.isSubmitting = false;
    }
  };

  initialize = async () => {
    try {
      this.restoreSession();
      if (this.sessionToken) {
        this.user = await api.getCurrentUser();
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.isInitialized = true;
    }
  };

  restoreSession = async () => {
    const data = localStorage.getItem("session");
    const sessionData = data ? JSON.parse(data) : null;

    if (sessionData) {
      this.sessionToken = sessionData.token;
    }
  };
  persistSession = async () => {
    const data = {
      token: this.sessionToken,
    };

    localStorage.setItem("session", JSON.stringify(data));
  };

  resetSession = async () => {
    this.user = null;
    this.sessionToken = undefined;
    localStorage.removeItem("session");
    await api.logout();
  };

  uploadAndSetUserAvatar = async (avatarFile: File) => {
    let formData = new FormData();
    formData.append("avatar", avatarFile);
    if (!this.user) throw new Error("User not logged");
    return await api.uploadAndSetUserAvatar(formData, +this.user.id);
  };

  updateUser = async (data: any) => {
    if (!this.user) throw new Error("User not logged");
    return await api.updateUser(data, +this.user.id);
  };
}
