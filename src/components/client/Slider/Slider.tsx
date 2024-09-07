import { Carousel } from 'antd';
import { sliderImg } from '../../../contants/client';


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
                        <img src={sliderImg} alt="" width={'100%'}/>
                    </h3>
                </div>
                <div>
                    <h3>
                        <img src={sliderImg} alt="" width={'100%'}/>
                    </h3>
                </div>
                <div>
                    <h3>
                        <img src={sliderImg} alt="" width={'100%'}/>
                    </h3>
                </div>
                <div>
                    <h3>
                        <img src={sliderImg} alt="" width={'100%'}/>
                    </h3>
                </div>
            </Carousel>
        </>
    )
}

export default Slider