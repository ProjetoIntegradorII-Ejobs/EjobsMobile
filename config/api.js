import axios from "axios";

const api = axios.create({
  baseURL: "http://172.16.40.68/E-Jobs/app" ,
});

export default api;
