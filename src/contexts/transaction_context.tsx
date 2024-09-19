import { createContext, Dispatch, useEffect, useReducer, ReactNode } from "react";
import { Ttransaction } from "../interface/Ttransaction";
import { Action, transaction_reducer } from "../reducers/transaction_reducer";
import instance from "../api";
import { message } from "antd";

export interface Transaction_Context_Type {
    state: { transactions: Ttransaction[] }
    dispatch: Dispatch<Action>
    getTransactionById: (id: number) => void
    updateTransactionStatus: (id: number, status: number) => void
}

export const Transaction_Context = createContext<Transaction_Context_Type | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(transaction_reducer, { transactions: [] });

    useEffect(() => {
        getAllTransaction();
    }, []);

    const getAllTransaction = async () => {
        try {
            const res = await instance.get('transactions');
            dispatch({ type: "SET_TRANSACTIONS", payload: res.data.data });
        } catch (error) {
            console.log(error);
        }
    };
    const getTransactionById = async (id: number) => {
        try {
            const res = await instance.get(`/users/${id}/transaction-histories`);
            dispatch({ type: "SET_TRANSACTIONS", payload: res.data.data });
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
        <Transaction_Context.Provider value={{ state, dispatch, getTransactionById, updateTransactionStatus }}>
            {children}
        </Transaction_Context.Provider>
    );
};
