import axios from "axios";

export interface ApiResponse<T> {
  status: "error" | "success";
  message?: string;
  data?: T;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

api.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem("tokens");

    if (tokens) {
      config.headers.Authorization = JSON.parse(tokens).accessToken;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokens = JSON.parse(localStorage.getItem("tokens") || "");

      try {
        const response = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/auth/refresh-token",
          {
            refreshToken: tokens.refreshToken,
          }
        );

        if (response.status === 200) {
          const newTokens = response.data;

          localStorage.setItem("tokens", JSON.stringify(newTokens));
          axios.defaults.headers.common["Authorization"] =
            newTokens.accessToken;
          originalRequest.headers["Authorization"] = newTokens.accessToken;

          return api(originalRequest);
        }
      } catch (err) {
        console.error("Refresh token failed", err);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
