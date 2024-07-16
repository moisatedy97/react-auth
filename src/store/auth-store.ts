import { action, makeObservable, observable } from "mobx";

import { axiosInstance } from "@/lib/axios-interceptor";
import { User } from "@/lib/interfaces";

class AuthStore {
  user?: User = undefined;
  token?: string = undefined;
  isAuthenticated?: boolean = undefined;
  isRefreshing?: boolean = false;

  constructor() {
    makeObservable(this, {
      user: observable,
      isAuthenticated: observable,
      authenticateUser: action,
      logoutUser: action,
      setIsRefreshing: action,
      checkAuthenticated: action
    });
  }

  authenticateUser(user: User, token: string) {
    this.isAuthenticated = true;
    this.isRefreshing = false;
    this.user = user;
    this.token = token;
  }

  logoutUser() {
    this.isAuthenticated = false;
    this.isRefreshing = false;
    this.user = undefined;
  }

  setIsRefreshing(value: boolean) {
    this.isRefreshing = value;
  }

  async checkAuthenticated() {
    const { data } = await axiosInstance.get<{
      user: User;
      token: string;
    }>("/auth/checkAuthenticated");

    if (data) {
      this.authenticateUser(data.user, data.token);
    }
  }
}

export const authStore = new AuthStore();
export type I_Authentication = typeof authStore;
