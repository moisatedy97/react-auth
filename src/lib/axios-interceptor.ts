import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { authStore } from "@/store/auth-store";

import { User } from "./interfaces";
import { toast } from "sonner";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8081",
  timeout: 5000
});

axiosInstance.interceptors.request.use(
  async (request: InternalAxiosRequestConfig) => {
    if (!authStore.isRefreshing && authStore.token) {
      request.headers["Authorization"] = `Bearer ${authStore.token}`;
    }

    request.headers["Content-Type"] = "application/json";
    request.headers["Accept"] = "application/json";
    request.withCredentials = true;

    return request;
  },
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (originalRequest && error.response) {
      const { status } = error.response;

      if (status === 401) {
        if (!authStore.isRefreshing && authStore.token) {
          authStore.setIsRefreshing(true);

          const { data } = await axiosInstance.get<{
            user: User;
            token: string;
          }>("/auth/checkAuthenticated");

          if (data) {
            originalRequest.headers["Authorization"] = `Bearer ${data.token}`;

            authStore.authenticateUser(data.user, data.token);
            axiosInstance(originalRequest);
          }
        } else {
          authStore.logoutUser();

          return Promise.reject(error);
        }
      }
    }

    // This means the server is basically down
    authStore.logoutUser();
    toast.error("Sorry! Something went wrong. Please try again.");

    return Promise.reject(error);
  }
);
