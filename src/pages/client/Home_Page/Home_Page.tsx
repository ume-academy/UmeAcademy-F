import React from 'react'
import Card from '../../../components/client/Card/Card'
import Slider from '../../../components/client/Slider/Slider'

interface Props {
    
}

const Home_Page = (props: Props) => {
    return (
        <div>
            <Slider />
            <Card />
        </div>
    )
}

export default Home_Page
