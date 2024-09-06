import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/client/Header/Header'
import Footer from '../components/client/footer/Footer'

interface Props {
    
}

const Layout_Client = (props: Props) => {
    return (
        <>
        <Header />
            <main>
               <Outlet /> 
            </main>   
        <Footer />
        </>
    )
}

export default Layout_Client
