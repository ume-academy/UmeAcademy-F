import React, { createContext, useReducer } from "react";
import authReducer from "../reducers/auth_reducer";
import { Tauth } from "../interface/auth";
import instance from "../api";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export type AuthContextType = {
    state: {
        account: Tauth
    };
    dispatch: React.Dispatch<any>;
    authRegister: (account: Tauth) => void;
    authLogin: (account: Tauth) => void;
    authLogout: () => void;
}

const initialState = {
    account: {}
}

export const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(authReducer, initialState);

    const nav = useNavigate();

    // ! REGISTER
    const authRegister = async (account: Tauth) => {
        try {
            const { data, status } = await instance.post(`auth/register`, account);

            // console.log(data);

            // const { email, fullname } = data.data;

            // dispatch({
            //     type: 'AUTH_REGISTER',
            //     payload: { email, fullname }
            // });

            if (status === 201) {
                message.success('Đăng ký thành công!')
            } else {
                message.error('Đăng ký thất bại!')
            }
        } catch (error: any) {
            console.log(error)

            message.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        }
    }

    // ! LOGIN
    const authLogin = async (account: Tauth) => {
        try {
            const { data, status } = await instance.post(`auth/login`, account);

            console.log(data);

            // const { email, fullname, token } = data.data;

            dispatch({
                type: 'AUTH_LOGIN',
                payload: [account.email, data.token]
            });

            if (status === 200) {
                message.success('Đăng nhập thành công!');

                // redirect
                nav('/');

                // lưu thông tin user vào localstorage
                localStorage.setItem('user', account.email);

                // token
                localStorage.setItem('token', data.token);

            } else {
                message.error('Đăng nhập thất bại! Vui lòng thử lại sau!')
            }
        } catch (error) {
            console.log(error)

            // message.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        }
    }

    // ! LOGOUT
    const authLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        nav('/');

        message.success('Đăng xuất thành công!')
    }


    return (
        <AuthContext.Provider value={{ state, dispatch, authRegister, authLogin, authLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider