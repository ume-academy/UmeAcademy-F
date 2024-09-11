import { DownOutlined, MenuOutlined, PlayCircleFilled, RightOutlined } from '@ant-design/icons';
import { Button, Rate, Typography } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './content_course_page.module.scss';
const { Paragraph } = Typography;
interface Props {
    
}

const Content_Course_Page = (props: Props) => {
    // State đóng mở sidebar 
    const [isOpenSideBar, setIsSideBar] = useState(false)

    const toggleSideBar = () => {
        console.log(isOpenSideBar)
        setIsSideBar(!isOpenSideBar);
    }

    // State cho đóng mở subMenu
    // Dùng cho version sau
    // const [isOpen, setIsOpen] = useState(false)

    // const toggleSubMenu = () => {
    //     console.log(isOpen)
    //     setIsOpen(!isOpen);
    // }

    const [ellipsis, setEllipsis] = useState(true);
    const items = Array.from({ length: 12 }, (_, index) => index + 1);
    return (
        <div className='relative min-h-screen'>
            {/* Div header */}
            <div className="fixed top-0 right-0 left-0 z-99999 drop-shadow-sm uppercase flex justify-start items-center bg-[#000000] text-[#fff] h-[80px]">
                <Link className='h-[80px] text-[12px] flex items-center px-4 border-r-[2px] rounded-2xl' to={'/'}>Trang chủ</Link>
                <h2 className='pl-10 font-bold text-[18px]'>Lập trình javascript</h2>
            </div>

            <div className="flex h-[100vh] overflow-y-hidden mt-[80px] mb-[40px]">

                {/* Div chưa main */}
                <div className={`h-full max-h-screen overflow-y-auto transition-all duration-300 ${isOpenSideBar ? 'w-[100%]' : 'w-[75%]'} `}>
                    <iframe width="100%" height="523px"  src="https://www.youtube.com/embed/LuQAtbJO8Yg?si=bHgnAgOmAJPWtXL7" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
                <div className={`w-[25%] h-full ${isOpenSideBar ? 'hidden' : 'block'}`}>
                <div className='max-h-screen overflow-y-auto'>
                    <h2 className='bg-[#fff] px-[16px] py-[12px] font-semibold text-[18px]'>Nội dung khóa học</h2>
                    <ul className='mb-[10px]'>
                        {items.map((item, key) => (
                            //** onClick={toggleSubMenu}  Sử dụng cho version 2 */
                            <li className='bg-[#f7f8fa]' key={key}> 
                            <div className="hover:bg-[#edeff1] px-[20px] py-[8px] border-b-[#dedfe0] border-b-[1px] ">
                                <div className="flex justify-between" >
                                    <h4 className='font-semibold mb-1.5 text-[16px]'>1. Bắt đầu</h4>
                                </div>
                                <div className="flex text-[12px] ">
                                    <PlayCircleFilled style={{fontSize: 12, color: '#888888', marginRight:6}} />
                                    <span className='inline text-[#29303b]'>21.39</span>
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
                    <button className='mr-[8px] border-[1px] border-[#C67D39] px-[24px] py-[4px] rounded-full text-[#C67D39]'>Bài trước</button>
                    <button className='ml-[8px] px-[24px] py-[4px] rounded-full bg-[#C67D39] text-[#fff] flex items-center'>Bài tiếp theo</button>
                </div>
                <div className="absolute right-[16px] z-99999">
                    <MenuOutlined onClick={() => toggleSideBar()}/>
                </div>
            </div>
        </div>
    )
}

export default Content_Course_Page