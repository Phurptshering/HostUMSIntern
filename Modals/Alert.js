import React from 'react';

const SuccessMessage = ({ successMessage }) => {
  const isError = successMessage === "Unable to add user, please check your CID/ Employee ID";
  const bgColor = isError ? 'red' : 'green';
  const textColor = isError ? 'red' : 'green';

  return successMessage && (
    <div
      className={`fixed flex-col animate-pulse top-4 right-4 z-50 p-4 text-sm text-${textColor}-800 rounded-lg bg-${bgColor}-300`}
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
        <span className="font-medium">{isError ? 'Error' : 'Success'}</span> {successMessage}
      </div>
    </div>
  );
};

export default SuccessMessage;
