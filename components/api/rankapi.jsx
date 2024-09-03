import axios from 'axios';

import { API_BASE_URL } from './ApiURL'; 

export const getItems = async () => {
    console.log(`${API_BASE_URL}/secure/admin/rank/all`);
    return await axios.get(`${API_BASE_URL}/secure/admin/rank/all`);
};

export const getItem = async (id) => {
    return await axios.get(`${API_BASE_URL}/secure/admin/rank/find/${id}`);
};

export const createItem = async (rankName) => {
    console.log(rankName);
    return await axios.post(`${API_BASE_URL}/secure/admin/rank/create`, rankName);
};

export const updateItem = async (rankName) => {
    return await axios.post(`${API_BASE_URL}/secure/admin/rank/update`, rankName);
};

export const deleteItem = async (id) => {
    return await axios.delete(`${API_BASE_URL}/secure/admin/rank/delete/?id=${id}`);
};
