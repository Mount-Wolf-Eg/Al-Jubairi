import axios from "axios";

const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data;",
    "Accept-Language": sessionStorage.getItem("lang") || "ar",
  },
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        return Promise.reject("error");
      }

      if (error.response && error.response.status === 401) {
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
