let axios = require('axios');

let axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:3000'
});
const baseURL = 'http://127.0.0.1:3000';

export function getQueryParams() {
  const query = window.location.search.substring(1);
  const pairs = query.split('&').map((str) => str.split('='));
  return pairs.reduce((memo, pair) => {
    memo[pair[0]] = pair[1];
    return memo;
  }, {});
}

export function fetchUserDetails(options) {
  const { token } = options;
  const url = `${baseURL}/user?token=${token}`;

  return fetch(url, {
    headers: {
      'Accept': 'application/json'
    },
  })
  .then(response => {
    return response.json();
  })
  .catch(error => {
    console.error('Could not fetch user details', error);
  });
}









export default axiosClient;