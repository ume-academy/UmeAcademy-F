import { Link, useNavigate } from "react-router-dom";
import { navigationCategory, routeConfig } from "../../../contants/client";
import { BookOutlined, HistoryOutlined, LogoutOutlined, QuestionCircleOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Menu, Popconfirm } from 'antd'
import styles from './header.module.scss'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/auth_context'


const Header = () => {
  const nav = useNavigate();
  const { authLogout } = useContext(AuthContext);
  
  const [query, setQuery] = useState<string>(""); // state này để bắt value input tìm kiếm

  const handleSearch = (query: string) => {
    nav(`/search?query=${query}`);
  };

  const shouldHideHeader = routeConfig.hiddenFullHeaderRoutes.includes(
    location.pathname
  );

  const [dropdownVisible, setDropdownVisible] = useState(false); // Trạng thái dropdown
  
  //   Cho các đường dẫn KHÔNG có :id
  const shouldHideNav = routeConfig.hiddenNavRoutes.includes(location.pathname);
  
  //   Cho các đường dẫn có :id
  const shouldHideNav = routeConfig.hiddenNavRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(":id", "[^/]+")}$`);
    return regex.test(location.pathname);
  });
  
  // Kiểm tra có thông tin user có được lưu vào local storage sau khi đăng nhập
    const token = localStorage.getItem('token');

    // Chặn đóng lại dropdown khi click
    const handleMenuClick = (e: any) => {
        // Ngăn việc đóng dropdown khi nhấp vào bất kỳ mục nào
        e.domEvent.preventDefault();
    };

const Header = (props: Props) => {    

    return (
        <>
            {!shouldHideHeader && (
                <header>
                    {/* navTop */}
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center border-b border-b-black">
                            <div className="flex items-center min-w-[706px] justify-between">
                                <div className="w-[84px] h-[70px] mr-[20px] bg-[#D9D9D9] flex items-center justify-center">
                                    <p className='text-black font-bold'>Logo</p>
                                </div>
                                <div className="flex items-center border-[1px]  rounded-full h-[46px] w-[498px] p-[12px]">
                                  <SearchOutlined
                                    style={{ fontSize: 30, paddingRight: 12, color: "#C5C5C5" }}
                                  />
                                  <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") handleSearch(query); // Gọi tìm kiếm khi nhấn Enter
                                    }}
                                    className="w-full h-[26px] focus:outline-none"
                                    placeholder="Course name"
                                  />
                              </div>
                            </div>

                            {/* khi có data đoạn này dùng để if kiểm tra là user hay guest*/}

                            {
                                token ? (

                                    <div className="flex items-center space-x-4 ">

                                        {/* <===== Start teacher =====>*/}
                                        <Link
                                          className="mr-[60px] hover:text-[#FB9C46]"
                                          to={`/1/purchased_course`}
                                        >
                                          Khóa học của tôi
                                        </Link>
                                        <Dropdown
                                            overlay={<Menu items={menuItems} onClick={handleMenuClick} />}
                                            trigger={['click']}
                                            visible={dropdownVisible}
                                            onVisibleChange={(flag) => setDropdownVisible(flag)}
                                        >
                                            <Button className="flex items-center justify-start border-[1px] border-[#C5C5C5] p-2 h-[46px] rounded-[14px] min-w-[180px]">
                                                <Avatar size="small" icon={<UserOutlined />} />
                                                <span className="ml-1 font-semibold max-w-[120px] truncate">Tuấn Thái</span>
                                                <div className={`${styles['border_teacher']} text-[10px] flex items-center justify-center`}>
                                                    <span className={`${styles['backGR_teacher']} block font-bold rounded-[5px] px-1 py-0.5 bg-[rgba(234, 241, 255, 1)]  text-[#0058FA] hover:text-[#0058FA]`}>Teacher</span>
                                                </div>
                                            </Button>
                                        </Dropdown>
                                    </div>
                                ) : (
                                    <div className="flex space-x-4 items-center">
                                        <Link to={''} className='font-semibold'>Giảng dạy trên Umeacademy</Link>
                                        <Link to="/login">
                                            <Button className='px-8 bg-[#407F55] text-white font-semibold'>Đăng nhập</Button>
                                        </Link>

                                        <Link to="/register">
                                            <Button className='px-8 bg-[#FB9C46] text-white font-semibold' >Đăng ký</Button>
                                        </Link>
                                    </div>
                                )}

                        </div>


                    </div>
                    {/* Nav bottom */}
                    {!shouldHideNav && ( // Ẩn Nav nếu đường dẫn nằm trong mảng hiddenNavRoutes ngược lại thì hiện ra
                        <div className="flex bg-[#AC5E07] text-white justify-around items-center">
                            {navigationCategory.map((title) => (
                                <ul className='h-[60px] flex items-center' key={title.id}>
                                    <li className=''><Link to={`#`} className='text-[20px] font-semibold hover:underline p-4'>{title.title}</Link></li>
                                </ul>
                            ))}
                        </div>
                    )}
                </header>
            )}
        </>
    )
}

export default Header;
