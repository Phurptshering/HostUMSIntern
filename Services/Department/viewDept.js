import axios from 'axios';
import { Cookies } from 'react-cookie';
import API_URL from '../config';

const viewDeptHandler = (id, navigate) => {
    const cookies = new Cookies();

    // Get the token from cookies
    const token = cookies.get('authToken');

    // Set the token in the request headers
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    // Make an API call to fetch department details based on id
    axios
        .get(`${API_URL}/departments/${id}`, config)
        .then((response) => {
            const deptDetails = response.data;
            console.log(deptDetails);

            // Navigate to the /deptview page and pass the department details as props
            navigate("/deptview", { replace: true, state: { deptDetails } });
        })
        .catch((error) =>
            console.error("Error fetching department data:", error)
        );
};

export default viewDeptHandler;
