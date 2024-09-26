import { Link, useParams } from 'react-router-dom';
import Card from '../../../components/client/Card/Card';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { Tcourse } from '../../../interface/Tcourse';
import instance from '../../../api';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { logoImageError } from '../../../contants/client';
const Purchased_Course = () => {
    const {id}= useParams()
    
    const [myCourses, setMyCourses] = useState<Tcourse[] | undefined>(undefined)

    useEffect(() => {
        (async () => {
            if(id){
                const {data} = await instance(`/users/${id}/course-attended`)
                setMyCourses(data.data)
                console.log(data.data)
            }
        })()
    }, [id])

    // Sử dụng mảng trạng thái để theo dõi hover của từng khóa học
    const [hoveredItems, setHoveredItems] = useState<boolean[]>(Array(myCourses?.length).fill(false));

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
        <div>
            <div className="bg-[#000000] w-full h-[100px] text-white p-7 pl-10">
                <p className="font-bold text-[24px]">Khóa học của tôi</p>
            </div>
            <div className="grid grid-cols-4 justify-items-center mt-15 gap-[40px] mb-[40px] mx-[60px]">
            {myCourses && myCourses?.length > 0  ? (
              // data tồn tại
              myCourses?.map((item, index) => (
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
                  Bạn chưa mua khóa học nào
                </p>
              </div>
            )}
          </div>
        </div>
    );
};
export default Purchased_Course;
