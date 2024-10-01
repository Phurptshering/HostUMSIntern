import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import fetchSect from "../../Services/Sections/fetchSect";
import { Cookies } from 'react-cookie';

export const Sections = () => {
    const location = useLocation();
    const [sectionData, setSectionData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Show success modal function
    const showSuccessModal = (message) => {
        console.log("showSuccessModal called: ", message);
        setSuccessMessage(message);

        setTimeout(() => {
            // window.location.reload();
            hideSuccessModal();
        }, 3000);
    };

    // Hide success modal function
    const hideSuccessModal = () => {
        setSuccessMessage("");
    };


    //Fetch sections to display in departments page
    const deptId = location.state.deptDetails.deptId;
    console.log("Department ID:", deptId)
    fetchSect(deptId)
        .then((response) => {
            console.log("data from section: ", response)
            setSectionData(response);
            console.log("data after set: ", sectionData)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });


    const handleAddSection = (event) => {
        event.preventDefault();
        const cookies = new Cookies();
        try {
            // Get the token from cookies
            const token = cookies.get('authToken');

            // Fetch data from input fields
            const name = document.getElementById("name").value;

            // Define the data for the new section
            const newSectionData = {
                sectName: name,
                department: {
                    deptId: location.state.deptDetails.deptId,
                },
            };
            console.log(newSectionData, "Adding data");

            // Set the token in the request headers
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Make a POST request to add a new section with the provided data
            axios
                .post(
                    "https://real-coal-production.up.railway.app/sections",
                    newSectionData,
                    config
                )
                .then(() => {
                    // Close the modal
                    setIsModalOpen(false);
                    console.log("Added data");
                    //   openModal("section added successfully!");
                    showSuccessModal("Section added successfully");

                    // Refresh the page
                    //   window.location.reload();
                })
                .catch((error) => console.error("Error adding section:", error));
        } catch (error) {
            console.error("Error adding section:", error);
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8 lg:p-12">
            <hr></hr>
            <div className="flex justify-between">
                <h1 className="pt-11 ml-5 px-11 text-4xl font-bold text-gray-500">
                    Sections
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center mr-10 mt-11 mb-9 p-2 bg-sky-600 text-white rounded-md"
                >
                    Add Section <FaPlus className="w-3 ml-2" />
                </button>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sectionData?.map((section) => (
                    <li className="flex flex-row mb-2 border-gray-400">
                        <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-sky-600 dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                            <h1 className="mb-4 text-xl font-bold capitalize leading-none tracking-tight text-white">
                                {section.sectName}
                            </h1>
                        </div>
                    </li>
                ))}
            </ul>

            {isModalOpen && (
                <div
                    id="crud-modal"
                    role="dialog"
                    aria-hidden="false"
                    tabIndex="-1"
                    className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center max-h-screen max-w-screen bg-stone-800/50"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-1">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    Add new section
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form onSubmit={handleAddSection} className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Type section name"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="text-white inline-flex items-center mt-5 bg-sky-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <svg
                                        className="me-1 -ms-1 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    Add new section
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {successMessage && (
                <div
                    class="fixed flex-col animate-pulse top-4 right-4 z-50 p-4 text-sm text-green-800 rounded-lg bg-green-300"
                    role="alert"
                >
                    <div>
                        <svg
                            class="flex-shrink-0 inline w-4 h-4 me-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>


                        <span class="sr-only">Info</span>
                        <span class="font-medium">Success!</span> {successMessage}

                    </div>
                </div>
            )}
        </div>
    );
};