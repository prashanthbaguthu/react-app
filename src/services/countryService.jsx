import axios from "axios";

const API_URL = "http://localhost:5292/api/Country";

// ✅ Get Countries
export const getCountries = () => {
  return axios.get(`${API_URL}/countries`);
};

// ✅ Get States by CountryId
export const getStates = (countryId) => {
  return axios.get(`${API_URL}/states/${countryId}`);
};

// ✅ Get Districts by StateId
export const getDistricts = (stateId) => {
  return axios.get(`${API_URL}/districts/${stateId}`);
};

// ✅ Get Mandals by DistrictId
export const getMandals = (districtId) => {
  return axios.get(`${API_URL}/mandals/${districtId}`);
};

// ✅ Get Villages by MandalId
export const getVillages = (mandalId) => {
  return axios.get(`${API_URL}/villages/${mandalId}`);
};

// ✅ Add new function for inserting a country
export const addCountry = (country) => {
    debugger;
  return axios.post(`${API_URL}/addcountries`, country);
  };

  export const deleteCountry = (id) => {
  return axios.delete(`${API_URL}/Country/${id}`);
};