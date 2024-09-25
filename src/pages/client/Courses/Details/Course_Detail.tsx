import { ClockCircleOutlined, GlobalOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Rate, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import instance from '../../../../api';
import styles from './courseDetail.module.scss';
import { Tcourse } from '../../../../interface/Tcourse';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';
const { Paragraph } = Typography;

// type Props = {}

const Course_Detail = () => {
    const {id} = useParams()
    const [course, setCourse] = useState<Tcourse | null>(null)

    useEffect(() => {
        if(id){
            (async() => {
                const {data} = await instance.get(`/courses/${id}`)
                setCourse(data.data)
            })()
        }
    }, [id])

    const [ellipsis, setEllipsis] = useState(true);
    const toggleEllipsis = () => {
        setEllipsis(!ellipsis); // Thay đổi trạng thái khi bấm vào "Read more"
    };

    // Định dạng create_at
    const formartCreateAt = (date: string | undefined) => {
        if(!date) return 'Đang cập nhật'
        return format(new Date(date), 'dd-mm-yyyy')
    }

    return (
        <div className='container mx-auto'>
            <div className={`${styles['mainContent']}  rounded-3xl p-6 my-10`}>
                {/* Tiêu đề */}
                <div className={`${styles['heading']}`}>
                    <h3 className='text-3xl'>{course?.title}</h3>
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
                                <UserOutlined /> <b>Creator:</b> <Link to={''} className={`${styles['path']} underline`}>{course?.teacher.fullname}</Link>
                            </li>
                            <li>
                                <UploadOutlined /> <b>Upload On:</b> <Link to={''} className={`${styles['path']}`}>{formartCreateAt(course?.created_at)}</Link>
                            </li>
                            <li>
                                <ClockCircleOutlined /> <b>Duration:</b> <Link to={''} className={`${styles['path']}`}>25 mins</Link>
                            </li>
                            <li>
                                <GlobalOutlined /> <b>Language:</b> <Link to={''} className={`${styles['path']}`}>{typeof course?.information?.language.name === 'string' ? course?.information?.language?.name : 'Đang cập nhật'}</Link>
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
                            {course?.description}
                        </Paragraph>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course_Detail