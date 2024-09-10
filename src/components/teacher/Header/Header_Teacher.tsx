import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import styles from './header.module.scss';


const Header_Teacher = () => {
    return (
        <>
            <Header className={`${styles['header']} flex justify-between items-center`} >
                <div className="logo">
                    Logo
                </div>

                <div className="">
                    <Button className="flex items-center justify-start border-[1px] border-[#C5C5C5] p-2 h-[46px] rounded-[14px] min-w-[180px]">
                        <Avatar size="small" icon={<UserOutlined />} />
                        <span className="ml-1 font-semibold max-w-[120px] truncate">Tuấn Thái</span>
                        <div className={`${styles['border_teacher']} text-[10px] flex items-center justify-center`}>
                            <span className={`${styles['backGR_teacher']} block font-bold rounded-[5px] px-1 py-0.5 bg-[rgba(234, 241, 255, 1)]  text-[#0058FA] hover:text-[#0058FA]`}>Teacher</span>
                        </div>
                    </Button>
                </div>
            </Header>
        </>
    )
}

export default Header_Teacher