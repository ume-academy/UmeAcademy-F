import { Tcategory } from "../interface/Tcategory";


export type State = {
    categories: {
        data: Tcategory[];
    };
    category?: Tcategory;
    pagination: {
        currentPage: number;
        pageSize: number;
        total: number;
    };
}

// type Action = {
//     type: string;
//     payload: any;
// }

type Action =
    | { type: 'GET_CATEGORIES'; payload: { data: Tcategory[]; meta: { current_page: number; per_page: number; total: number } } }
    | { type: 'GET_CATEGORY'; payload: Tcategory }
    | { type: 'REMOVE_CATEGORY'; payload: number }
    | { type: 'UPDATE_CATEGORY'; payload: Tcategory }
    | { type: 'CREATE_CATEGORY'; payload: Tcategory };

const categoryReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'GET_CATEGORIES':
            return {
                ...state,
                categories: { data: action.payload.data },
                pagination: {
                    currentPage: action.payload.meta.current_page,
                    pageSize: action.payload.meta.per_page,
                    total: action.payload.meta.total,
                }
            };
        case 'GET_CATEGORY':
            return {
                ...state,
                category: action.payload
            };

        case 'REMOVE_CATEGORY':
            return {
                ...state,
                categories: {
                    data: state.categories.data.filter(item => item.id !== action.payload)
                }
            };

        case 'UPDATE_CATEGORY':
            return {
                ...state,
                categories: {
                    data: state.categories.data.map(item => item.id === action.payload.id ? { ...item, ...action.payload } : item)
                }
            };
        case 'CREATE_CATEGORY':
            return {
                ...state,
                categories: {
                    data: [...state.categories.data, action.payload]
                }
            };

        default:
            return state;
    }
}

export default categoryReducer
