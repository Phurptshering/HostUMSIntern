import axios from "axios";
import API_URL from "../config";
import { Cookies } from "react-cookie";

const fetchDept = async () => {
  const cookies = new Cookies();

  try {
    // Get the token from cookies
    const token = cookies.get("authToken");

    // Set the token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.get(`${API_URL}/departments`, config);
  } catch (error) {
    console.error("Error fetching department data:", error);
  }
};

export default fetchDept;
