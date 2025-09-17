import axios from "axios";

const api = axios.create({
  baseURL: "http://172.16.42.29/E-Jobs/Ejobs/app/api", // (seu IP)
});

export default api;
