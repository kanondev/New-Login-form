import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/Header/Header';

const Main = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;