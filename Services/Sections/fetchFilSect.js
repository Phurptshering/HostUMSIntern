import axios from 'axios';
import API_URL from "../config";
import { Cookies } from 'react-cookie';

export const fetchFilteredSections = async (departmentId) => {
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

    // Make the GET request to fetch all sections
    const response = await axios.get(`${API_URL}/sections`, config);

    // Filter sections based on the selected departmentId
    const filteredSections = response.data.filter(
      (section) => section.department.deptId === parseInt(departmentId)
    );

    return filteredSections;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
