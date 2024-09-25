import { Button, Table, TableColumnsType, Tag, Space, Typography, Popconfirm, Pagination } from 'antd';
import { useContext } from 'react';
import { UserContext, UserContextType } from '../../../../contexts/user_context';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './list_user.module.scss';
import { Tuser } from '../../../../interface/Tuser';

const { Title } = Typography;

const List_Users = () => {
    const { state, removeUser, getAllUser } = useContext(UserContext) as UserContextType;
    const { users, pagination } = state
    const handlePageChange = (page: number) => {
        getAllUser(page)
    }
    const dataTable = users?.map((item: Tuser, index: number) => (
        {
            key: index + 1,
            ...item
        }
    ));
    const columns: TableColumnsType<Tuser> = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            ellipsis: true,
            align: "center",
            width: 60
        },
        {
            title: <div>Họ và tên</div>,
            dataIndex: "fullname",
            key: "fullname",
            ellipsis: true,
            align: "center",
        },
        {
            title: <div>Quyền</div>,
            dataIndex: "role",
            key: "role",
            render: (role: number) => (
                <Tag color={role === 1 ? 'purple' : 'blue'}>
                    {role === 1 ? 'Admin' : 'Người dùng'}
                </Tag>
            ),
            ellipsis: true,
            align: "center",
            width: 130
        },
        {
            title: <div>Email</div>,
            dataIndex: "email",
            key: "email",
            ellipsis: true,
            align: "center",
        },
        {
            title: "Ngày tạo",
            dataIndex: "created_at",
            key: "created_at",
            render: (date) => {
                const formattedDate = new Date(date).toLocaleDateString('vi-VN');
                return formattedDate;
            },
            ellipsis: true,
            align: "center",
            width: 120
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status: number) => (
                <Tag color={status === 0 ? 'red' : 'green'}>
                    {status === 0 ? 'Chưa kích hoạt' : 'Đã kích hoạt'}
                </Tag>
            ),
            ellipsis: true,
            align: "center",
            width: 150
        },
        {
            title: <div>Hành động</div>,
            key: "actions",
            align: "center",
            width: 110,
            render: (record) => (
                <div className={`${styles['btnGroup']}`}>
                    <div>
                        <Link to={`/admin/update_user/${record.id}`}>
                            <EditOutlined className='flex-1 text-xl' />
                        </Link>
                    </div>
                    <div>
                        <Popconfirm
                            placement="left"
                            title={`Xóa bản ghi`}
                            description={<div>Bạn có muốn xóa bản ghi không?</div>}
                            okText={'Xóa'}
                            onConfirm={() => removeUser(record.id)}
                            cancelText="Hủy"
                        >
                            <DeleteOutlined className='flex-1 text-xl text-red-500' />
                        </Popconfirm>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="heading mb-6 flex justify-between items-center">
                <Title level={3} className='font-semibold text-xl text-[#C67D39]'>
                    Danh sách người dùng
                </Title>
                <Button className='bg-[#C67D39] text-white'>
                    <Link to={'/admin/create_user'}>
                        <Space>
                            Thêm mới
                            <PlusOutlined />
                        </Space>
                    </Link>
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={dataTable}
                rowKey={'id'}
                pagination={false}
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
        </>
    );
};

export default List_Users;
