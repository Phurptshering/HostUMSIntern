import axios from 'axios';
import { Cookies } from 'react-cookie';
import API_URL from '../config';

const users = async () => {
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

        // Make the request with the token in the headers
        const response = await axios.get(`${API_URL}/users`, config);
        console.log("User data", response);

        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Rethrow the error for the caller to handle
    }
};

export default users;
