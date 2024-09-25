import { Link } from 'react-router-dom';
import styles from './login.module.scss';

// images
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input } from 'antd';
import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { bannerLogin, googleLogo } from '../../../contants/client';
import { AuthContext } from '../../../contexts/auth_context';
import { Tauth } from '../../../interface/auth';
import authValidation from '../../../validation/authValidation';

const Login = () => {

    const { state, dispatch, authLogin } = useContext(AuthContext)
    const { control, handleSubmit, formState: { errors } } = useForm<Tauth>({
        resolver: zodResolver(authValidation)
    });

    const onSubmit = (data: Tauth) => {
        // console.log(data)

        authLogin(data);
    }

    console.log(state.account)

    return (
        <>
            <div className={`${styles['wrapper']} flex justify-center items-center min-h-screen`}>
                <div className="">
                    <div className="flex space-x-9 ">
                        <div className="left flex flex-col flex-1 justify-center items-center space-y-7 ">
                            <div className="heading font-bold text-3xl">
                                ĐĂNG NHẬP
                            </div>

                            {/* <div className="">
                                Xin chào, {state.account.email}
                            </div> */}

                            <div className="text-center space-y-4">
                                <p>
                                    Hãy đăng nhập ngay vào <b>UmeAcademy</b>
                                </p>
                                <p>
                                    Để cập nhật và nhận ngay thêm nhiều bài giảng bổ ích
                                </p>
                            </div>

                            {/* Form inputs*/}
                            <Form onFinish={handleSubmit(onSubmit)} className='space-y-4 px-15'>
                                <div className={styles['form']}>

                                    {/* Email */}
                                    <div className="">
                                        <div className="relative">
                                            <Form.Item className={`${styles['fromGroup']} m-0 p-0`} >
                                                <Controller
                                                    name='email'
                                                    control={control}
                                                    render={({ field }) => (
                                                        <div >
                                                            <Input
                                                                placeholder="Địa chỉ Email"
                                                                className="rounded-2xl pr-10"
                                                                {...field}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                            </Form.Item>

                                            <MailOutlined className={`${styles['icon']} absolute left-4 top-1/2 transform -translate-y-1/2`} />
                                        </div>

                                        {/* Validate errors */}
                                        <div className="text-red-500 m-0 p-0">
                                            {errors.email && <p>{errors.email.message}</p>}
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="">
                                        <div className="relative">
                                            <Form.Item className={`${styles['fromGroup']} m-0 p-0`} >
                                                <Controller
                                                    name='password'
                                                    control={control}
                                                    render={({ field }) => (
                                                        <div >
                                                            <Input
                                                                placeholder="Mật khẩu"
                                                                className="rounded-2xl pr-10"
                                                                type='password'
                                                                {...field}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                            </Form.Item>

                                            <LockOutlined className={`${styles['icon']} absolute left-4 top-1/2 transform -translate-y-1/2`} />
                                        </div>

                                        {/* Validate errors */}
                                        <div className="text-red-500 m-0 p-0">
                                            {errors.password && <p>{errors.password.message}</p>}
                                        </div>
                                    </div>

                                    <div className={styles['btnGroup']}>
                                        <button className='rounded-2xl'>Đăng nhập</button>
                                    </div>
                                </div>
                            </Form>

                            <div className={styles['hr']}>
                                <div className={styles['line']}>
                                    <hr />
                                    <p><b>Login </b> with Others</p>

                                </div>
                            </div>

                            {/* Login with Google */}
                            <div className={styles['loginOthers']}>
                                <button className='rounded-2xl border border-[#F0EDFF] py-3'>
                                    <img src={googleLogo} alt="" />
                                    <p>Đăng nhập với <b>Google</b></p>
                                </button>
                            </div>

                            <div className="">
                                <p>Bạn chưa có tài khoản? <Link to={'/register'} className='text-[#C67D39] font-bold hover:underline'>Đăng ký ngay</Link></p>
                            </div>
                        </div>
                        <div className="right flex flex-1">
                            <img src={bannerLogin} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login