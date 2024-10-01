import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import fetchDept from "../Services/Department/fetchDept";
import {
  handleEditDepartment,
  editDepartment,
} from "../Services/Department/editDept";
import { updateDepartment } from "../Services/Department/updateDept";
import viewDeptHandler from "../Services/Department/viewDept";
import { addDepartment } from "../Services/Department/addDept";
import DepartmentModal from "../Modals/DeptForm";
import API_URL from "../Services/config";

export const Departments = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formValues, setFormValues] = useState({
    deptName: "",
    deptDescription: "",
    image: null,
  });
  const [image, setImage] = useState({});
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);

  fetchDept().then((response) => {
    setCardData(response.data);
  });

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    navigate("/departments");
    setIsModalOpen(false);
    setModalMessage("");
  };

  const addDept = () => {
    setFormValues({
      deptName: "",
      deptDescription: "",
      image: "",
    });
    setIsModalOpen(true);
  };

  const handleUpdateDepartment = updateDepartment(
    editingDepartmentId,
    formValues,
    image,
    setFormValues,
    setIsModalOpen,
    openModal,
    setLoading
  );

  const handleAddDepartment = addDepartment(
    formValues,
    image,
    setFormValues,
    setIsModalOpen,
    openModal,
    setLoading
  );

  return (
    <div className="w-full h-full overflow-auto">
      <div className="flex justify-between">
        <h1 className="pt-11 ml-5 px-11 text-4xl font-bold text-sky-600">
          Departments
        </h1>
        <button
          onClick={() => addDept()}
          className="mr-10 mt-11 mb-9 p-2 bg-sky-600 text-white rounded-md"
        >
          Add Department <span className="font-extrabold">+</span>
        </button>
      </div>
      <hr></hr>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-11">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow overflow-hidden"
            style={{ height: "24rem", width: "22rem" }}
          >
            <img
              onClick={() => viewDeptHandler(card.deptId, navigate)}
              alt="department_image"
              className="rounded-t-lg cursor-pointer"
              style={{ height: "65%", width: "100%" }}
              src={`${API_URL}/departments/images/${card.deptId}`}
            />

            <div className="p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <h5
                  onClick={() => viewDeptHandler(card.deptId, navigate)}
                  className="text-2xl font-bold tracking-tight
                                 text-gray-900 dark:text-white cursor-pointer"
                >
                  {card.deptName}
                </h5>

                <button
                  onClick={() =>
                    handleEditDepartment(
                      card.deptId,
                      cardData,
                      editDepartment,
                      setIsModalOpen,
                      setEditingDepartmentId,
                      setFormValues,
                      setImage
                    )
                  }
                  className="px-1 py-1 text-white rounded-md"
                >
                  <FaEdit className="text-sky-500 w-6 h-auto" />
                </button>
              </div>
              <p
                onClick={() => viewDeptHandler(card.deptId, navigate)}
                className="cursor-pointer mb-3 font-normal
                             text-gray-700overflow-hidden overflow-ellipsis max-h-[3.6em] line-clamp-2"
              >
                {card.deptDescription}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Form for adding a new department */}
      <DepartmentModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingDepartmentId={editingDepartmentId}
        handleAddDepartment={handleAddDepartment}
        handleUpdateDepartment={handleUpdateDepartment}
        formValues={formValues}
        setFormValues={setFormValues}
        setImage={setImage}
        image={image}
        loading={loading}
      />

      {/* Custom modal for displaying success messages after update/ delete*/}
      {modalMessage && (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-stone-800/40">
          <div class="relative p-4  max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200
                             hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center
                             "
                data-modal-hide="popup-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 
                                    6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <div class="flex flex-col items-center justify-center p-4 md:p-5 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="96px"
                  height="96px"
                  class="mb-5"
                >
                  <path
                    fill="#c8e6c9"
                    d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                  />
                  <path
                    fill="#4caf50"
                    d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"
                  />
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {modalMessage}
                </h3>
                <button
                  onClick={closeModal}
                  class="text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 
                                focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm 
                                inline-flex items-center px-5 py-2.5 text-center me-2"
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
