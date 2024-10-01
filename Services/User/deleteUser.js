import axios from 'axios';
import API_URL from '../config';
import { Cookies } from 'react-cookie';

export const deleteUser = async (ID, showDeleteModal) => {
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

        await axios.delete(
            `${API_URL}/users/${ID}`, config
        );

        showDeleteModal("User deleted successfully");

    } catch (error) {
        showDeleteModal("Failed to delete user");
        console.error("Error deleting data:", error);
    }
};

export default deleteUser;
