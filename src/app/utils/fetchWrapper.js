// /util/fetchWrapper.js
const fetchWrapper = {
  post,
  get,
  put,
  del,
};

function handleTokenExpiration(response) {
  if (response.status === 401) {
    // Token expired or unauthorized
    alert('Your session has expired. Please login again.');
    // Redirect to login page
    window.location.href = '/login'; // Adjust the path as needed
    return Promise.reject(new Error('Token expired'));
  }
  return response;
}

async function post(url, body, token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleTokenExpiration(response);
}

async function put(url, body, token) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleTokenExpiration(response);
}

async function get(url, token) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
  };
  const response = await fetch(url, requestOptions);
  return handleTokenExpiration(response);
}

async function del(url, body = null, token) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(body), // Only for bulk delete
  };

  // If no incoming body, then remove body from options
  if (!body) delete requestOptions.body;

  const response = await fetch(url, requestOptions);
  return handleTokenExpiration(response);
}

export default fetchWrapper;