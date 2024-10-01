import axios from 'axios';
import API_URL from "../config";
import { Cookies } from 'react-cookie';

const fetchSect = async (deptId) => {
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

        // Make the GET request to fetch sections for a specific department
        const response = await axios.get(`${API_URL}/sections/departments/${deptId}`, config);
        console.log("Fetching sections service: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export default fetchSect;
