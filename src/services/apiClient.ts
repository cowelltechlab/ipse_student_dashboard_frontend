import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:8000/",
  // TODO: Update with live backend URL when available
  baseURL: "ipse-dashboard-backend-adcpeuexeuf8fvf4.centralus-01.azurewebsites.net"
});

// Use Axios interceptors to add the authorization token to each request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
