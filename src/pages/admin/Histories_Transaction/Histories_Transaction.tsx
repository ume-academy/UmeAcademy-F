import { Table, TableColumnsType, TableProps, Tag } from 'antd';
import { useState } from 'react';
import styles from './histotiesTransaction.module.scss';
import { Select, Space } from 'antd';


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

// nút chọn select
const handleChangeSelect = (value: number | string) => {
    console.log(`selected ${value}`);
  };

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
    },
    {
        key: '4',
        id: 4,
        title: 'ReactJs cơ bản',
        buyer: 'Thái Quốc Tuấn',
        totalPrice: 250000,
        methodPayment: 'VNPay', // fix cứng
        boughtAt: '10/9/2024',
        status: 1
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


    const columns: TableColumnsType<DataType> = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
        ellipsis: true,
        align: "center",
        width: 80
      },
      {
        title: <div className="text-center">Tên khóa học</div>,
        dataIndex: "title",
        key: "title",
        filters: [
          // { text: 'Joe', value: 'Joe' },
          // { text: 'Jim', value: 'Jim' },
        ],
        filteredValue: filteredInfo.title || null,
        onFilter: (value, record) => record.title.includes(value as string),
        sorter: (a, b) => a.title.length - b.title.length,
        sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
        ellipsis: true,
        align: "center",
      },
      {
        title: <div className="text-center">Giảng viên</div>,
        dataIndex: "title",
        key: "title",
        filters: [
          // { text: 'Joe', value: 'Joe' },
          // { text: 'Jim', value: 'Jim' },
        ],
        filteredValue: filteredInfo.title || null,
        onFilter: (value, record) => record.title.includes(value as string),
        sorter: (a, b) => a.title.length - b.title.length,
        sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
        ellipsis: true,
        align: "center",
      },
      {
        title: <div className="text-center">Người mua</div>,
        dataIndex: "buyer",
        key: "buyer",
        filters: [
          // { text: 'Joe', value: 'Joe' },
          // { text: 'Jim', value: 'Jim' },
        ],
        filteredValue: filteredInfo.buyer || null,
        onFilter: (value, record) => record.buyer.includes(value as string),
        sorter: (a, b) => a.buyer.length - b.buyer.length,
        sortOrder: sortedInfo.columnKey === "buyer" ? sortedInfo.order : null,
        ellipsis: true,
        align: "center",
      },
      {
        title: "Tổng tiền",
        dataIndex: "totalPrice",
        key: "totalPrice",
        sorter: (a, b) => a.totalPrice - b.totalPrice,
        sortOrder:
          sortedInfo.columnKey === "totalPrice" ? sortedInfo.order : null,
        ellipsis: true,
        align: "center",
      },
      {
        title: <div className="text-center">Phương thức</div>,
        dataIndex: "methodPayment",
        key: "methodPayment",
        align: "center",
        width: 140
      },
      {
        title: <div className="text-center">Ngày thanh toán</div>,
        dataIndex: "boughtAt",
        key: "boughtAt",
        align: "center",
        width: 140

      },
      {
        title: <div className="text-center">Trạng thái</div>,
        dataIndex: "status",
        key: "status",
        render: (_: any, item) => (
          <div className="text-center">
            <Space wrap>
              <Select
                defaultValue={'disabled'}
                style={{ width: 130 }}
                onChange={handleChangeSelect}
                options={[
                  { value: 'disabled', label: 'Vui lòng chọn', disabled: true },
                  { value: 1, label: "Đã thanh toán" },
                  { value: 2, label: "Đã hủy" },
                  { value: 3, label: "Chờ thanh toán" }
                ]}
              />
            </Space>
          </div>
        ),
      },
    ];



    return (
        <>
            <div className={`${styles['heading']} text-2xl font-bold mb-6`}>
                <h3>Lịch sử giao dịch</h3>
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

export default Histories_Transaction