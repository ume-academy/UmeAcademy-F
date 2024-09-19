import { Table, TableColumnsType, Empty, Tag } from 'antd';
import styles from './histotiesTransaction.module.scss';
import { Ttransaction } from '../../../interface/Ttransaction';
import { useContext, useEffect } from 'react';
import { Transaction_Context, Transaction_Context_Type } from '../../../contexts/transaction_context';

const Histories_Transaction = () => {
    const { state, getTransactionById } = useContext(Transaction_Context) as Transaction_Context_Type;

    useEffect(() => {
        getTransactionById(2);
    }, [getTransactionById]);

    const columnWidth = 150;
    const columns: TableColumnsType<Ttransaction> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            align: "center",
            width: 60
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
            render: (status) => {
                const statusClasses: { [key: number]: string } = {
                    0: "text-red-500  border-red-500 bg-red-50 ",
                    1: "text-blue-500 border-blue-500 bg-blue-50",
                    2: "text-green-500 border-green-500 bg-green-50",
                };
                const statusLabels: { [key: number]: string } = {
                    0: "Đã Hủy",
                    1: "Chờ thanh toán",
                    2: "Đã thanh toán",
                };
                return (
                    <Tag className={`${statusClasses[status]} font-semibold`}>
                        {statusLabels[status]}
                    </Tag>
                );
            },
            align: "center",
            width: columnWidth
        },
    ];

    return (
        <div>
            <div className={`${styles['heading']} text-2xl font-bold mb-6`}>
                <h3>Lịch sử giao dịch</h3>
            </div>

            {state.transactions.length > 0 ? (
                <Table
                    columns={columns}
                    dataSource={state.transactions}
                    rowKey="id"
                    pagination={{
                        pageSize: 5,
                        total: state.transactions.length,
                    }}
                />
            ) : (
                <Empty description="Không có lịch sử giao dịch nào" />
            )}
        </div>
    );
};

export default Histories_Transaction;
