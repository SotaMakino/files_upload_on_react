const axios = require("axios");
const axiosClient = axios.create({
  baseURL: "https://negabook-server.herokuapp.com"
});

export default axiosClient;
