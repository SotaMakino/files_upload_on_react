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

export function fetchNegas(options) {
  const { token } = options;
  const url = `${baseURL}/negas?token=${token}`;

  return fetch(url, {
    headers: {
      'Accept': 'application/json'
    },
  })
  .then(response => {
    return response.json();
  })
  .catch(error => {
    console.error('Could not fetch negas', error);
  });
}

export function createNega(options) {
  const { token, nega } = options;
  const url = `${baseURL}/negas?token=${token}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nega })
  })
  .then(response => {
    return response.json();
  })
  .catch(error => {
    console.log('Could not create nega', error);
  });
}

export function updateNega(options) {
  const { token, nega } = options;
  const url = `${baseURL}/negas/${nega.id}?token=${token}`;

  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nega })
  })
  .then(response => {
    return response.json();
  })
  .catch(error => {
    console.log('Could not update nega', error);
  });
}

export function deleteNega(options) {
  const { token, nega } = options;
  const url = `${baseURL}/negas/${nega.id}?token=${token}`;

  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    }
  })
  .catch(error => {
    console.log('Could not delete nega', error);
  });
}

export function findIndex(arr, elem, comparator = (a, b) => a === b) {
  for (let i = 0; i < arr.length; i++) {
    if (comparator(elem, arr[i])) {
      return i;
    }
  }
  return -1;
}

export function contains(arr, elem, comparator) {
  return (findIndex(arr, elem, comparator) !== -1);
}

export function unique(arr, comparator) {
  return arr.filter((elem, index) => (
    index === findIndex(arr, elem, comparator)
  ));
}

export function union(arr1, arr2, comparator) {
  return unique(arr1.concat(arr2), comparator);
}

export function sortObjects(arr, key) {
  return arr.slice().sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];
    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  });
}

export default axiosClient;