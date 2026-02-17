// src/config/apiEndpoints.js
const API_BASE_URL = process.env.REACT_APP_API_URL; // from .env

const API_ENDPOINTS = {
  EMPLOYEE: {
    GET_ALL: `${API_BASE_URL}/api/Employee`,
    CREATE: `${API_BASE_URL}/api/Employee`,
    UPDATE: `${API_BASE_URL}/api/Employee`,
    DELETE: (id) => `${API_BASE_URL}/api/Employee/${id}`,
  },
  ACCOUNT: {
    REGISTER: `${API_BASE_URL}/api/Account/Insert_UserAccounts`,
    LOGIN: `${API_BASE_URL}/api/Account/login`,
  },
};

export default API_ENDPOINTS;
