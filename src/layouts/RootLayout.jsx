import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Footer/Footer';
import Navbar from '../pages/Navbar/Navbar';

const RootLayout = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </>
    );
};

export default RootLayout;