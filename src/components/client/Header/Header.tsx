import { BookOutlined, HistoryOutlined, LogoutOutlined, QuestionCircleOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'

import { navigationCategory, routeConfig } from '../../../contants/client'
import styles from './header.module.scss'

interface Props {

}

const Header = (props: Props) => {
//   Cho các đường dẫn KHÔNG có :id
  const shouldHideNav = routeConfig.hiddenNavRoutes.includes(location.pathname);

//   Cho các đường dẫn có :id
//   const shouldHideNav = routeConfig.hiddenNavRoutes.some(route => {
//     const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`);
//     return regex.test(location.pathname);
//   });

  const menuItems: any = [
    {
      key: 'profile',
      label: (
        <div className="flex items-center">
          <Link to={`/admin`}><Avatar icon={<UserOutlined />} /></Link>
          <div className="ml-3 ">
            <div className="flex mb-1">
              <Link className='inline font-semibold text-[16px] max-w-[180px] truncate' to={`/admin`}>Tuấn Thái</Link>
              <div className={`${styles['border_teacher']} text-[10px] flex items-center justify-center ml-3`}>
                <span className={`${styles['backGR_teacher']} block font-bold rounded-[5px] px-1 py-0.5 text-[#0058FA] hover:text-[#0058FA]`}>Teacher</span>
              </div>
            </div>
            <Link to={`/admin`} className='block text-[#999999] max-w-[180px] truncate hover:text-[#999999]'>thaiquoctuan1308@gmail.com</Link>
          </div>
        </div>
      ),
    },
    {
      type: 'divider'
    },
    {
      key: 'courses',
      label: (
        <div className="flex items-center">
          <BookOutlined />
          <span className="ml-2">Bài giảng của tôi</span>
        </div>
      ),
    },
    {
      key: 'myCourses',
      label: (
        <div className="flex items-center">
          <QuestionCircleOutlined />
          <span className="ml-2">Khóa học của tôi</span>
        </div>
      ),
    },
    {
      key: 'history',
      label: (
        <div className="flex items-center">
          <HistoryOutlined />
          <span className="ml-2">Lịch sử thanh toán</span>
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <div className="flex items-center">
          <LogoutOutlined />
          <span className="ml-2">Sign Out</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <header>
        {/* navTop */}
        <div className="flex justify-between items-center px-[40px] border-b border-b-black pb-5">
          <div className="flex items-center min-w-[706px] justify-between">
            <div className="w-[84px] h-[70px] mr-[20px] bg-[#D9D9D9] flex items-center justify-center">
              <p className='text-black font-bold'>Logo</p>
            </div>
            <div className="flex items-center border-[1px]  rounded-full h-[46px] w-[498px] p-[12px]">
              <SearchOutlined style={{ fontSize: 30, paddingRight: 12, color: '#C5C5C5' }} />
              <input type="text" className='w-full h-[26px] focus:outline-none' placeholder='Lessons name' />
              </div>
          </div>

          {/* khi có data đoạn này dùng để if kiểm tra là user hay guest*/}
          <div className="flex items-center min-w-[706px] justify-end font-semibold">

            {/* <===== Start teacher =====>*/}
            <Link className='mr-[60px] hover:text-[#FB9C46]' to={``}>Khóa học của tôi</Link>
            <Dropdown overlay={<Menu items={menuItems} />} trigger={['hover']} placement='bottomLeft'>
              <Button className="flex items-center justify-start border-[1px] border-[#C5C5C5] p-2 h-[46px] rounded-[14px] min-w-[180px]">
                <Avatar size="small" icon={<UserOutlined />} />
                <span className="ml-1 font-semibold max-w-[120px] truncate">Tuấn Thái</span>
                <div className={`${styles['border_teacher']} text-[10px] flex items-center justify-center`}>
                  <span className={`${styles['backGR_teacher']} block font-bold rounded-[5px] px-1 py-0.5 bg-[rgba(234, 241, 255, 1)]  text-[#0058FA] hover:text-[#0058FA]`}>Teacher</span>
                </div>
              </Button>
            </Dropdown>
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
    </>
  )
}

export default Header