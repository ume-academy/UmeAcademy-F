import { StarFilled, StarOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type Props = {}

const Search_Page = (props: Props) => {

    const [isHovered, setIsHovered] = useState(false);

    const [searchParams] = useSearchParams();

    // Ex: domain/search?q=abc
    const result = searchParams.get('q');

    //! Fake data
    const course = [
        { id: 1, name: "JavaScript cơ bản", price: 1000, description: 'Js Cơ bản cho người mới!' },
        { id: 2, name: "HTML5 & CSS3", price: 1000, description: 'HTML5 & CSS3 nâng cao!' },
        { id: 3, name: "ReactJs ", price: 1000, description: 'ReactJs Cơ bản cho người mới!' },
    ]


    return (
        <>
            <div className="container">
                <div className="heading py-10">
                    <p className='text-[#AC5E07] text-2xl'>Kết quả tìm kiếm: <b>{result}</b></p>

                    <p className=' text-lg'>Đang hiển thị <b className='text-[#AC5E07]'>{course.length}</b> khóa học</p>
                </div>

                <div className="content h-full flex flex-wrap justify-center mb-10 gap-8">
                    {
                        course.length ? (
                            // data tồn tại
                            course?.map((item, index) => (
                                <div key={index} className="w-[289px] h-[449px] rounded-lg hover:shadow-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:translate-y-[-7px] cursor-pointer">
                                    <div className="bg-[#D9D9D9] h-[210px] text-[18px] flex items-center font-bold justify-center">
                                        Banner
                                    </div>
                                    <div className="p-4 space-y-8">
                                        <div>
                                            <p className="text-[20px] font-bold text-[#0A4A4A]">{item.name}</p>
                                            <p className="text-[16px] font-bold">Duration : 25mins</p>
                                            <div className="flex items-center text-[16px]">
                                                <del className="text-[#868686] font-bold">$15.90</del>
                                                <i className="text-[#CC0000] ml-2">*Free</i>
                                            </div>
                                        </div>
                                        <div className="flex items-center ">
                                            <div className="flex text-yellow-400">
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                                <StarOutlined />
                                            </div>
                                            <i className="text-xs text-[#868686] ml-2">(43,435)</i>
                                        </div>
                                        <div className="flex justify-center">
                                            <button
                                                className={`w-[133px] h-[40px] rounded-[5px] font-bold text-[16px] border-2 ${isHovered ? 'bg-[#C67D39] text-white border-transparent' : 'border-2-[#178C8C] text-[#178C8C]'}`}
                                                onMouseEnter={() => setIsHovered(true)}
                                                onMouseLeave={() => setIsHovered(false)}
                                            >
                                                {isHovered ? "MUA NGAY" : "Enroll Now"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // data rỗng
                            <div className="h-60 flex justify-center items-center">
                                <p className='font-bold text-2xl text-center'>Hiện không có khóa học nào mà bạn mong muốn!</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Search_Page