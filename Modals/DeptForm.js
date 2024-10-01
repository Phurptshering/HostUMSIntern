// DepartmentModal.js
import Spinner from "../Modals/Spinner";
import React, { useState, useEffect } from 'react';

const DepartmentModal = ({
    isModalOpen,
    setIsModalOpen,
    editingDepartmentId,
    handleAddDepartment,
    handleUpdateDepartment,
    formValues,
    setFormValues,
    setImage,
    image,
    loading,
}) => {
    return (
        isModalOpen && (
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
                                {editingDepartmentId
                                    ? "Update department"
                                    : "Add new department"}
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
                        <form onSubmit={editingDepartmentId
                            ? handleUpdateDepartment
                            : handleAddDepartment} className="p-4 md:p-5">
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
                                        defaultValue={formValues.deptName}
                                        onChange={(e) => setFormValues({ ...formValues, deptName: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type department name"
                                        required
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Department Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        maxLength="256"
                                        rows="4"
                                        defaultValue={formValues.deptDescription}
                                        onChange={(e) => setFormValues({ ...formValues, deptDescription: e.target.value })}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write something about the department"
                                        required
                                    ></textarea>
                                </div>

                                <div class="float-end">
                                    <label
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        htmlFor="image"
                                    >
                                        Upload user picture
                                    </label>
                                    <input
                                        onChange={(e) => setImage(e.target.files[0])}
                                        class="block w-full text-sm text-blue-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-blue-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"

                                        id="image"
                                        type="file"
                                        name="image"

                                    />
                                    <span>{image ? image.name : 'No file selected'}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-sky-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                {loading && <Spinner />}
                                {!loading &&
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
                                }

                                {editingDepartmentId
                                    ? "Update department"
                                    : "Add new department"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default DepartmentModal;
