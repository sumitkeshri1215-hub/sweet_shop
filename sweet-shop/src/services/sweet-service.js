import { privateAxios } from "./helper";

// Get all sweets
export const getAllSweets = () => {
    return privateAxios.get('/api/sweets').then((response) => response.data);
}

// Get sweet by ID
export const getSweetById = (sweetId) => {
    return privateAxios.get(`/api/sweets/${sweetId}`).then((response) => response.data);
}

// Add new sweet
export const addSweet = (sweetData) => {
    return privateAxios.post('/api/sweets', sweetData).then((response) => response.data);
}

// Update sweet
export const updateSweet = (sweetId, sweetData) => {
    return privateAxios.put(`/api/sweets/${sweetId}`, sweetData).then((response) => response.data);
}

// Delete sweet
export const deleteSweet = (sweetId) => {
    return privateAxios.delete(`/api/sweets/${sweetId}`).then((response) => response.data);
}

// Restock sweet
export const restockSweet = (sweetId, quantity) => {
    return privateAxios.post(`/api/sweets/${sweetId}/restock?qty=${quantity}`).then((response) => response.data);
}

// Purchase sweet
export const purchaseSweet = (sweetId, quantity) => {
    return privateAxios.post(`/api/sweets/${sweetId}/purchase?qty=${quantity}`).then((response) => response.data);
}

// Search sweets
export const searchSweets = (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
            params.append(key, filters[key]);
        }
    });
    return privateAxios.get(`/api/sweets/search?${params}`).then((response) => response.data);
}