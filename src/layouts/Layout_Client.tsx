import { Outlet } from 'react-router-dom';
import Header from '../components/client/Header/Header';
import { routeConfig } from '../contants/client';
import Footer from '../components/client/footer/Footer';

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
