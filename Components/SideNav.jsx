import React, { useState, useEffect } from 'react';
import { FaBars, FaTable, FaUserPlus, FaFolder, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';


export const SideNav = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();

    const [expanded, setExpanded] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    const DashHandler = () => {
        navigate('/dashboard');
        setExpanded(!expanded);
    };

    const DeptHandler = () => {
        navigate('/departments');
        setExpanded(!expanded);
    };

    const AddUserHandler = () => {
        navigate('/adduser');
        setExpanded(!expanded);
    };

    const LoginHandler = () => {
        navigate("/register");
        setExpanded(!expanded);
    };
    const LogoutHandler = () => {


        // Clear the token from cookies
        cookies.remove('authToken', { path: '/' });

        // Display a logout message
        window.alert('Logout Successful');

        // Navigate to the root page
        navigate('/');
        window.location.reload();


        return null; // or return a component/render nothing
    };

    const handleBarsClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const handleResize = () => {
            const newIsSmallScreen = window.innerWidth <= 768;
            setIsSmallScreen(newIsSmallScreen);

            // Collapse the sidebar automatically on small screens
            if (newIsSmallScreen) {
                setExpanded(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const sidebarStyle = {
        width: isSmallScreen ? (expanded ? '310px' : '0') : '310px',
    };

    const barsIconClass = `w-8 h-8 mt-3 text-sky-600 lg:hidden ${isSmallScreen ? '' : 'hidden'} 
    ${isSmallScreen && expanded ? 'text-cyan-100' : 'text-sky-600'}`;
    return (
        <aside>
            <div style={sidebarStyle} className="sidebar h-full top-0 bottom-0 items-center text-center 
            lg:w-[310px] xl:w-[310px] w-[310px] py-4 rounded-r-3xl bg-sky-700 dark:bg-gray-800">
                <span className='absolute text-4xl top-5 mt-5 mr-5 left-4 cursor-pointer z-10' onClick={handleBarsClick}>
                    <FaBars className={barsIconClass} />
                </span>
                <div onClick={DashHandler} className="text-center py-8 cursor-pointer">
                    <img className='pl-11 ml-9' src="https://www.tashicell.com/themes/tashicell/assets/images/logo.png" alt="Logo" />
                    <h1 className="text-2xl font-bold mb-4 text-white">SDU UMS</h1>
                    <hr className='w-[224px] ml-10 mb-[30px] mt-[50px]' style={{ display: isSmallScreen && !expanded ? 'none' : 'block' }}></hr>
                </div>

                <ul className="space-y-2 font-medium pl-9">
                    <li onClick={DashHandler} className="flex items-right">
                        <div className="flex items-center cursor-pointer py-4 px-10 text-white rounded-lg  hover:bg-sky-800 group">
                            <FaTable className="mr-2 w-5 h-5 text-white transition duration-75" />
                            <div className="ms-3 text-lg ">Dashboard</div>
                        </div>
                    </li>

                    <li className="flex items-right mb-5">
                        <div onClick={DeptHandler} className="flex items-center cursor-pointer py-4 px-10 text-white rounded-lg  hover:bg-sky-800 group">
                            <FaFolder className="mr-2 w-5 h-5 text-white transition duration-75" />
                            <div className="ms-3 text-lg">Departments</div>
                        </div>
                    </li>
                    <li onClick={AddUserHandler} className="flex items-right mb-5">
                        <div className="flex cursor-pointer items-center py-4 px-10 mb-20 text-white rounded-lg hover:bg-sky-800 group">
                            <FaUserPlus className="mr-2 w-5 h-5 text-white transition duration-75" />
                            <span className="ms-3  text-lg">Add User</span>
                        </div>
                    </li>

                    {/* <li onClick={LoginHandler} className="flex items-right mb-5">
                        <div className="flex cursor-pointer items-center py-4 px-10 text-white rounded-lg dark:text-white hover:bg-sky-800 dark:hover:bg-gray-700 group">
                            <FaSignInAlt className="mr-2 w-5 h-5 text-white transition duration-75 dark:text-gray-400  dark:group-hover:text-white" />
                            <span className="ms-3  text-lg">Login</span>
                        </div>
                    </li> */}
                    <hr className='w-[224px]  mb-[30px] mt-[150px]' style={{ display: isSmallScreen && !expanded ? 'none' : 'block' }}></hr>
                    <li onClick={LogoutHandler} className="flex items-right mb-5">
                        <div className="flex cursor-pointer items-center py-4 px-10 text-white rounded-lg dark:text-white hover:bg-sky-800 dark:hover:bg-gray-700 group">
                            <FaSignOutAlt className="mr-2 w-5 h-5 text-white transition duration-75 dark:text-gray-400  dark:group-hover:text-white" />
                            <span className="ms-3  text-lg">Logout</span>
                        </div>
                    </li>
                </ul>
            </div>
        </aside >
    );
};
