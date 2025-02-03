import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.9:5000",
  validateStatus: (status) => true,
});

export default axiosInstance;
