import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import API_URL from "../../Services/config";
import { Cookies } from 'react-cookie';
import viewUserHandler from "../../Services/Dashboard/userView";
import userP from '../../usrPlace.jpg'

export const Tabledpt = () => {

    const location = useLocation();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const cookies = new Cookies();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get the token from cookies
                const token = cookies.get('authToken');

                // Set the token in the request headers
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                // Make a request to fetch user data for the department using cookies and tokens
                const response = await axios.get(
                    `${API_URL}/users/departments/${location.state.deptDetails.deptId}`,
                    config
                );

                setData(response.data);
                console.log("Data", response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [cookies, location.state.deptDetails.deptId]);

    // const viewUserHandler = (id) => {
    //     // Make an API call to fetch user details based on id
    //     axios
    //         .get(`${API_URL}/users/${id}`)
    //         .then((response) => {
    //             const userDetails = response.data;
    //             console.log(userDetails);

    //             // Navigate to the /userview page and pass the user details as props
    //             navigate("/userview", { replace: true, state: { userDetails } });
    //         })
    //         .catch((error) => console.error("Error fetching user data:", error));
    // };


    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-5 p-5">
            <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                <div>
                </div>
                <label for="table-search" class="sr-only">
                    Search
                </label>
                <div class="relative">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            class="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search by name"
                    />
                </div>
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="p-4">
                            SI.no
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Section
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.length > 0 ? (
                        data
                            .filter((user) => {
                                const fullName = [user.firstName, user.middleName, user.lastName]
                                    .filter((name) => name) // Filter out empty or undefined names
                                    .join(' ');

                                return fullName.toLowerCase().includes(searchTerm.toLowerCase());
                            })
                            .map((user, index) => (
                                <tr
                                    key={user.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="w-4 p-4">{index + 1}</td>
                                    <th
                                        scope="row"
                                        className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <img
                                            alt="user_profile"
                                            class="w-10 h-10 rounded-full"
                                            // src={`https://smiling-mark-production.up.railway.app/profile_images/${user.userId}`}
                                            src={`${API_URL}/profile_images/${user.userId}`}

                                        />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{`${user.firstName} ${user.middleName} ${user.lastName}`}</div>
                                            <div className="font-normal text-gray-500">
                                                {user.email}
                                            </div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">{user.mobileNo}</td>
                                    <td className="px-6 py-4">{user?.section?.sectName}</td>
                                    <td className="px-6 py-4 cursor-pointer ">
                                        <button
                                            className="bg-sky-600 text-white px-3 py-2 rounded "
                                            onClick={() => viewUserHandler(user.userId, navigate)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colspan="5" className="p-4 text-center">
                                <h1 className="text-lg">No users found</h1>
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
    );
};
