import axios from "axios";

export const request = async (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.setAuthorization(`Bearer ${token}`);
    return config;
  }

  return config;
};

const ApiInstance = axios.create({
  baseURL: "http://localhost:8000",
});

ApiInstance.interceptors.request.use(request);

export default ApiInstance;
