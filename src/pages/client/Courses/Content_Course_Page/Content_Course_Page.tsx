import { MenuOutlined, PlayCircleFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import instance from '../../../../api';
import { Tlesson } from '../../../../interface/Tlesson';
import style from './content_course_page.module.scss';
import NotFound from '../../NotFound/NotFound';
const { Paragraph } = Typography;


const Content_Course_Page = () => {
    const {id} = useParams()
    console.log(id)
    const [courseAll, setCourseAll] = useState<Tlesson[] | undefined>(undefined)
    
    // State để lưu tên bài học
    const [titleCourse, setTitleCourse] = useState<string| null>(null);

    // State để lưu bài học hiện tại được chọn
    const [selectedLesson, setSelectedLesson] = useState<Tlesson| null>(null);

    // State đóng mở sidebar 
    const [isOpenSideBar, setIsSideBar] = useState(false)

    const toggleSideBar = () => {
        console.log(isOpenSideBar)
        setIsSideBar(!isOpenSideBar);
    }
    
    const [ellipsis, setEllipsis] = useState(true);

    useEffect(() => {
        (async () => {
            const {data} = await instance(`/courses/${id}/lessons`)
            console.log(data)
            setCourseAll(data.data)
            // Gán bài học đầu tiên trong danh sách làm mặc định khi mở trang
            if (data.data && data.data.length > 0) {
                setSelectedLesson(data.data[0]);
                setTitleCourse(data.data[0].course)
            }
        })()
    }, [id])

    // Nút bấm lùi lại bài học trước đó
    const handlePreviousLesson = () => {
        if (courseAll && selectedLesson) {
            const currentIndex = courseAll.findIndex(lesson => lesson.id === selectedLesson.id);
            if (currentIndex > 0) {
                setSelectedLesson(courseAll[currentIndex - 1]); // Chuyển sang bài học trước
            }
        }
    };

    // Nút bấm chuyển sang bài học tiếp theo
    const handleNextLesson = () => {
        if (courseAll && selectedLesson) {
            const currentIndex = courseAll.findIndex(lesson => lesson.id === selectedLesson.id);
            if (currentIndex < courseAll.length - 1) {
                setSelectedLesson(courseAll[currentIndex + 1]); // Chuyển sang bài học tiếp theo
            }
        }
    };

    // kiểm tra vị trí 
    const isFirstLesson = courseAll && selectedLesson && courseAll[0].id === selectedLesson.id 
    const isLastLesson = courseAll && selectedLesson && courseAll[courseAll.length -1 ].id === selectedLesson.id

    return (
        <div>
        {courseAll && courseAll?.length > 0 ? (
            <div className='relative min-h-screen'>
            {/* Div header */}
            <div className="fixed top-0 right-0 left-0 z-99999 drop-shadow-sm uppercase flex justify-start items-center bg-[#000000] text-[#fff] h-[80px]">
                <Link className='h-[80px] text-[12px] flex items-center px-4 border-r-[2px] rounded-2xl' to={'/'}>Trang chủ</Link>
                <h2 className='pl-10 font-bold text-[18px]'>{titleCourse || 'Không có tiêu đề khóa học'}</h2>
            </div>

            <div className="flex h-[100vh] overflow-y-hidden mt-[80px] mb-[40px]">

                {/* Div chưa main */}
                <div className={`h-full max-h-screen overflow-y-auto transition-all duration-300 ${isOpenSideBar ? 'w-[100%]' : 'w-[75%]'} `}>
                    {selectedLesson && (
                            <video controls width='100%' height='30%' src={selectedLesson.video}></video>
                        )}
                    <div className={`py-6 px-[40px]`}>
                        <div className={``}>
                            <h3 className='text-3xl underline uppercase text-[#658CC2]'>chi tiết bài học</h3>
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

                {/* Div chứa sidebar */}
                <div className={`w-[25%] h-full border-l-[1px] border-[#dedfe0] ${isOpenSideBar ? 'hidden' : 'block'}`}>
                <div className='max-h-screen overflow-y-auto '>
                    <h2 className='bg-[#fff] px-[16px] py-[12px] font-semibold text-[18px]'>Nội dung khóa học</h2>
                    <ul className='mb-[10px]'>
                        {courseAll && courseAll.map((item, key) => (
                            //** onClick={toggleSubMenu}  Sử dụng cho version 2 */
                            <li className='bg-[#f7f8fa]' key={key + 1}> 
                            <div 
                                        className={` ${selectedLesson?.id === item.id ? "bg-red-200": ''} hover:bg-[#edeff1] px-[20px] py-[8px] border-b-[#dedfe0] border-b-[1px]`}
                                        onClick={() => setSelectedLesson(item)} // Chọn bài học
                                    >
                                        <div className="flex justify-between">
                                            <h4 className='font-semibold mb-1.5 text-[16px]'>{key + 1}. {item.title}</h4>
                                        </div>
                                        <div className="flex text-[12px] ">
                                            <PlayCircleFilled style={{fontSize: 12, color: '#888888', marginRight:6}} />
                                            <span className='inline text-[#29303b]'>05.00</span>
                                        </div>
                                    </div>
                        </li>
                        ))}
                    </ul>
                </div>
                </div>
            </div>

            {/* div nav bottom */}
            <div className={`${style['shadow-top']} h-[50px] flex items-center justify-center bg-[#edeff1] drop-shadow-xl z-9999 fixed bottom-0 left-0 right-0`}>
                <div className="flex justify-center items-center">
                    <button onClick={handlePreviousLesson} className={`${isFirstLesson ? "pointer-events-none" : ""} mr-[8px] border-[1px] border-[#C67D39] px-[24px] py-[4px] rounded-full text-[#C67D39]`}>Bài trước</button>
                    <button onClick={handleNextLesson} className={`${isLastLesson ? "pointer-events-none" :"hover:opacity-90"}  ml-[8px] px-[24px] py-[4px] rounded-full bg-[#C67D39] text-[#fff] flex items-center`}>Bài tiếp theo</button>
                </div>
                <div className="absolute right-[16px] z-99999">
                    <MenuOutlined onClick={() => toggleSideBar()}/>
                </div>
            </div>
        </div>
        ) : (
            <NotFound />
        )}
        
        </div>
    )
}

export default Content_Course_Page