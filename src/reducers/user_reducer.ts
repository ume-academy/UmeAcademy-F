import { Tuser } from "./../interface/Tuser";

export interface State {
  users: Tuser[];
  user?: Tuser;
  pagination: {
    currentPage: number;
    pageSize: number;
    total: number;
  };
}

export type Action =
  | {
      type: "SET_USER";
      payload: {
        users: Tuser[];
        meta: { current_page: number; per_page: number; total: number };
      };
    }
  | { type: "GET_USER_BY_ID"; payload: Tuser }
  | { type: "ADD_USER"; payload: Tuser }
  | { type: "UPDATE_USER_BY_ADMIN"; payload: Tuser }
  | {
      type: "UPDATE_USER_BY_CLIENT";
      payload: {
        id: number;
        fullname: string;
        email: string;
        password: string;
      };
    }
  | { type: "REMOVE_USER"; payload: number };

const user_reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        users: action.payload.users,
        pagination: {
          currentPage: action.payload.meta.current_page,
          pageSize: action.payload.meta.per_page,
          total: action.payload.meta.total,
        },
      };

    case "GET_USER_BY_ID":
      return {
        ...state,
        user: action.payload,
      };

    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case "UPDATE_USER_BY_CLIENT":
      return {
        ...state,
        users: state.users.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                fullname: action.payload.fullname,
                email: action.payload.email,
                password: action.payload.password,
              }
            : item
        ),
      };

    case "UPDATE_USER_BY_ADMIN":
      return {
        ...state,
        users: state.users.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default user_reducer;
