import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Image, Table, TableColumnsType, TableProps, Tag } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import styles from './list_user.module.scss';


type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];


interface DataType {
    key: string;
    id: number;
    name: string;
    email: string;
    permission: number;
    createdAt: string;
}

// nút chọn select
const handleChangeSelect = (value: number | string) => {
    console.log(`selected ${value}`);
  };

// Data mẫu
const data: DataType[] = [
    {
        key: '1',
        id: 1,

        name: 'Nguyễn Văn JavaScript',
        email: 'nguyentrungduc2807@gmail.com',
        permission: 0,
        createdAt: '10/11/1000', // fix cứng
    },
    {
        key: '2',
        id: 2,

        name: 'Nguyễn Văn Php',
        email: 'nguyentrungduc2807@gmail.com',
        permission: 1,
        createdAt: '10/11/1000', // fix cứng
    },
    {
        key: '3',
        id: 3,

        name: 'Nguyễn Văn Pythỏn',
        email: 'nguyentrungduc2807@gmail.com',
        permission: 2,
        createdAt: '10/11/1000', // fix cứng
    },
    {
        key: '4',
        id: 4,

        name: 'Nguyễn Văn C+-',
        email: 'nguyentrungduc2807@gmail.com',
        permission: 3,
        createdAt: '10/11/1000', // fix cứng
    }
];

const List_Users = () => {

    const handleChange: OnChange = (pagination) => {
        console.log('Various parameters', pagination);
    };

    const columns: TableColumnsType<DataType> = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        ellipsis: true,
        align: "center",
        width: 60
      },
      {
        title: <div className="text-center">Họ và tên</div>,
        dataIndex: "name",
        key: "name",
        ellipsis: true,
        align: "center",
      },
      {
        title: <div className="text-center">Email</div>,
        dataIndex: "email",
        key: "email",
        ellipsis: true,
        align: "center",
      },
      {
        title: <div className="text-center">Quyền</div>,
        dataIndex: "permission",
        key: "permission",
        render: (_: any, item) => (
            <div className="text-center">
                {
                    item.permission === 0 ? (
                        <Tag color={'green'}>Admin</Tag>
                    ) : item.permission === 1 ? (
                        <Tag color={'blue'}>Khách hàng</Tag>
                    ) :  item.permission === 2 ?(
                        <Tag color={'orange'}>QTV</Tag>
                    ) : (
                        <Tag color={'red'}>Giảng viên</Tag>
                    )
                }
            </div>
        ),
        ellipsis: true,
        align: "center",
        width:100
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        ellipsis: true,
        align: "center",
      },
      {
        title: <div className="text-center">Hành động</div>,
        dataIndex: "status",
        render: (_: any, item) => (
          <div className={`${styles['btnGroup']}`}>
              <div className="">
                  <Link to={'/admin/update_user/2'} className='m-0 p-0'>
                      <EditOutlined className='flex-1 text-xl' />
                  </Link>
              </div>

              <div className="">
                  <DeleteOutlined className='flex-1 text-xl text-red-500' onClick={() => alert(`Xóa thành công khóa học ${item.name}!`)} />
              </div>
          </div>
      ),
        key: "status",
      },
    ];
    return (
        <>
            <div className={`${styles['heading']} text-2xl font-bold mb-6`}>
                <h3>Danh sách người dùng</h3>
            </div>

            <Table
                columns={columns}
                dataSource={data}
                onChange={handleChange}
                pagination={{
                    pageSize: 5, //Số lượng bản ghi mỗi trang
                    total: data.length, // Tổng số bản ghi
                }}
            />
        </>
    )
}

export default List_Users