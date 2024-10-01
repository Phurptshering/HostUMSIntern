import axios from 'axios';
import API_URL from '../config';
import { Cookies } from 'react-cookie';

export const updateUser = async (userData, showSuccessModal) => {
    const cookies = new Cookies();

    try {
        // Get the token from cookies
        const token = cookies.get('authToken');

        // Prepare user data
        const updatedUserData = prepareUserData(userData);
        const json = JSON.stringify(updatedUserData);
        const blob = new Blob([json], {
            type: 'application/json'
        });

        // Set the token in the request headers
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        };

        var bodyFormData = new FormData();
        bodyFormData.append('user', blob);

        console.log("Updated data format: ", updatedUserData);

        const response = await axios.put(`${API_URL}/users`, bodyFormData, config);

        console.log(response.status);

        if (response.status === 201) {
            showSuccessModal("User edited successfully");
        }
    } catch (error) {
        showSuccessModal("Unable to edit user, might have duplicate CID/Employee ID or incorrect inputs");
        console.error("Error updating user data:", error);
    }
};

export const prepareUserData = (userData) => {
    return {
        userId: userData.userId,
        employeeId: userData.employeeId,
        firstName: userData.firstName,
        middleName: userData.middleName,
        lastName: userData.lastName,
        gender: {
            genderId: parseInt(userData.gender.genderId !== undefined ? userData.gender.genderId : userData.gender),
        },
        email: userData.email,
        mobileNo: userData.mobileNo,
        cidNo: userData.cid === undefined ? userData.cidNo : userData.cid,
        dob: userData.dob,
        address: {
            addressId: userData.address.addressId,
            currentAddress: userData.presentAddress === undefined ? userData.address.currentAddress : userData.presentAddress,
            permanentAddress: userData.permanentAddress === undefined ? userData.address.permanentAddress : userData.permanentAddress,
        },
        section: {
            sectId: parseInt(userData.section.sectId === undefined ? userData.section : userData.section.sectId),
        },
        profileImage: userData.profileImage,
    };
};

