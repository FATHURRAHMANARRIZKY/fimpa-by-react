import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Ganti dengan baseURL backend Anda
  withCredentials: true, // Izinkan mengirim cookie bersama permintaan
});

// Middleware untuk menyertakan token di semua permintaan
api.interceptors.request.use(
  (config) => {
    // Anda tidak perlu mengambil token dari localStorage, karena token akan disertakan dalam cookie
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
