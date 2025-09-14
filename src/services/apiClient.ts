import axios from "axios";

const apiClient = axios.create({
  //For development
  // baseURL: "http://localhost:8000/",
  // For production
  baseURL: "https://ipse-dashboard-backend-adcpeuexeuf8fvf4.centralus-01.azurewebsites.net/"
});

console.log("[apiClient] baseURL =", apiClient.defaults.baseURL);


// Axios interceptors to add the authorization token to each request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error)
    return Promise.reject(error);
  }
);

export default apiClient;
