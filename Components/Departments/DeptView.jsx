import React from 'react'
import { Sections } from './Sections';
import { Tabledpt } from './Tabledpt';
import { useLocation } from 'react-router-dom';


export const DeptView = () => {
    const location = useLocation();

    return (
        <div className="flex-col justify-center w-screen overflow-auto">
            <div className='flex-col text-center pt-11'>
                <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight
                 text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-sky-400">
                        {location.state.deptDetails.deptName}
                    </span>
                </h1>
                <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    {location.state.deptDetails.deptDescription}</p>
            </div>

            <Sections />
            <Tabledpt />

        </div>
    )
}
