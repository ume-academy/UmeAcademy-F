import { createContext, Dispatch, ReactNode, useEffect, useReducer } from "react";
import { Tuser } from "../interface/Tuser";
import instance from "../api";
import user_reducer, { Action, State } from "../reducers/user_reducer";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export interface UserContextType {
    state: State
    dispatch: Dispatch<Action>
    updateUserByClient: (user: Tuser) => void
    removeUser: (id: number) => void
    handleSubmitForm: (user: Tuser) => void
    getUserById: (id: number) => void
    getAllUser: (page: number) => void
}
const initialState: State = {
    users: [],
    user: undefined,
    pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
    }
};
export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProviver = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(user_reducer, initialState )
    const nav = useNavigate()
    const getAllUser = async (page: number = 1) => {
        try {
            const res = await instance.get(`users?page=${page}`);
            const { data, meta } = res.data;
            dispatch({
                type: "SET_USER",
                payload: {
                    users: data,
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

    useEffect(() => {
        getAllUser()
    }, [])
    const getUserById = async (id: number) => {
        try {
            const res = await instance.get(`users/${id}`)
            dispatch({ type: 'GET_USER_BY_ID', payload: res.data })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitForm = async (user: Tuser) => {
        try {
            if (user.id) {
                const res = await instance.put(`users/${user.id}`, user)
                console.log(res)
                dispatch({ type: 'UPDATE_USER_BY_ADMIN', payload: res.data.data })
                message.success("Cập nhật tài khoản thành công!")
            } else {
                const res = await instance.post('users', user)
                dispatch({ type: 'ADD_USER', payload: res.data.data })
                message.success("Thêm mới tài khoản thành công!")
            }
            nav('/admin/list_user')
            getAllUser()
        } catch (error) {
                    if (user.id) {
                        console.log(error)
                    } else {
                        message.error("Email đã tồn tại!")
                    }
        }
    }
    const updateUserByClient = async (user: Tuser) => {
        try {
            const res = await instance.put(`users/${user.id}`, user)
            console.log(res)
            dispatch({ type: 'UPDATE_USER_BY_CLIENT', payload: { id: user.id, fullname: user.fullname, email: user.email, password: user.password } })
            message.success("Cập nhật tài khoản thành công!")
        } catch (error) {
            console.log(error)
        }
    }

    const removeUser = async (id: number) => {
        try {
            await instance.delete(`users/${id}`)
            dispatch({ type: 'REMOVE_USER', payload: id })
            message.success("Xóa tài khoản thành công!")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <UserContext.Provider value={{ state, dispatch, handleSubmitForm, updateUserByClient, removeUser, getUserById, getAllUser }}>
            {children}
        </UserContext.Provider>
    )
}