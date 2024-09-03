import axios from 'axios';

import { API_BASE_URL } from './ApiURL'; 

export const getItems = async () => {
    return await axios.get(`${API_BASE_URL}/secure/admin/location/all`);
};

export const getItem = async (id) => {
    return await axios.get(`${API_BASE_URL}/secure/admin/location/find/${id}`);
};

export const createItem = async (locationName) => {
    console.log(locationName);
    return await axios.post(`${API_BASE_URL}/secure/admin/location/create`, locationName);
};

export const updateItem = async (locationName) => {
    return await axios.post(`${API_BASE_URL}/secure/admin/location/update`, locationName);
};

export const deleteItem = async (id) => {
    return await axios.delete(`${API_BASE_URL}/secure/admin/location/delete/?id=${id}`);
};
