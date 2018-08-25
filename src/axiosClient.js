let axios = require('axios');

let axiosClient = axios.create({
  baseURL: 'https://negabook-server.herokuapp.com'
});

export default axiosClient;