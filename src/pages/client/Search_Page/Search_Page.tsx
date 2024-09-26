import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logoImageError, routeConfig } from '../../../contants/client';
import { CourseContext, CourseContextType } from '../../../contexts/course_context';


const Search_Page = () => {
    const {searchCourse, state} = useContext(CourseContext) as CourseContextType
    const {courses} = state
    // console.log(courses.data)

    
    
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    const query = useQuery().get('query'); // Lấy giá trị tham số 'query' từ URL

    useEffect(() => {
        if(query && query.trim() !== ''){
            searchCourse(query)
        }
    }, [query])

     // Sử dụng mảng trạng thái để theo dõi hover của từng khóa học
     const [hoveredItems, setHoveredItems] = useState<boolean[]>(Array(courses.data.length).fill(false));

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
        <div className="container">
          <div className="heading py-10">
            <p className="text-[#AC5E07] text-2xl">
              Kết quả tìm kiếm: 
            </p>

            <p className=" text-lg">
              Đang hiển thị{" "}
              <b className="text-[#AC5E07]">{courses.data.length}</b> khóa học</p>
          </div>

          <div className="grid grid-cols-4 justify-items-center mt-15 gap-[40px] mb-[40px]">
            {courses.data.length > 0 ? (
              // data tồn tại
              courses.data.map((item, index) => (
                <div
                key={index + 1}
                className="w-full h-[449px] mb-10 rounded-lg hover:shadow-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:translate-y-[-7px] cursor-pointer"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}>
                  <Link
                    to={`/course/details/${item.id}`}
                  >
                    <div className="bg-[#D9D9D9] h-[200px] text-[18px] flex items-center font-bold justify-center">
                      <img
                        className="w-full h-full object-center"
                        src={
                          typeof item.thumbnail === "string"
                            ? item.thumbnail
                            : `${logoImageError}`
                        }
                        alt=""
                      />
                    </div>
                    <div className="p-4 space-y-8">
                      <div>
                        <div className="text-[20px] font-bold text-[#0A4A4A]">
                          {item.title}
                        </div>
                        <p className="text-[16px] font-bold">
                          Duration : 25mins
                        </p>
                        <div className="flex items-center text-[16px]">
                          <del className="text-[#868686] font-bold">
                            ${item.old_price}
                          </del>
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
                </div>
              ))
            ) : (
              // data rỗng
              <div className="h-60 flex justify-center items-center">
                <p className="font-bold text-2xl text-center">
                  Hiện không có khóa học nào mà bạn mong muốn!
                </p>
              </div>
            )}
          </div>
        </div>
      </>
    );
}

export default Search_Page