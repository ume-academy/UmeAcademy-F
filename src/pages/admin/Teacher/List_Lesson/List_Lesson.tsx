import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Pagination, Popconfirm, Table, TableColumnsType } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CategoryContext } from '../../../../contexts/category_context';
import { Tcategory } from '../../../../interface/Tcategory';
import styles from './list_lesson.module.scss';

const List_Lesson = () => {

    const { state, removeCategory, getAllCategories } = useContext(CategoryContext);

    // Destructuring
    const { categories, pagination } = state

    // Đổ data vào table
    const dataTable = categories?.data?.map((item: Tcategory, index: number) => (
        {
            key: index + 1,
            ...item
        }
    ));

    // Chuyển trang
    const handlePageChange = (page: number) => {
        // getAllCategories(page)
    }

    console.log(state)

    const columns: TableColumnsType<any> = [
        {
            title: <div className="text-center">STT</div>,
            dataIndex: 'key',
            key: 'key',
            align: 'center',
            width: '100px',
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày tạo',
            // dataIndex: 'created_at',
            // key: 'created_at',
            render: ((_: any, item) => (
                <div className="">
                    {/* {item.created_at ? format(new Date(item.created_at), 'dd/MM/yyyy') : 'N/A'} */}
                    {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                </div>
            )),
            align: 'center'
        },
        {
            title: <div className="text-center">Công cụ</div>,
            width: '200px',
            render: (_: any, category: Tcategory) => (
                <div className={`${styles['btnGroup']}`}>
                    <div className="">
                        <Link to={`/admin/update_category/${category.id}`} className='m-0 p-0'>
                            <EditOutlined className='flex-1 text-xl' />
                        </Link>
                    </div>

                    <div className="">
                        <Popconfirm
                            placement="left"
                            title={`Xóa bản ghi`}
                            description={<div>Bạn có muốn xóa bản ghi <b>{category?.name}</b> không?</div>}
                            okText={'Xóa'}
                            onConfirm={() => removeCategory(category)}
                            cancelText="Hủy"
                        >
                            <DeleteOutlined className='flex-1 text-xl text-red-500' />
                        </Popconfirm>

                    </div>
                </div>
            )
        },
    ];

    return (
        <>
            <div className="heading mb-6 flex justify-between items-center">
                <h3 className='font-semibold text-xl text-[#C67D39]'>Danh sách danh mục</h3>

                <Button className='bg-[#C67D39] text-white'>
                    <Link to={'/admin/create_category'} className='space-x-2'>

                        Thêm mới
                        <PlusOutlined className='pl-2' />
                    </Link>
                </Button>
            </div>

            <div className="content">

                <Table
                    columns={columns}
                    dataSource={dataTable}
                    pagination={false} // tắt phân trang của table
                />

                <div className="mt-5">
                    <Pagination
                        align='end'
                        current={pagination.currentPage} // trang hiện tại
                        total={pagination.total} // tổng số bản ghi
                        pageSize={pagination.pageSize} // Số bản ghi trên mỗi trang
                        onChange={handlePageChange}
                    />
                </div>

            </div>
        </>
    )
}

export default List_Lesson