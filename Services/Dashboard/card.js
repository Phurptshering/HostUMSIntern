import axios from 'axios';
import { Cookies } from 'react-cookie';

const fetchData = async (url, setData) => {
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
        const response = await axios.get(url, config);

        setData(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default fetchData;
