import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import fetchDept from "../Services/Department/fetchDept";
import addUser from "../Services/User/addUser";
import { fetchFilteredSections } from "../Services/Sections/fetchFilSect";
import SuccessMessage from "../Modals/Alert";
import ConfirmationModal from "../Modals/confirmAddUser";

export const AddUser = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cidNo, setCidNo] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [sectionId, setSectionId] = useState("");
    const [permanentAddress, setPermanentAddress] = useState("");
    const [currentAddress, setCurrentAddress] = useState("");
    const [genderId, setGenderId] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [dob, setDob] = useState("");
    const [image, setImage] = useState(null);

    const [isAddConfirmationModalVisible, setAddConfirmationModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    // Show success modal function
    const showSuccessModal = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            navigate('/dashboard');
            hideSuccessModal();
        }, 3000);

    };

    // Hide success modal function
    const hideSuccessModal = () => {
        setAddConfirmationModalVisible(false);
        setSuccessMessage("");
    };

    //confirmation dialog for update
    const showAddConfirmationModal = (msg) => {
        setModalMessage(msg);
        setAddConfirmationModalVisible(true);
    };

    const validateForm = () => {
        // Check if all required fields are filled in
        return (
            firstName.trim() !== "" &&
            genderId !== "" &&
            employeeId.trim() !== "" &&
            email.trim() !== "" &&
            cidNo.trim() !== "" &&
            dob.trim() !== "" &&
            departmentId !== "" &&
            sectionId !== "" &&
            mobileNo.trim() !== "" &&
            image !== null
        );
    };

    const handleAddUserClick = () => {
        if (validateForm()) {
            showAddConfirmationModal("Are you sure you want to add the user?");
        } else {
            // Handle the case where the form is not valid (e.g., display an error message)
            showAddConfirmationModal("Please enter all the fields");

        }
    };

    const postData = () => {
        var bodyFormData = new FormData();

        const userBody = {
            firstName,
            middleName,
            lastName,
            gender: {
                genderId: genderId,
            },
            employeeId,
            email,
            address: {
                permanentAddress: permanentAddress,
                currentAddress: currentAddress,
            },
            section: {
                sectId: sectionId,
                department: {
                    deptId: departmentId,
                },
            },
            mobileNo,
            cidNo,
            dob,
        };

        const json = JSON.stringify(userBody);
        const blob = new Blob([json], {
            type: "application/json",
        });
        bodyFormData.append("user", blob);
        bodyFormData.append("profileImageFile", image);

        //Add user
        addUser(bodyFormData)
            .then((response) => {
                if (response.status === 201) {
                    showSuccessModal("User added successfully");
                }
            })
            .catch((error) => {
                showSuccessModal("Unable to add user, please check your CID/ Employee ID");
                console.error("Error:", error);
            });
    };

    //Fetch departments in the form
    const [department, setDepartment] = useState();
    fetchDept()
        .then((response) => {
            setDepartment(response.data);
        })


    //Fetch sections based on department ID
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
        <div className="w-screen overflow-scroll pb-11">
            <h1 className="pt-11 pb-7 ml-5 px-11 text-4xl font-bold text-sky-600">
                Add a new user
            </h1>
            <hr></hr>
            <section class="pt-8 ">
                <div class=" px-8 mx-auto max-w-2xl lg:py-4 shadow-md md:w-3/4 border-t-2 border-sky-600 rounded-lg p-8">
                    <form onSubmit={(e) => e.preventDefault()} className="rounded">
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2 grid grid-cols-3 gap-4">
                                <div>
                                    <label
                                        for="firstName"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        onChange={(e) => setFirstName(e.target.value)}
                                        type="text" name="firstName" id="firstName"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Type first name"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        for="middleName"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Middle Name
                                    </label>
                                    <input
                                        onChange={(e) => setMiddleName(e.target.value)}
                                        type="text" name="middleName" id="middleName"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Type middle name" required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        for="lastName"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text" name="lastName" id="lastName"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                         focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Type last name" required=""
                                    />
                                </div>
                            </div>

                            <label
                                for="description"
                                class="block  text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Gender
                            </label>
                            <div
                                onChange={(e) => setGenderId(e.target.value)}
                                class="sm:col-span-2 grid grid-cols-3 gap-4"
                            >
                                <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input 
                                        id="bordered-radio-1" type="radio" value="1"  name="bordered-radio"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                    />
                                    <label
                                        for="bordered-radio-1"
                                        class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Male
                                    </label>
                                </div>
                                <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input
                                        id="bordered-radio-2" type="radio" value="2" name="bordered-radio"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                    />
                                    <label
                                        for="bordered-radio-2"
                                        class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Female
                                    </label>
                                </div>
                                <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input
                                        id="bordered-radio-3" type="radio" value="3" name="bordered-radio"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                    />
                                    <label
                                        for="bordered-radio-3"
                                        class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Others
                                    </label>
                                </div>
                            </div>

                            <div class="sm:col-span-2 grid grid-cols-3 gap-4">
                                <div>
                                    <label
                                        for="employeeId"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        User ID
                                    </label>
                                    <input
                                        onInput={(e) =>
                                            setEmployeeId(
                                                (e.target.value = Math.max(
                                                    0,
                                                    parseInt(e.target.value) || 0
                                                )
                                                    .toString()
                                                    .slice(0, 8))
                                            )
                                        }
                                        type="number" name="employeeId" id="employeeId"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="12345678" required
                                        
                                    />
                                </div>
                                <div class="col-span-2">
                                    <label
                                        for="email"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                                        type="text" name="email" id="email"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                         focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="abc@gmail.com" required=""
                                        
                                    />
                                </div>
                            </div>
                            <div class="sm:col-span-2 grid grid-cols-3 gap-4">
                                <div class="col-span-2">
                                    <label
                                        for="CID"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        CID
                                    </label>
                                    <input
                                        onInput={(e) =>
                                            setCidNo(
                                                (e.target.value = Math.max(
                                                    0,
                                                    parseInt(e.target.value) || 0
                                                )
                                                    .toString()
                                                    .slice(0, 11))
                                            )
                                        }
                                        type="number" name="CID" id="CID"  
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="12345678910" required
                                        
                                    />
                                </div>
                                <div>
                                    <label
                                        for="dob"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        DOB
                                    </label>
                                    <input
                                        onChange={(e) => setDob(e.target.value)}
                                        type="date" name="dob" id="dob"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required=""
                                    />
                                </div>
                            </div>
                            <div class="w-full">
                                <label
                                    for="brand"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Address
                                </label>
                                <input
                                    onChange={(e) => setPermanentAddress(e.target.value)}
                                    type="text" name="brand" id="brand"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Permanent Address" required=""

                                />
                            </div>
                            <div class="w-full">
                                <label
                                    for="price"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    .
                                </label>
                                <input
                                    onChange={(e) => setCurrentAddress(e.target.value)}
                                    type="text" name="price" id="price"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                                     focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Present Address" required=""

                                />
                            </div>
                            <div>
                                <label
                                    for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Department
                                </label>
                                <select
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                    id="category"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                    focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"

                                >
                                    <option selected disabled>
                                        Select department
                                    </option>
                                    {Array.isArray(department) &&
                                        department.map((dpt) => (
                                            <option value={dpt.deptId}>{dpt.deptName}</option>
                                        ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    for="category"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Section
                                </label>
                                <select
                                    onChange={(e) => setSectionId(e.target.value)}
                                    id="category"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                     focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                >
                                    {departmentId ? (
                                        <>
                                            <option selected disabled>
                                                Select section
                                            </option>
                                            {Array.isArray(sections) &&
                                                sections.map((section) => (
                                                    <option key={section.sectId} value={section.sectId}>
                                                        {section.sectName}
                                                    </option>
                                                ))}
                                        </>
                                    ) : (
                                        <>
                                            <option>Select section</option>
                                            <option disabled>Select a department first!!!</option>
                                        </>
                                    )}
                                </select>
                            </div>

                            <div>
                                <label
                                    for="mobileNo"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Mobile No
                                </label>
                                <input
                                    onInput={(e) =>
                                        setMobileNo(
                                            (e.target.value = Math.max(
                                                0,
                                                parseInt(e.target.value) || 0
                                            )
                                                .toString()
                                                .slice(0, 8))
                                        )
                                    }
                                    type="number" name="mobileNo" id="mobileNo"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                    rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                    "
                                    placeholder="77345678"
                                    required
                                />{" "}
                            </div>
                            <div class="float-end">
                                <label
                                    class="block mb-2 text-sm font-medium text-gray-90"
                                    for="user_avatar"
                                >
                                    Upload user picture
                                </label>
                                <input
                                    onChange={(e) => setImage(e.target.files[0])}
                                    class="block w-full text-sm text-blue-500 border border-gray-300 
                                    rounded-lg cursor-pointer bg-gray-50"
                                    aria-describedby="user_avatar_help" id="user_avatar" type="file"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleAddUserClick}
                            type="submit"
                            class="inline-flex  items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-sky-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900  hover:bg-sky-700"
                        >
                            Add User
                        </button>
                        <button
                            type="reset"
                            class="text-sky-600 hover:text-white border border-sky-600 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        >
                            Reset
                        </button>
                    </form>
                </div>

                {/* AddDept modal */}
                <ConfirmationModal
                    isVisible={isAddConfirmationModalVisible}
                    hideModal={() => setAddConfirmationModalVisible(false)}
                    modalMessage={modalMessage}
                    onConfirm={() => {
                        postData();
                        setAddConfirmationModalVisible(false);
                    }}
                />

                <SuccessMessage successMessage={successMessage} />  {/* Alert modal */}

            </section>
        </div>
    );
};