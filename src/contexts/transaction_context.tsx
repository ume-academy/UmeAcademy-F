import { createContext, Dispatch, useEffect, useReducer, ReactNode } from "react";
import { Action, State, transaction_reducer } from "../reducers/transaction_reducer";
import instance from "../api";
import { message } from "antd";

export interface Transaction_Context_Type {
    state: State
    dispatch: Dispatch<Action>
    getTransactionById: (id: number) => void
    updateTransactionStatus: (id: number, status: number) => void
    getAllTransaction: (page: number) => void
}
const initialState: State = {
    transactions: [],
    transaction: undefined,
    pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
    }
};
export const Transaction_Context = createContext<Transaction_Context_Type | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(transaction_reducer, initialState);

    useEffect(() => {
        getAllTransaction();
    }, []);

    const getAllTransaction = async (page: number) => {
        try {
            const res = await instance.get(`transactions?page=${page}`);
            const { data, meta } = res.data
            dispatch({
                type: "SET_TRANSACTIONS", payload: {
                    transactions: data,
                    meta: {
                        current_page: meta.current_page,
                        per_page: meta.per_page,
                        total: meta.total
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
    const getTransactionById = async (id: number) => {
        try {
            const res = await instance.get(`/users/${id}/transaction-histories`);
            dispatch({ type: "GET_TRANSACTION_BY_ID", payload: res.data });
        } catch (error) {
            console.log(error);
        }
    };
    const updateTransactionStatus = async (id: number, status: number) => {
        try {
            const res = await instance.put(`/transactions/${id}`, { status })
            console.log(res)
            dispatch({
                type: "UPDATE_TRANSACTION_STATUS",
                payload: { id, status }
            })
            message.success("Thay đổi trạng thái thành công");
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Transaction_Context.Provider value={{ state, dispatch, getAllTransaction, getTransactionById, updateTransactionStatus }}>
            {children}
        </Transaction_Context.Provider>
    );
};
