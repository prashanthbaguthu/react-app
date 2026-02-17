import axios from "axios";

const API_URL = "http://localhost:5292/api/Customer";

export const getAllCustomers = () => axios.get(`${API_URL}/GetAllCustomers`);

export const getCustomerById = (id) => axios.get(`${API_URL}/GetCustomerById/${id}`);

export const insertCustomer = (customer) => axios.post(`${API_URL}/InsertCustomer`, customer);

export const updateCustomer = (customer) => axios.put(`${API_URL}/UpdateCustomer`, customer);

export const deleteCustomer = (id) => axios.delete(`${API_URL}/DeleteCustomer/${id}`);

/* Server-side Paging + Search */
export const getPagedCustomers = (skip, take, search) =>
  axios.get(`${API_URL}/Paged?skip=${skip}&take=${take}&search=${search}`);