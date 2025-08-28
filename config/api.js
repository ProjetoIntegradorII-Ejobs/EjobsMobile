import axios from "axios";

const api = axios.create({
  baseURL: "http://172.16.42.130/E-Jobs/app/api", // (seu IP)
});

export default api;
