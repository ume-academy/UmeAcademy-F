import { Outlet } from 'react-router-dom'
// import Footer from '../components/client/Footer/Footer'
import Header from '../components/client/Header/Header'
import Footer from '../components/client/footer/Footer'

interface Props {
    
}

const Layout_Client = (props: Props) => {
    return (
        <>
        <div className="min-h-screen flex flex-col">
            <Header />
                <main className='flex-grow'>
                    <Outlet /> 
                </main>   
            <Footer />
        </div>
        </>
    )
}

export default Layout_Client
