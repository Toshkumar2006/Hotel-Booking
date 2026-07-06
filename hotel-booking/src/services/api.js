import axios from "axios";

const api = axios.create({
  baseURL: "https://demohotelsapi.pythonanywhere.com",
});

export default api;
