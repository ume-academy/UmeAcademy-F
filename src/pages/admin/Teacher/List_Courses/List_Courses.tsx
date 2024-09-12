import { Image, Table, TableColumnsType, TableProps, Tag } from 'antd';
import styles from './list_courses.module.scss';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];


interface DataType {
    key: string;
    id: number;
    name: string;
    thumbnail: string;
    price: number;
    createdAt: string;
    numberOfStudent: string,
    status: number,
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
        name: 'JavaScript Cơ bản',
        thumbnail: 'https://picsum.photos/200/200',
        price: 100000,
        createdAt: '10/11/1000', // fix cứng
        numberOfStudent: '50',
        status: 0
    },
    {
        key: '2',
        id: 2,
        name: 'JavaScript Cơ bản',
        thumbnail: 'https://picsum.photos/200/200',
        price: 100000,
        createdAt: '10/11/1000', // fix cứng
        numberOfStudent: '50',
        status: 2
    },
    {
        key: '3',
        id: 3,
        name: 'ReactJs cơ bản',
        thumbnail: '',
        price: 250000,
        createdAt: 'VNPay', // fix cứng
        numberOfStudent: '510',
        status: 1
    },
    {
        key: '4',
        id: 4,
        name: 'ReactJs cơ bản',
        thumbnail: '',
        price: 250000,
        createdAt: 'VNPay', // fix cứng
        numberOfStudent: '10',
        status: 2
    }
];
const List_Courses = () => {

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
        title: <div className="text-center">Tên khóa học</div>,
        dataIndex: "name",
        key: "name",
        ellipsis: true,
        align: "center",
      },
      {
        title: <div className="text-center">Ảnh</div>,
        dataIndex: "thumbnail",
        key: "thumbnail",
        render: (thumbnail: string) => (
          <Image
            width={100}
            src={thumbnail || 'https://www.nicety.com.vn/admin/assets/images/404.png'}
          />
        ),
        ellipsis: true,
        align: "center",
      },
      {
        title: <div className="text-center">Giá</div>,
        dataIndex: "price",
        key: "price",
        ellipsis: true,
        align: "center",
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        ellipsis: true,
        align: "center",
      },
      {
        title: <div className="text-center">Số lượng HV</div>,
        dataIndex: "numberOfStudent",
        key: "numberOfStudent",
        align: "center",
        width: 140
      },
      {
        title: <div className="text-center">Trạng thái</div>,
        dataIndex: "status",
        key: "status",
        render: (_: any, item) => (
            <div className="text-center">
                {
                    item.status === 0 ? (
                        <Tag color={'green'}>Hoạt động</Tag>
                    ) : item.status === 2 ? (
                        <Tag color={'blue'}>Chờ xuất bản</Tag>
                    ) : (
                        <Tag color={'red'}>Ngưng hoạt động</Tag>
                    )
                }
            </div>
        ),
        align: "center",
        width: 140
      },
      {
        title: <div className="text-center">Hành động</div>,
        dataIndex: "status",
        render: (_: any, item) => (
          <div className={`${styles['btnGroup']}`}>
              <div className="">
                  <Link to={'/admin/form_course_edit/2'} className='m-0 p-0'>
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
                <h3>Danh sách khóa học</h3>
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

export default List_Courses
