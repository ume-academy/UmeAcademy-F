import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Select, Space, Table, TableColumnsType, TableProps, Tag } from 'antd';
import React, { useState } from 'react'
import styles from './listCorse.module.scss'
import { Link } from 'react-router-dom';

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
    key: string;
    title: string;
    thumbnail: string,
    price: number;
    createdAt: string,
    sold: number,
    status: number,
    // description: string;
}

// Data mẫu
const data: DataType[] = [
    {
        key: '1',
        title: 'JavaScript Cơ bản',
        thumbnail: 'https://picsum.photos/300/200?random=1',
        price: 100000,
        createdAt: '10/9/2024',
        sold: 10,
        status: 0
    },
    {
        key: '2',
        title: 'JavaScript Nâng cao',
        thumbnail: 'https://picsum.photos/300/200?random=2',
        price: 150000,
        createdAt: '10/9/2023',
        sold: 11,
        status: 1
    },
    {
        key: '3',
        title: 'ReactJs cơ bản',
        thumbnail: 'https://picsum.photos/300/200?random=3',
        price: 350000,
        createdAt: '11/7/2020',
        sold: 26,
        status: 2
    }
];

const List_Courses = () => {
    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});

    const handleChange: OnChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as Sorts);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'price',
        });
    };

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Tên khóa học',
            dataIndex: 'title',
            key: 'title',
            filters: [
                // { text: 'Joe', value: 'Joe' },
                // { text: 'Jim', value: 'Jim' },
            ],
            filteredValue: filteredInfo.title || null,
            onFilter: (value, record) => record.title.includes(value as string),
            sorter: (a, b) => a.title.length - b.title.length,
            sortOrder: sortedInfo.columnKey === 'title' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: <div className="text-center">Thumbnail</div>,
            render: (_: any, img) => (
                <img src={img.thumbnail} alt={img.title} width={150} />
            ),

        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
            ellipsis: true,
            align: 'center'
        },
        {
            title: <div className="text-center">Ngày tạo</div>,
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center'
        },
        {
            title: 'Số lượng học viên',
            dataIndex: 'sold',
            key: 'sold',
            // sorter: (a, b) => a.sold - b.sold,
            // sortOrder: sortedInfo.columnKey === 'sold' ? sortedInfo.order : null,
            // ellipsis: true,
            align: 'center'
        },
        {
            title: <div className="text-center">Trạng thái</div>,
            dataIndex: 'status',
            key: 'status',
            render: (_: any, item) => (
                <div className="text-center">
                    {
                        item.status === 0 ? (
                            <Tag color={'green'}>Hoạt động</Tag>
                        ) : item.status === 2 ? (
                            <Tag color={'blue'}>Chuẩn bị hoạt động</Tag>
                        ) : (
                            <Tag color={'red'}>Ngừng hoạt động</Tag>
                        )
                    }
                </div>
            )
        },
        {
            title: <div className="text-center">Công cụ</div>,
            render: (_: any, course) => (
                <div className={`${styles['btnGroup']}`}>
                    <div className="">
                        <Link to={''} className='m-0 p-0'>
                            <EditOutlined className='flex-1 text-xl' />
                        </Link>
                    </div>

                    <div className="">

                        <DeleteOutlined className='flex-1 text-xl text-red-500' onClick={() => alert(`Xóa thành công khóa học ${course.title}!`)} />
                    </div>
                </div>
            )
        },
    ];



    return (
        <>
            {/* <Space style={{ marginBottom: 16 }}>
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space> */}
            <div className={`${styles['heading']}  text-2xl font-bold`}>
                <h3>Khóa học</h3>
            </div>

            <div className={`${styles['actions']} flex items-center justify-end py-4 space-x-4`}>
                {/* <div className={`${styles['searchBar']} `}>
                    <form action="">
                        <input type="text" placeholder='Tìm kiếm' className='rounded-xl p-2 pl-8' />

                        <div className={`${styles['searchIcon']} p-3`} onClick={() => alert('This is Search bar')}>
                            <SearchOutlined />
                        </div>
                    </form>
                </div> */}

                <div className={`${styles['add']}`}>
                    <Button className={`${styles['btn']} font-semibold py-2`}>
                        Thêm khóa học

                        <PlusOutlined />
                    </Button>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={data}
                onChange={handleChange}
                pagination={{
                    pageSize: 1, //Số lượng bản ghi mỗi trang
                    total: data.length, // Tổng số bản ghi
                }}
            />
        </>
    )
}

export default List_Courses