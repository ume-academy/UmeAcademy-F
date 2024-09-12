import { Pagination } from "antd";
import Card from "../../../components/client/Card/Card";

const Categories_Course = () => {
    return (
        <div className="container mt-20">
            <div className="border-b">
                <p className="text-[#AC5E07] text-[32px] font-bold pb-5">
                    Tên danh mục
                </p>
            </div>
            <Card />
            <div className="mt-20 mb-10 float-right">
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
    );
};

export default Categories_Course;
