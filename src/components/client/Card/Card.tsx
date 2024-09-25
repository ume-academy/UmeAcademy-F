import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { CourseContext, CourseContextType } from "../../../contexts/course_context";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { logoImageError } from "../../../contants/client";


const Card = () => {
    const { state, getAllCourses } = useContext(CourseContext) as CourseContextType;
    const { courses, pagination } = state;

    // Sử dụng mảng trạng thái để theo dõi hover của từng khóa học
    const [hoveredItems, setHoveredItems] = useState<boolean[]>(Array(courses.data.length).fill(false));

    // Chuyển trang
    const handlePageChange = (page: number) => {
        getAllCourses(page);
    };

    // Bắt đầu hover và dừng hover
    const handleMouseEnter = (index: number) => {
        const newHoveredItems = [...hoveredItems];
        newHoveredItems[index] = true;
        setHoveredItems(newHoveredItems);
    };

    const handleMouseLeave = (index: number) => {
        const newHoveredItems = [...hoveredItems];
        newHoveredItems[index] = false;
        setHoveredItems(newHoveredItems);
    };

    return (
        <>
            <div className="grid grid-cols-4 justify-items-center mt-15 gap-[0px] mb-[40px]">
                {courses.data.map((item, index) => (
                    <Link to={`/course/details/${item.id}`}
                        key={index}
                        className="w-[289px] h-[449px] mb-10 rounded-lg hover:shadow-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:translate-y-[-7px] cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <div className="bg-[#D9D9D9] h-[200px] text-[18px] flex items-center font-bold justify-center">
                            <img className="w-full h-full object-cover" src={typeof item.thumbnail === 'string' ? item.thumbnail : `${logoImageError}`} alt="" />
                        </div>
                        <div className="p-4 space-y-8">
                            <div>
                                <div className="text-[20px] font-bold text-[#0A4A4A]">{item.title}</div>
                                <p className="text-[16px] font-bold">Duration : 25mins</p>
                                <div className="flex items-center text-[16px]">
                                    <del className="text-[#868686] font-bold">${item.old_price}</del>
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
                                <div
                                    className={`flex justify-center items-center w-[133px] h-[40px] rounded-[5px] font-bold text-[16px] border-2 ${hoveredItems[index] ? 'bg-[#C67D39] text-white border-transparent' : 'border-2-[#178C8C] text-[#178C8C]'}`}
                                >
                                    Vào ngay
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-4 gap-[50px] justify-items-center mb-[60px]">
                <Pagination
                    className="col-start-4"
                    align='end'
                    current={pagination.currentPage} // trang hiện tại
                    total={pagination.total} // tổng số bản ghi
                    pageSize={pagination.pageSize} // Số bản ghi trên mỗi trang
                    onChange={handlePageChange} // gọi hàm 
                />
            </div>
        </>
    );
};

export default Card;
