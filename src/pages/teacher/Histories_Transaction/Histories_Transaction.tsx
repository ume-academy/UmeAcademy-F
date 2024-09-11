import { Table, TableColumnsType, TableProps, Tag } from 'antd';
import { useState } from 'react';
import styles from './histotiesTransaction.module.scss';

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
    key: string;
    id: any;
    title: string;
    buyer: string;
    totalPrice: number;
    methodPayment: string;
    boughtAt: string,
    status: number,
}

// Data mẫu
const data: DataType[] = [
    {
        key: '1',
        id: 1,
        title: 'JavaScript Cơ bản',
        buyer: 'Thái Quốc Tuấn',
        totalPrice: 100000,
        methodPayment: 'VNPay', // fix cứng
        boughtAt: '10/9/2024',
        status: 0
    },
    {
        key: '2',
        id: 2,
        title: 'JavaScript Nâng cao',
        buyer: 'Thái Quốc Tuấn',
        totalPrice: 150000,
        methodPayment: 'VNPay', // fix cứng
        boughtAt: '10/9/2024',
        status: 1
    },
    {
        key: '3',
        id: 3,
        title: 'ReactJs cơ bản',
        buyer: 'Thái Quốc Tuấn',
        totalPrice: 250000,
        methodPayment: 'VNPay', // fix cứng
        boughtAt: '10/9/2024',
        status: 2
    }
];

const Histories_Transaction = () => {
    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});

    const handleChange: OnChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as Sorts);
    };

    // const clearFilters = () => {
    //     setFilteredInfo({});
    // };

    // const clearAll = () => {
    //     setFilteredInfo({});
    //     setSortedInfo({});
    // };

    // const setAgeSort = () => {
    //     setSortedInfo({
    //         order: 'descend',
    //         columnKey: 'price',
    //     });
    // };

    const columns: TableColumnsType<DataType> = [
        {
            title: 'ID giao dịch',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
            ellipsis: true,
            align: 'center'
        },
        {
            title: <div className="text-center">Tên khóa học</div>,
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
            align: 'center'
        },
        {
            title: <div className="text-center">Người mua</div>,
            dataIndex: 'buyer',
            key: 'buyer',
            filters: [
                // { text: 'Joe', value: 'Joe' },
                // { text: 'Jim', value: 'Jim' },
            ],
            filteredValue: filteredInfo.buyer || null,
            onFilter: (value, record) => record.buyer.includes(value as string),
            sorter: (a, b) => a.buyer.length - b.buyer.length,
            sortOrder: sortedInfo.columnKey === 'buyer' ? sortedInfo.order : null,
            ellipsis: true,
            align: 'center'
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            sortOrder: sortedInfo.columnKey === 'totalPrice' ? sortedInfo.order : null,
            ellipsis: true,
            align: 'center'
        },
        {
            title: <div className="text-center">Phương thức</div>,
            dataIndex: 'methodPayment',
            key: 'methodPayment',
            // filters: [
            //     // { text: 'Joe', value: 'Joe' },
            //     // { text: 'Jim', value: 'Jim' },
            // ],
            // filteredValue: filteredInfo.title || null,
            // onFilter: (value, record) => record.title.includes(value as string),
            // sorter: (a, b) => a.title.length - b.title.length,
            // sortOrder: sortedInfo.columnKey === 'title' ? sortedInfo.order : null,
            // ellipsis: true,
            align: 'center'
        },
        {
            title: <div className="text-center">Ngày thanh toán</div>,
            dataIndex: 'boughtAt',
            key: 'boughtAt',
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
                            <Tag color={'green'}>Đã thanh toán</Tag>
                        ) : item.status === 2 ? (
                            <Tag color={'yellow'}>Chờ xác nhận</Tag>
                        ) : (
                            <Tag color={'red'}>Đã hủy</Tag>
                        )
                    }
                </div>
            )
        },
        // {
        //     title: <div className="text-center">Công cụ</div>,
        //     render: (_: any, course) => (
        //         <div className={`${styles['btnGroup']}`}>
        //             <div className="">
        //                 <Link to={''} className='m-0 p-0'>
        //                     <EditOutlined className='flex-1 text-xl' />
        //                 </Link>
        //             </div>

        //             <div className="">

        //                 <DeleteOutlined className='flex-1 text-xl text-red-500' onClick={() => alert(`Xóa thành công khóa học ${course.title}!`)} />
        //             </div>
        //         </div>
        //     )
        // },
    ];



    return (
        <>
            {/* <Space style={{ marginBottom: 16 }}>
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space> */}
            <div className={`${styles['heading']} text-2xl font-bold mb-6`}>
                <h3>Lịch sử giao dịch</h3>
            </div>

            {/* <div className={`${styles['actions']} flex items-center justify-end py-4 space-x-4`}>
                <div className={`${styles['searchBar']} `}>
                    <form action="">
                        <input type="text" placeholder='Tìm kiếm' className='rounded-xl p-2 pl-8' />

                        <div className={`${styles['searchIcon']} p-3`} onClick={() => alert('This is Search bar')}>
                            <SearchOutlined />
                        </div>
                    </form>
                </div>

                <div className={`${styles['add']}`}>
                    <Button className={`${styles['btn']} font-semibold py-2`}>
                        Thêm khóa học

                        <PlusOutlined />
                    </Button>
                </div>
            </div> */}

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

export default Histories_Transaction