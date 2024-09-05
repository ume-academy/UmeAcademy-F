import { Carousel } from 'antd';
import React from 'react'
// import { bannerImg } from '../../../contants/client';
import bannerImg from '../../../assets/images/client/HomePage/banner.jpg';

const Slider = () => {

    // const contentStyle: React.CSSProperties = {
    //     margin: 0,
    //     height: '160px',
    //     color: '#fff',
    //     lineHeight: '160px',
    //     textAlign: 'center',
    //     background: '#364d79',
    //     display: 'flex',
    //     justifyContent: 'center',
    // };

    return (
        <>
            <Carousel arrows infinite={false}>
                <div>
                    <h3>
                        <img src={bannerImg} alt="" width={'100%'}/>
                    </h3>
                </div>
                <div>
                    <h3>
                        <img src={bannerImg} alt="" width={'100%'}/>
                    </h3>
                </div>
                <div>
                    <h3>
                        <img src={bannerImg} alt="" width={'100%'}/>
                    </h3>
                </div>
                <div>
                    <h3>
                        <img src={bannerImg} alt="" width={'100%'}/>
                    </h3>
                </div>
            </Carousel>
        </>
    )
}

export default Slider