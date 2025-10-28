import axios from "axios";

const api = axios.create({
  baseURL: "https://e-clothingfrontend.onrender.com",
});

export default api;
