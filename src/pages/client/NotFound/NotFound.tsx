import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { notFoundImg } from '../../../contants/client';
import styles from './notfound.module.scss';


const NotFound = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="flex flex-col items-center space-y-6">
                <div className="img">
                    <img src={notFoundImg} alt="" />
                </div>

                <div className="title text-center space-y-3">
                    <h3 className='font-bold text-4xl'>Oops, Xin lỗi tôi không tìm thấy trang mà bạn cần!</h3>
                    <p>Trang bạn đang tìm kiếm có thể đã bị xóa, đã thay đổi tên, hoặc tạm thời không khả dụng.</p>
                </div>

                <div className="act">
                    <Button className={`${styles['btn']} rounded-full bg-[#AC5E07] p-6`}>
                        <Link to={'/'} className='text-lg'>Quay về trang chủ</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NotFound