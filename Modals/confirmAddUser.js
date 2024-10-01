import React from 'react';

const ConfirmationModal = ({ isVisible, hideModal, modalMessage, onConfirm }) => {
    return isVisible && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center" onClick={hideModal}>
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
                <h3 className="text-lg font-normal mb-4">{modalMessage}</h3>
                {modalMessage === "Are you sure you want to add the user?" ? (
                    <>
                        <button
                            onClick={() => {
                                onConfirm();
                                hideModal();
                            }}
                            className="bg-sky-600 text-white px-4 py-2 rounded-lg mr-5 ml-12 hover:bg-sky-500"
                        >
                            Yes, I am sure
                        </button>
                        <button
                            onClick={hideModal}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200"
                        >
                            No, Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={hideModal}
                        className="bg-sky-600 text-white px-4 py-2 rounded-lg mr-5 ml-12 hover:bg-sky-500"
                    >
                        Okay
                    </button>
                )}
            </div>
        </div>
    );
};

export default ConfirmationModal;
