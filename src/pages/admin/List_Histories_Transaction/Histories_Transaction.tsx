import { Empty, Select, Table, TableColumnsType } from 'antd';
import styles from './histories_transaction.module.scss';
import { Ttransaction } from '../../../interface/Ttransaction';
import { useContext } from 'react';
import { Transaction_Context, Transaction_Context_Type } from '../../../contexts/transaction_context';

const Histories_Transaction = () => {
  const { state, updateTransactionStatus } = useContext(Transaction_Context) as Transaction_Context_Type;
  const { Option } = Select;

  const columnWidth = 150;
  const columns: TableColumnsType<Ttransaction> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      align: "center",
      width: 50
    },
    {
      title: "Tên khóa học",
      dataIndex: "course",
      key: "course",
      ellipsis: true,
      align: "center",
      width: columnWidth,
      render: (course: { title: string }) => {
        return course.title
      }
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      key: "code",
      ellipsis: true,
      align: "center",
      width: columnWidth
    },
    {
      title: "Học viên",
      dataIndex: "user_id",
      key: "user_id",
      ellipsis: true,
      align: "center",
      width: columnWidth
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_price",
      key: "total_price",
      ellipsis: true,
      align: "center",
      width: columnWidth
    },
    {
      title: "Phương thức",
      dataIndex: "payment_method_id",
      key: "payment_method_id",
      render: (payment_method_id) => {
        const methods: { [key: number]: string } = {
          1: "VNPay",
          2: "Credit Card",
          3: "Nợ",
        };
        return methods[payment_method_id];
      },
      align: "center",
      width: columnWidth
    },

    {
      title: "Ngày thanh toán",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        const formattedDate = new Date(date).toLocaleDateString('vi-VN');
        return formattedDate;
      },
      ellipsis: true,
      align: "center",
      width: columnWidth
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: number, record: Ttransaction) => {
        const handleChange = (value: number) => {
          if (record.id) {
            updateTransactionStatus(record.id, value)
          }
        }


        return (
          <Select
            value={status}
            onChange={handleChange}
            style={{ width: 150 }}
          >
            <Option value={0}>Đã hủy</Option>
            <Option value={1}>Chờ thanh toán</Option>
            <Option value={2}>Đã thanh toán</Option>
          </Select>
        )
      },
      align: "center",
      width: columnWidth
    },
  ];

  return (
    <>
      <div>
        <div className={`${styles['heading']}  text-2xl font-bold mb-6`}>
          <h3>Lịch sử giao dịch</h3>
        </div>
        {state.transactions.length > 0 ? (
          <Table
            columns={columns}
            dataSource={state.transactions}
            rowKey="id"
            pagination={{
              pageSize: 8,
              total: state.transactions.length,
            }}
          />) :
          (<Empty description="Không có lịch sử giao dịch nào" />)
        }
      </div>
    </>
  );
}

export default Histories_Transaction;
