//to ensure that the API base URL is pointing to the Rails server

let axios = require('axios');

let axiosClient = axios.create({
  baseURL: 'http://localhost:3000'
});

export default axiosClient;