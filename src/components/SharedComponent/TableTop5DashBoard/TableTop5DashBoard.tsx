import React from 'react';
import { Image, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  image: string
  price: number;
  quantity: number;
  date: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tên khóa học",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Ảnh",
    dataIndex: "image",
    key: "image",
    render: () => (
      <Image
        width={60}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    ),
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Đã bán",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Ngày tạo",
    key: "date",
    dataIndex: "date",
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    image: "https://picsum.photos/200/300",
    price: 32,
    quantity: 12,
    date: '12/10/2024',
  },
  {
    key: '2',
    name: 'Jim Green',
    image: "https://picsum.photos/200/300",
    price: 42,
    quantity: 12,
    date: '12/10/2024' ,
  },
  {
    key: '3',
    name: 'Joe Black',
    image: "https://picsum.photos/200/300",
    price: 32,
    quantity: 12,
    date: '12/10/2024' ,
  },
  {
    key: '4',
    name: 'Joe Black',
    image: "https://picsum.photos/200/300",
    price: 32,
    quantity: 12,
    date: '12/10/2024' ,
  },
  {
    key: '5',
    name: 'Joe Black',
    image: "https://picsum.photos/200/300",
    price: 32,
    quantity: 12,
    date: '12/10/2024' ,
  }
];

const TableTop5DashBoard = () => (
  <Table
    title={() => (
      <h2 className="uppercase font-bold text-[20px]">
        top 5 khóa học bán chạy nhất
      </h2>
    )}
    pagination={false}
    columns={columns}
    dataSource={data}
  />
);

export default TableTop5DashBoard;
