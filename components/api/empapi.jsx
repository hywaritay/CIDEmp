import axios from 'axios';

import { API_BASE_URL } from './ApiURL'; 

export const getItems = async () => {
    return await axios.get(`${API_BASE_URL}/secure/admin/emp/all`);
};

export const getItem = async (id) => {
    return await axios.get(`${API_BASE_URL}/secure/admin/emp/find/${id}`);
};

export const createItem = async (formData) => {
    console.log(formData);
    return await axios.post(`${API_BASE_URL}/secure/admin/emp/create`, formData);
};

export const updateItem = async (formData) => {
    return await axios.post(`${API_BASE_URL}/secure/admin/emp/update`, formData);
};

export const deleteItem = async (id) => {
    return await axios.delete(`${API_BASE_URL}/secure/admin/emp/delete/?id=${id}`);
};
