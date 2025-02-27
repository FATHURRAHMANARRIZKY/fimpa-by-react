import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:8080", // Your backend server URL
  withCredentials: true, // Ensure cookies are sent with requests
});

// Interceptor for handling requests
api.interceptors.request.use(
  (config) => {
    // If you are using JWT token stored in localStorage or cookies
    const token = localStorage.getItem("token"); // Example for retrieving token

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token to header if it exists
    }

    return config; // Continue with the request
  },
  (error) => {
    return Promise.reject(error); // Handle any errors during the request
  }
);

// Interceptor for handling responses
api.interceptors.response.use(
  (response) => {
    // Handle response if needed
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      console.log("Unauthorized! Redirecting to login...");
      // Redirect to login page (you can use react-router or window.location.href)
    }
    return Promise.reject(error); // Handle all errors
  }
);

export default api;
