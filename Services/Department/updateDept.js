import axios from 'axios';
import API_URL from '../config';
import { Cookies } from 'react-cookie';

const updateDepartment = (editingDepartmentId, formValues, image, setFormValues, setIsModalOpen, openModal, setLoading) => {
    return (event) => {
        event.preventDefault();

        const cookies = new Cookies();
        const token = cookies.get('authToken');

        // Check if an image is selected
        if (image) {
            const bodyFormData = new FormData();

            const updatedDepartmentData = {
                deptId: editingDepartmentId,
                deptName: formValues.deptName,
                deptDescription: formValues.deptDescription,
            };

            const json = JSON.stringify(updatedDepartmentData);
            const blob = new Blob([json], {
                type: 'application/json',
            });

            bodyFormData.append('department', blob);
            bodyFormData.append('departmentImage', image);

            setLoading(true);
            axios.put(`${API_URL}/departments`, bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,  // Include the token in the headers
                },
            }).then(() => {

                // Clear form values and close the modal
                setFormValues({
                    deptName: "",
                    deptDescription: "",
                    image: null,
                });
                setLoading(false);
                setIsModalOpen(false);

                // Open the success message modal
                openModal("Department updated successfully!");
            })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error updating department:", error);
                }
                );
        } else {
            setLoading(false);
            console.error("Please select an image");
        }
    }
};

export { updateDepartment }
