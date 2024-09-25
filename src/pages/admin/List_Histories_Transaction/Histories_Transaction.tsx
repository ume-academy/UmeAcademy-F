import { Empty, Pagination, Select, Table, TableColumnsType } from 'antd';
import styles from './histories_transaction.module.scss';
import { Ttransaction } from '../../../interface/Ttransaction';
import { useContext } from 'react';
import { Transaction_Context, Transaction_Context_Type } from '../../../contexts/transaction_context';

const Histories_Transaction = () => {
  const { state, updateTransactionStatus, getAllTransaction } = useContext(Transaction_Context) as Transaction_Context_Type;
  const { Option } = Select;
  const { pagination, transactions } = state
  const handlePageChange = (page: number) => {
    getAllTransaction(page)
  }
  const dataTable = transactions.map((item: Ttransaction, index: number) => (
    {
      ...item,
      key: index + 1
    }
  ))
  const columns: TableColumnsType<Ttransaction> = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
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
      width: 160,
      render: (course: { title: string }) => {
        return course.title
      }
    },
    {
      title: "Giảng viên",
      dataIndex: "course",
      key: "course",
      ellipsis: true,
      render: (course: { teacher: string }) => {
        return course.teacher
      },
      align: "center",
      width: 150
    },
    {
      title: "Học viên",
      dataIndex: "student",
      key: "student",
      ellipsis: true,
      align: "center",
      width: 150
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_price",
      key: "total_price",
      ellipsis: true,
      align: "center",
      width: 110
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
      width: 130
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
      width: 130
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
            style={{ width: 140 }}
          >
            <Option value={0}>Đã hủy</Option>
            <Option value={1}>Chờ thanh toán</Option>
            <Option value={2}>Đã thanh toán</Option>
          </Select>
        )
      },
      align: "center",
      width: 150
    },
  ];

  return (
    <>
      <div>
        <div className={`${styles['heading']}  text-2xl font-bold mb-6`}>
          <h3>Lịch sử giao dịch</h3>
        </div>
        {transactions.length > 0 ? (
          <div>
            <Table
              columns={columns}
              dataSource={dataTable}
              rowKey="id"
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
          </div>) :
          (<Empty description="Không có lịch sử giao dịch nào" />)
        }
      </div>
    </>
  );
}

export default Histories_Transaction;
