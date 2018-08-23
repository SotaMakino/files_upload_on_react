let axios = require('axios');

let axiosClient = axios.create({
  baseURL: 'https://negabook-server.herokuapp.com/negabook-client/'
});

export default axiosClient;