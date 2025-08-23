import axios from "axios";

const attendeeAxios = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/dashboard/attendee`,
  withCredentials: true,
});

attendeeAxios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (config.data && !(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default attendeeAxios;
