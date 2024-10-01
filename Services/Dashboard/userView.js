import axios from 'axios';
import API_URL from '../config';
import { Cookies } from 'react-cookie';

const viewUserHandler = (id, navigate) => {
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

        // Make an API call to fetch user details based on id
        axios
            .get(`${API_URL}/users/${id}`, config)
            .then((response) => {
                const userDetails = response.data;
                console.log(userDetails);

                // Navigate to the /userview page and pass the user details as props
                navigate("/userview", { replace: true, state: { userDetails } });
            })
            .catch((error) => console.error("Error fetching user data:", error));
    } catch (error) {
        console.error('Error getting token from cookies:', error);
    }
};

export default viewUserHandler;
