import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

// axios.defaults.headers.common['Authorization'] = 'Bearer ' ${localStorage.getItem('token')};

export const getData = async (endpoint) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const postData = async (endpoint, data) => {
    try {
        const response = await axios.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const putData = async (endpoint, data) => {
    try {
        const response = await axios.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteData = async (endpoint) => {
    try {
        const response = await axios.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

