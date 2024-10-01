import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUser } from "../Services/User/updateUser";
import fetchDept from "../Services/Department/fetchDept";
import { fetchFilteredSections } from "../Services/Sections/fetchFilSect";
import { deleteUser } from "../Services/User/deleteUser";
import user from '../usrPlace.jpg'
import API_URL from "../Services/config";

export const Userview = () => {

    const [successMessage, setSuccessMessage] = useState("");

    // Show success modal function
    const showSuccessModal = (message) => {
        console.log("showSuccessModal called: ", message);
        setSuccessMessage(message);
        // setAddConfirmationModalVisible(true);
        setTimeout(() => {
            hideSuccessModal();
            navigate('/dashboard');
        }, 3000);
    };

    // Hide success modal function
    const hideSuccessModal = () => {
        setSuccessMessage("");
    };

    //Delete message
    const [deleteMessage, setDeleteMessage] = useState("");

    // Show success modal function
    const showDeleteModal = (message) => {
        console.log("showDeleteModal called: ", message);
        setDeleteMessage(message);
        // setAddConfirmationModalVisible(true);
        setTimeout(() => {
            hideDeleteModal();
            navigate('/dashboard');
        }, 3000);
    };

    // Hide delete modal function
    const hideDeleteModal = () => {
        setDeleteMessage("");
    };

    const location = useLocation();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(location.state.userDetails);
    const [departmentId, setDepartmentId] = useState(location.state.userDetails?.section?.department?.deptId);
    const [isDeleteConfirmationModalVisible, setDeleteConfirmationModalVisible] =
        useState(false);
    const [isUpdateConfirmationModalVisible, setUpdateConfirmationModalVisible] =
        useState(false);

    const handleEdit = () => {
        setIsEditing(true);
        // Enable input fields
        document.querySelectorAll("input[disabled]").forEach((input) => {
            input.removeAttribute("disabled");
        });
    };

    // confirmation dialog for delete
    const showDeleteConfirmationModal = () => {
        setDeleteConfirmationModalVisible(true);
    };

    const hideDeleteConfirmationModal = () => {
        setDeleteConfirmationModalVisible(false);
    };

    //confirmation dialog for update
    const showUpdateConfirmationModal = () => {
        setUpdateConfirmationModalVisible(true);
    };

    const hideUpdateConfirmationModal = () => {
        setUpdateConfirmationModalVisible(false);
    };

    const updateAPIData = async () => {
        console.log("data format: ", userData);

        await updateUser(userData, showSuccessModal);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    //Delete user
    const onDelete = async () => {
        const ID = location.state.userDetails?.userId;
        await deleteUser(ID, showDeleteModal);
    };


    //Fetch departments
    const [department, setDepartment] = useState();
    fetchDept()
        .then((response) => {
            setDepartment(response.data);
        })


    //Fetch sections
    const [sections, setSections] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const filteredSections = await fetchFilteredSections(departmentId);
                setSections(filteredSections);
            } catch (error) {
            }
        };
        fetchData();
    }, [departmentId]);



    return (
        <section className="h-screen w-screen bg-gray-100/50 pt-10 overflow-scroll">
            {
                <form className="container w-screen mx-auto shadow-md md:w-3/4">
                    <div className="p-4 border-t-2 border-sky-600 rounded-lg bg-gray-100/5 ">
                        <div className="max-w-sm mx-auto md:w-full md:mx-0">
                            <div className="inline-flex items-center space-x-4">
                                <div className="relative block pl-8">
                                    <img
                                        alt="profile"
                                        src={`${API_URL}/profile_images/${userData.userId}`}
                                        className="mx-auto object-cover rounded-full h-16 w-16 z-0 "
                                    />
                                </div>
                                <h1 className="text-gray-600 text-xl">

                                    {userData.firstName}
                                    {""} {userData.middleName} {""}
                                    {userData.lastName}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 max-w-screen bg-white">
                        <div className="flex-1">
                            <div className="items-center w-full p-4 space-y-4 text-gray-900 md:inline-flex  ">
                                <h2 className="max-w-sm mx-auto md:w-1/3">Employee ID</h2>
                                <div className="max-w-sm mx-auto md:w-2/3 flex-1">
                                    <div className="relative">
                                        <input
                                            maxLength="8"

                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            // value={location.state.userDetails.userId}
                                            defaultValue={userData.employeeId}
                                            type="text"
                                            id="employeeId"
                                            className="rounded-lg  border-transparent border border-gray-300 w-full px-4 bg-white text-gray-500 placeholder-gray-600 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center w-full p-4 space-y-4 text-gray-900 md:inline-flex md:space-y-0">
                                <h2 class="max-w-sm mx-auto md:w-1/3">Name</h2>
                                <div class="max-w-sm mx-auto md:w-2/3 flex space-x-4">
                                    <div class="relative flex-1">
                                        <input
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            // value={location.state.userDetails.firstName}
                                            defaultValue={userData.firstName}
                                            type="text"
                                            id="firstName"
                                            style={{ padding: '8px 0px' }}
                                            class="rounded-lg border-transparent border  w-full  bg-white text-gray-500 placeholder-gray-600 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div class="relative flex-1">
                                        <input
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            // value={location.state.userDetails.middleName}
                                            defaultValue={userData.middleName}
                                            type="text"
                                            id="middleName"
                                            style={{ padding: '8px 0px' }}
                                            class="rounded-lg border-transparent border border-gray-400 w-full  bg-white text-gray-500 placeholder-gray-600 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div class="relative flex-1">
                                        <input
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            // value={location.state.userDetails.lastName}
                                            defaultValue={userData.lastName}
                                            type="text"
                                            id="lastName"
                                            style={{ padding: '8px 0px' }}
                                            class="rounded-lg border-transparent border  w-full  bg-white text-gray-500 placeholder-gray-600 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="items-center w-full p-4 space-y-4 text-gray-900 md:inline-flex md:space-y-0 ">
                                <h2 class="max-w-sm mx-auto md:w-1/3">Gender</h2>
                                <div class="max-w-sm mx-auto md:w-2/3">
                                    <div class=" relative ">
                                        <select
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            // value={location.state.userDetails.gender}
                                            value={userData && userData.gender ? userData.gender.genderId : ''}
                                            id="gender"
                                            class=" rounded-lg border-transparent  border border-gray-300 w-full px-4 bg-white text-gray-500 placeholder-gray-600 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="1">Male</option>
                                            <option value="2">Female</option>
                                            <option value="3">Others</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <div class="items-center w-full p-4 space-y-4 text-gray-900 md:inline-flex md:space-y-0 ">
                                <h2 class="max-w-sm mx-auto md:w-1/3">Email Address</h2>
                                <div class="max-w-sm mx-auto md:w-2/3 ">
                                    <div class=" relative ">
                                        <input
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            // value={location.state.userDetails.email}
                                            defaultValue={userData.email}
                                            type="text"
                                            id="email"
                                            class=" rounded-lg border-transparent  border border-gray-300 w-full px-4 bg-white text-gray-500 placeholder-gray-600 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div class="items-center w-full p-4 space-y-4 text-gray-900 md:inline-flex md:space-y-0">
                                <h2 class="max-w-sm mx-auto md:w-1/3">Address</h2>
                                <div class="max-w-sm mx-auto space-y-5 md:w-2/3">
                                    <div>
                                        <div class=" relative ">
                                            <input
                                                disabled={!isEditing}
                                                onChange={handleChange}
                                                // value={location.state.userDetails.permanentAddress}
                                                defaultValue={userData?.address?.permanentAddress}
                                                type="text"
                                                id="permanentAddress"
                                                class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-500 placeholder-gray-900 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div class=" relative ">
                                            <input
                                                disabled={!isEditing}
                                                onChange={handleChange}
                                                // value={location.state.userDetails.presentAddress}
                                                defaultValue={userData?.address?.currentAddress}
                                                type="text"
                                                id="presentAddress"
                                                class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-500 placeholder-gray-900 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500  focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 p-10">
                            <div className="items-center w-full p-4 space-y-4 text-gray-900 md:inline-flex md:space-y-0 ">
                                <h2 className="max-w-sm mx-auto md:w-1/3">Mobile Number</h2>
                                <div className="max-w-sm mx-auto md:w-2/3 flex-1">
                                    <div className="relative">
                                        <input
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            defaultValue={userData.mobileNo}
                                            type="text"
                                            id="mobileNo"
                                            pattern="[0-9]*"
                                            maxLength="8"
                                            className="rounded-lg border-transparent border border-gray-500 w-full px-4 bg-white text-gray-500 placeholder-gray-600 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="items-center w-full p-4 space-y-4 text-gray-900 md:inline-flex md:space-y-0 ">
                                <h2 className="max-w-sm mx-auto md:w-1/3">Department</h2>
                                <div className="max-w-sm mx-auto md:w-2/3 flex-1">
                                    <div className="relative">

                                        <select
                                            disabled={!isEditing}
                                            value={departmentId}
                                            onChange={(e) => setDepartmentId(e.target.value)}
                                            id="department"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option >Select department</option>
                                            {Array.isArray(department) && department.map((dpt) => (
                                                <option value={parseInt(dpt.deptId)}>{dpt.deptName}</option>

                                            ))}


                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="items-center w-full p-4 space-y-4 text-gray-900 md:inline-flex md:space-y-0 ">
                                <h2 class="max-w-sm mx-auto md:w-1/3">Section</h2>
                                <div class="max-w-sm mx-auto md:w-2/3">
                                    <div class=" relative ">
                                        <select disabled={!isEditing}
                                            value={userData.section.sectId} onChange={handleChange} id="section" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option >Select section</option>
                                            {Array.isArray(sections) && sections.map((section) => (
                                                <option value={parseInt(section.sectId)}>{section.sectName}</option>

                                            ))}

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="items-center w-full p-4 space-y-4 text-gray-900 md:inline-flex md:space-y-0 ">
                                <h2 className="max-w-sm mx-auto md:w-1/3">CID</h2>
                                <div className="max-w-sm mx-auto md:w-2/3 flex-1">
                                    <div className="relative">
                                        <input
                                            pattern="[0-9]*"
                                            maxLength="11"
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            // value={location.state.userDetails.department}
                                            defaultValue={userData.cidNo}
                                            type="text"
                                            id="cid"
                                            className="rounded-lg border-transparent border border-gray-300 w-full px-4 bg-white text-gray-500 placeholder-gray-600 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="items-center w-full p-4 space-y-4 text-gray-900 md:inline-flex md:space-y-0 ">
                                <h2 class="max-w-sm mx-auto md:w-1/3">DOB</h2>
                                <div class="max-w-sm mx-auto md:w-2/3">
                                    <div class=" relative ">
                                        <input
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            // value={location.state.userDetails.section}
                                            defaultValue={userData.dob}
                                            type="date"
                                            id="dob"
                                            class=" rounded-lg border-transparent  border border-gray-300 w-full px-4 bg-white text-gray-500 placeholder-gray-600 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Save and Delete buttons */}
                    <div className="flex w-full px-4 pb-4 text-gray-500 bg-white">
                        <div className="ml-auto">
                            {isEditing ? (
                                <div className="flex">
                                    <button
                                        // onClick={handleUpdate}
                                        onClick={showUpdateConfirmationModal}
                                        type="button"
                                        className="py-2 px-4 mr-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                    >
                                        Update
                                    </button>

                                    <button
                                        // onClick={handleUpdate}
                                        onClick={() => {
                                            setIsEditing(false);
                                            // navigate("/userview");
                                        }}
                                        type="button"
                                        className="py-2 px-4 mr-4 outline-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-green-500 hover:text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>

                            ) : (
                                <div className="flex w-full px-4 pb-4 text-gray-500 bg-white">
                                    <div className="ml-auto">
                                        <button
                                            onClick={handleEdit}
                                            type="button"
                                            className="py-2 px-4 mr-4 bg-sky-600 hover:bg-sky-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            // onClick={() => onDelete(location.state.userDetails.id)}
                                            onClick={showDeleteConfirmationModal}
                                            type="button"
                                            className="py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form >
            }
            {/* {isConfirmationModalVisible && confirmationModal} */}
            {
                isDeleteConfirmationModalVisible && (
                    <div
                        className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
                        onClick={hideDeleteConfirmationModal}
                    >
                        <div className="absolute inset-0 bg-black opacity-10"></div>

                        <div className="z-50 bg-white p-6 rounded-lg shadow-md">
                            <div className="z-50 flex flex-col items-center justify-center">
                                <svg
                                    className="flex-shrink-0 inline w-10 h-10 mx-auto mb-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-normal mb-4">
                                This action cannot be recovered! <br></br>Are you sure you want to
                                delete this person?
                            </h3>
                            <button
                                onClick={onDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg mr-5 ml-12 hover:bg-red-500"
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                onClick={hideDeleteConfirmationModal}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200"
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                )
            }
            {
                isUpdateConfirmationModalVisible && (
                    <div
                        className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
                        onClick={hideUpdateConfirmationModal}
                    >
                        <div className="absolute inset-0 bg-black opacity-10"></div>

                        <div className="z-50 bg-white p-6 rounded-lg shadow-md">
                            <div className="flex flex-col items-center justify-center">
                                <svg
                                    className="flex-shrink-0 inline w-10 h-10 mx-auto mb-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-normal mb-4">
                                Are you sure you want to update it?
                            </h3>
                            <button
                                onClick={() => {
                                    updateAPIData();
                                    hideUpdateConfirmationModal();
                                    // handleUpdate();
                                }}
                                // onClick={updateAPIData}
                                className="bg-sky-600 text-white px-4 py-2 rounded-lg mr-5 ml-12 hover:bg-sky-500"
                            >
                                Yes, Update
                            </button>
                            <button
                                onClick={hideUpdateConfirmationModal}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200"
                            >
                                No, Cancel
                            </button>
                        </div>
                    </div>
                )
            }
            {successMessage && (
                <div
                    className={`fixed flex-col animate-pulse top-4 right-4 z-50 p-4 text-sm text-${successMessage === "Unable to edit user, might have duplicate CID/Employee ID or incorrect inputs" ? 'red' : 'green'}-800 rounded-lg bg-${successMessage === "Unable to edit user, please check your CID/ Emlpoyee ID" ? 'red' : 'green'}-300`}
                    role="alert"
                >
                    <div>
                        <svg
                            className="flex-shrink-0 inline w-4 h-4 me-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 ..." />
                        </svg>
                        <span className="sr-only">Info</span>
                        <span className="font-medium">{successMessage === "Unable to edit user, might have duplicate CID/Employee ID or incorrect inputs" ? 'Error' : 'Success'}</span> {successMessage}
                        {/* <span className="font-medium">Success!</span> {successMessage} */}
                    </div>
                </div>
            )}
            {deleteMessage && (
                <div
                    className={`fixed flex-col animate-pulse top-4 right-4 z-50 p-4 text-sm text-${deleteMessage === "User deleted successfully" ? 'red' : 'green'}-800
                         rounded-lg bg-${deleteMessage === "User deleted successfully" ? 'red' : 'green'}-300`}
                    role="alert"
                >
                    <div>
                        <svg
                            className="flex-shrink-0 inline w-4 h-4 me-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 ..." />
                        </svg>
                        <span className="sr-only">Info</span>
                        <span className="font-medium">{deleteMessage === "User deleted successfully" ? 'Success' : 'Error'}
                        </span> {deleteMessage}
                        {/* <span className="font-medium">Success!</span> {successMessage} */}
                    </div>
                </div>
            )}
        </section >
    );
};