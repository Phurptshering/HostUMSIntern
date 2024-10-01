import axios from "axios";
import API_URL from "../config";
import { Cookies } from 'react-cookie';

const addUser = (userData) => {
    const cookies = new Cookies();

    try {
        // Get the token from cookies
        const token = cookies.get('authToken');

        // Set the token in the request headers
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        };

        // Make the POST request to add a new user with the provided data
        return axios.post(`${API_URL}/users`, userData, config);
    } catch (error) {
        console.error('Error getting token from cookies:', error);
        // You may want to handle this error appropriately based on your application's requirements
        throw error;
    }
};

export default addUser;
