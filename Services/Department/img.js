import axios from "axios";
import API_URL from "../config";
import { Cookies } from 'react-cookie';

const fetchDepartmentImage = (deptId) => {
    const cookies = new Cookies();

    try {
        // Get the token from cookies
        const token = cookies.get('authToken');

        // Set the token in the request headers
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // Make the GET request to fetch the department image with the provided department ID
        return axios.get(`${API_URL}/departments/images/${deptId}`, config);
    } catch (error) {
        console.error('Error getting token from cookies:', error);
        // You may want to handle this error appropriately based on your application's requirements
        throw error;
    }
};

export default fetchDepartmentImage;