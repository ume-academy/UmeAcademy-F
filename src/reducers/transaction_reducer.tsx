import { Ttransaction } from "../interface/Ttransaction"

interface State {
    transactions: Ttransaction[]
}
export type Action =
    | {
        type: "SET_TRANSACTIONS";
        payload: Ttransaction[];
    } | {
        type: "UPDATE_TRANSACTION_STATUS";
        payload: { id: number; status: number };
    }

export const transaction_reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "SET_TRANSACTIONS":
            return {
                ...state,
                transactions: action.payload
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

        default:
            return state
    }
}
