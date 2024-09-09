import Card from '../../../components/client/Card/Card';
import { Pagination } from 'antd';
const Purchased_Course = () => {
    return (
        <div>
            <div className="bg-[#000000] w-full h-[100px] text-white p-7 pl-10">
                <p className="font-bold text-[24px]">Khóa học của tôi</p>
            </div>
            <div className="m-20">
                <Card />
                <div className="m-20 float-right">
                    <Pagination
                        defaultCurrent={1}
                        total={100}
                        pageSize={10}
                        showLessItems={true}
                        showSizeChanger={false}
                        showQuickJumper={false}
                    />
                </div>
            </div>
        </div>
    );
};
export default Purchased_Course;
