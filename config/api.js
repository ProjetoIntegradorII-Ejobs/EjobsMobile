import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.79/E-Jobs/app", // (seu IP)
});

export default api;
