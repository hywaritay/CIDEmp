import axios from 'axios';

import { API_BASE_URL } from './ApiURL'; 

export const getItems = async () => {
    return await axios.get(`${API_BASE_URL}/secure/admin/dept/all`);
};

export const getItem = async (id) => {
    return await axios.get(`${API_BASE_URL}/secure/admin/dept/find/${id}`);
};

export const createItem = async (deptName) => {
    console.log(deptName);
    return await axios.post(`${API_BASE_URL}/secure/admin/dept/create`, deptName);
};

export const updateItem = async (deptName) => {
    return await axios.post(`${API_BASE_URL}/secure/admin/dept/update`, deptName);
};

export const deleteItem = async (id) => {
    return await axios.delete(`${API_BASE_URL}/secure/admin/dept/delete/?id=${id}`);
};
