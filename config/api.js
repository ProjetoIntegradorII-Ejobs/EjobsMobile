import axios from "axios";

const api = axios.create({
  baseURL: "http://172.16.43.161/E-Jobs/app" ,
});

export default api;
