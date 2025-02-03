import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return await axiosInstance.post("/api/auth/login", { email, password });
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return await axiosInstance.post("/api/auth/register", {
    name,
    email,
    password,
  });
};

export const logout = async (): Promise<AxiosResponse> => {
  return await axiosInstance.post("/api/auth/logout");
};
