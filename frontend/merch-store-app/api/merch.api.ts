import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";
import { Merch } from "@/interface/type";

export const getAllMerch = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get("/api/merch/");
};

export const storeMerch = async (merch: Merch): Promise<AxiosResponse> => {
  return await axiosInstance.post("/api/merch/store", merch);
};

export const getMerch = async (_id: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(`/api/merch/id/${_id}`);
};

export const deleteMerch = async (_id: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(`/api/merch/${_id}`);
};

export const updateMerch = async (
  _id: string,
  merch: Merch
): Promise<AxiosResponse> => {
  return await axiosInstance.put(`/api/merch/${_id}`, merch);
};
