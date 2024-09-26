import { Ttransaction } from "../interface/Ttransaction"

export interface State {
    transactions: Ttransaction[],
    transaction?: Ttransaction,
    pagination: {
        currentPage: number,
        pageSize: number,
        total: number
    }
}
export type Action =
    | {
        type: "SET_TRANSACTIONS";
        payload: { transactions: Ttransaction[]; meta: { current_page: number; per_page: number; total: number } };
    } | {
        type: "UPDATE_TRANSACTION_STATUS";
        payload: { id: number; status: number };
    }
    | { type: "GET_TRANSACTION_BY_ID"; payload: Ttransaction }


export const transaction_reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "SET_TRANSACTIONS":
            return {
                ...state,
                transactions: action.payload.transactions,
                pagination: {
                    currentPage: action.payload.meta.current_page,
                    pageSize: action.payload.meta.per_page,
                    total: action.payload.meta.total
                }
            }
        case "UPDATE_TRANSACTION_STATUS":
            return {
                ...state,
                transactions: state.transactions.map(item =>
                    item.id === action.payload.id
                        ? { ...item, status: action.payload.status }
                        : item
                )
            }
            case "GET_TRANSACTION_BY_ID":
                return{
                    ...state,
                    transaction: action.payload
                }

        default:
            return state
    }
}
