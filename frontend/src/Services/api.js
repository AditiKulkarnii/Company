import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getCompanies = async () => {
  try {
    const response = await axios.get(`${API_URL}/companies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching companies', error);
    throw error;
  }
};

export const createCompany = async (company) => {
  try {
    const response = await axios.post(`${API_URL}/companies`, company);
    return response.data;
  } catch (error) {
    console.error('Error creating company', error);
    throw error;
  }
};

export const updateCompany = async (id, company) => {
  try {
    const response = await axios.put(`${API_URL}/companies/${id}`, company);
    return response.data;
  } catch (error) {
    console.error('Error updating company', error);
    throw error;
  }
};

export const deleteCompany = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting company', error);
    throw error;
  }
};

export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees', error);
    throw error;
  }
};

export const createEmployee = async (employee) => {
  try {
    const response = await axios.post(`${API_URL}/employees`, employee);
    return response.data;
  } catch (error) {
    console.error('Error creating employee', error);
    throw error;
  }
};

export const updateEmployee = async (id, employee) => {
  try {
    const response = await axios.put(`${API_URL}/employees/${id}`, employee);
    return response.data;
  } catch (error) {
    console.error('Error updating employee', error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting employee', error);
    throw error;
  }
};

export const getSecondHighestSalary = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/second-highest-salary`);
    return response.data;
  } catch (error) {
    console.error('Error fetching second highest salary', error);
    throw error;
  }
};

export const getMaxSalaryEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/max-salary-employees`);
    return response.data;
  } catch (error) {
    console.error('Error fetching max salary employees', error);
    throw error;
  }
};
