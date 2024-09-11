import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/client/Header/Header'
import Footer from '../components/client/Footer/Footer'
import { routeConfig } from '../contants/client';


const Layout_Client = () => {
    const shouldHideFooter = routeConfig.hiddenFooterRoutes.includes(location.pathname);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className='flex-grow'>
                <Outlet />
            </main>
            {!shouldHideFooter && <Footer />}
        </div>
    );
};

export default Layout_Client;
