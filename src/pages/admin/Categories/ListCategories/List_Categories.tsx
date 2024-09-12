import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Table, TableColumnsType, Tag } from 'antd'
import { TableProps } from 'antd/lib';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './listcategories.module.scss'

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
    key: string;
    title: string;
    createdAt: string
}

// Data mẫu
const data: DataType[] = [
    {
        key: '1',
        title: 'Công nghệ thông tin & Lập trình',
        createdAt: '12/09/2024'
    },
    {
        key: '2',
        title: 'K   inh doanh & Khởi nghệp',
        createdAt: '10/2/2022'
    },
    {
        key: '3',
        title: 'Ngoại Ngữ',
        createdAt: '14/2/2019'
    }
];

const List_Categories = () => {

    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});

    const handleChange: OnChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as Sorts);
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
            title: <div className="text-center">Ngày tạo</div>,
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center'
        },
        {
            title: <div className="text-center">Công cụ</div>,
            width: '200px',
            render: (_: any, course) => (
                <div className={`${styles['btnGroup']}`}>
                    <div className="">
                        <Link to={'/admin/update_category/2'} className='m-0 p-0'>
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
                    dataSource={data}
                    onChange={handleChange}
                    pagination={{
                        pageSize: 1, //Số lượng bản ghi mỗi trang
                        total: data.length, // Tổng số bản ghi
                    }}
                />
            </div>
        </>
    )
}

export default List_Categories