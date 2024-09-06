import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/client/Header/Header'

interface Props {
    
}

const Layout_Client = (props: Props) => {
    return (
        <>
        <Header />
            <main>
               <Outlet /> 
            </main>   
        </>
    )
}

export default Layout_Client
