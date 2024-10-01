import React, { useEffect, useState } from 'react';
import { FaMale, FaFemale, FaTransgender, FaUsers } from 'react-icons/fa';
import fetchData from '../../Services/Dashboard/card'
import API_URL from '../../Services/config';

export const Cards = () => {

  const [male, setMale] = useState();
  const [female, setFemale] = useState();
  const [others, setOthers] = useState();
  const [totalData, setTotalData] = useState();


  useEffect(() => {
    fetchData(`${API_URL}/users/total`, setTotalData);
  }, []);

  useEffect(() => {
    fetchData(`${API_URL}/users/total/1`, setMale);
  }, []);

  useEffect(() => {
    fetchData(`${API_URL}/users/total/2`, setFemale);
  }, []);

  useEffect(() => {
    fetchData(`${API_URL}/users/total/3`, setOthers);
  }, []);

  const cardData = [
    { count: male, gender: 'Male', icon: <FaMale className="w-10 h-10" />, bg: '#646AD4' },
    { count: female, gender: 'Female', icon: <FaFemale className="w-10 h-10" />, bg: '#D464A1' },
    { count: others, gender: 'Others', icon: <FaTransgender className="w-10 h-10" />, bg: '#75D464' },
    { count: totalData, gender: 'Total Employee', icon: <FaUsers className="w-10 h-10" />, bg: '#D46464' },

  ];

  return (
    <div className='w-full pt-10 pb-5'>
      <div className="flex flex-wrap justify-evenly space-x-4 m-4 overflow-x-auto">
        {cardData.map((data, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 transition duration-200 shadow-md ease-in-out transform hover:-translate-y-1 flex-grow p-6 border border-gray-200 rounded-lg hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-4"
            style={{
              backgroundColor: data.bg,
            }}
          >
            <div className="flex justify-between">
              <div>
                <h5 className="mb-2 text-3xl font-bold tracking-tight text-white dark:text-white">{data.count}</h5>
                <p className="font-normal text-gray-200 dark:text-gray-400">{data.gender}</p>
              </div>
              <div className="ml-auto w text-white ">{data.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};
