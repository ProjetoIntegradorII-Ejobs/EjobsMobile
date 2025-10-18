import axios from "axios";

const api = axios.create({
  baseURL: "http://172.16.41.197/E-Jobs/app" ,
});

export default api;
