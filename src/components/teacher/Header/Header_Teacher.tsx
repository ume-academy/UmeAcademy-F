import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import styles from './header.module.scss';


const Header_Teacher = () => {
    return (
        <>
            <Header className={`${styles['header']} flex justify-end items-center`} >
                <div className="">
                    <Button className="flex items-center justify-start border-[1px] border-[#C5C5C5] p-2 h-[46px] rounded-[14px] min-w-[180px]">
                        <Avatar size="small" icon={<UserOutlined />} />
                        <span className="ml-1 font-semibold max-w-[120px] truncate">Tuấn Thái</span>
                        <p className={`font-bold  text-[11px] rounded-[6px] border border-[#CCDDF9]  bg-[#EAF1FF]  text-[#0058FA] w-[56px] p-1 text-center`}>Teacher</p>
                    </Button>
                </div>
            </Header>
        </>
    )
}

export default Header_Teacher