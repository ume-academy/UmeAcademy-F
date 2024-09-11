import { ClockCircleOutlined, GlobalOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Rate, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styles from './courseDetail.module.scss';
const { Paragraph } = Typography;
import { useState } from 'react';

// type Props = {}

const Course_Detail = () => {

    const [ellipsis, setEllipsis] = useState(true);

    return (
        <div className='container mx-auto'>
            <div className={`${styles['mainContent']}  rounded-3xl p-6 my-10`}>
                {/* Tiêu đề */}
                <div className={`${styles['heading']}`}>
                    <h3 className='text-3xl'>LẬP TRÌNH JAVASCRIPT</h3>
                </div>

                {/* Nội dung */}
                <div className={`${styles['content']}`}>
                    <iframe
                        src="https://www.youtube.com/embed/lwsS-ikKnPs?si=8eCmMOxRZZmjRNCs"
                        title="YouTube video player"
                        // frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    // referrerpolicy="strict-origin-when-cross-origin" 
                    // allowfullscreen
                    >
                    </iframe>
                </div>

                {/* Thông tin */}
                <div className={`${styles['info']} flex justify-between py-5`}>
                    <div className={`${styles['infoCourse']} p-4`}>
                        <ul>
                            <li>
                                <UserOutlined /> <b>Creator:</b> <Link to={''} className={`${styles['path']} underline`}>Thái Quốc Tuấn</Link>
                            </li>
                            <li>
                                <UploadOutlined /> <b>Upload On:</b> <Link to={''} className={`${styles['path']}`}>23/08/2024</Link>
                            </li>
                            <li>
                                <ClockCircleOutlined /> <b>Duration:</b> <Link to={''} className={`${styles['path']}`}>25 mins</Link>
                            </li>
                            <li>
                                <GlobalOutlined /> <b>Language:</b> <Link to={''} className={`${styles['path']}`}>Vietnamese</Link>
                            </li>
                        </ul>
                    </div>

                    <div className={`${styles['action']} flex justify-center items-center`}>
                        <Button className={`${styles['btn']} p-7 text-xl`}>Enroll Now</Button>
                    </div>

                    <div className={`${styles['rating']} flex justify-end items-top space-x-2`}>
                        <Rate disabled defaultValue={4} /> <b className='m-0 p-0'>(69)</b>
                    </div>
                </div>

                {/* Mô tả */}
                <div className={`${styles['description']} py-6`}>
                    <div className={`${styles['heading']}`}>
                        <h3 className='text-3xl underline'>MÔ TẢ</h3>
                    </div>

                    <div className="para text-justify py-3">
                        <Paragraph ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: 'Read more' } : false} className='text-md'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae nesciunt facere nostrum harum laudantium ipsam perspiciatis sunt id cumque voluptas, nobis dolores consequatur, porro neque illo, soluta magni magnam itaque?
                            Quos blanditiis distinctio aspernatur obcaecati exercitationem recusandae voluptatum, hic saepe veritatis aperiam possimus unde inventore laudantium, voluptate repellendus at assumenda quas cumque? Laboriosam nulla quod id dolore cupiditate alias eos?
                            Temporibus quisquam explicabo incidunt illo doloribus porro officiis, provident in qui repellendus aperiam ut sit, repellat commodi modi ipsum quibusdam ducimus impedit. Laudantium, maxime consequatur! Atque vel adipisci molestias ipsa.
                            Repudiandae nostrum ab necessitatibus suscipit perspiciatis laudantium ratione placeat sed ea cumque consectetur, nisi architecto accusantium, rem vel nobis mollitia. Vitae quod optio tempore magnam aliquam excepturi ipsam aspernatur corrupti.
                        </Paragraph>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course_Detail