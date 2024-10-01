import React from 'react';
import { Cards } from './Dashboard/Cards';
import { Table } from './Dashboard/Table';


export const Dashboard = () => {
    return (
        <div className='h-screen w-screen overflow-scroll flex-col items-center'>
            <h1 className='pt-11 pb-7 ml-5 px-11 text-4xl font-bold text-sky-600'>Dashboard</h1>
            <hr></hr>
            <Cards />
            <Table />
        </div>
    );
};
