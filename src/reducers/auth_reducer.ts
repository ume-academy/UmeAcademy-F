import { Tauth } from "../interface/auth"

type State = {
    account: Tauth
}

type Action = {
    type: string,
    payload: any
}

const authReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'AUTH_REGISTER':
            return {
                ...state,
                account: action.payload
            }

        case 'AUTH_LOGIN':
            return {
                ...state,
                account: action.payload
            }

        default:
            return state
    }
}

export default authReducer;