import { Link } from 'react-router-dom';
import styles from './Register.module.scss';
import { Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { Tauth } from '../../../interface/auth';

// images
import { bannerRegister, google } from '../../../contants/client';
//icon
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth_context';
import { zodResolver } from '@hookform/resolvers/zod';
import authValidation from '../../../validation/authValidation';

const Register = () => {

    const { state, authRegister } = useContext(AuthContext)

    const { control, handleSubmit, reset, formState: { errors } } = useForm<Tauth>({
        resolver: zodResolver(authValidation)
    });

    const onSubmit = (data: Tauth) => {
        // console.log(data)

        authRegister(data)

        // reset form sau khi đăng ký
        reset();
    }

    return (
        <>
            <div className={`${styles['wrapper']} flex justify-center items-center min-h-screen`}>
                <div className="">
                    <div className="flex space-x-9 ">
                        <div className="left flex flex-col flex-1 justify-center items-center space-y-7 ">

                            <div className="heading font-bold text-3xl uppercase">
                                Đăng ký
                            </div>

                            {/* Form inputs*/}
                            <Form onFinish={handleSubmit(onSubmit)} className='space-y-4 px-15'>
                                <div className={styles['form']}>

                                    {/* Fullname */}
                                    <div className="">
                                        <div className="relative">
                                            <Form.Item className={`${styles['fromGroup']} m-0 p-0`} >
                                                <Controller
                                                    name='fullname'
                                                    control={control}
                                                    render={({ field }) => (
                                                        <div >
                                                            <Input
                                                                placeholder="Tên hiển thị"
                                                                className="rounded-2xl pr-10"
                                                                {...field}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                            </Form.Item>

                                            <UserOutlined className={`${styles['icon']} absolute left-4 top-1/2 transform -translate-y-1/2`} />
                                        </div>

                                        {/* Validate errors */}
                                        <div className="text-red-500 m-0 p-0">
                                            {errors.fullname && <p>{errors.fullname.message}</p>}
                                        </div>
                                    </div>

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
                                        <button className='rounded-2xl'>Đăng ký</button>
                                    </div>
                                </div>
                            </Form>

                            <div className={styles['hr']}>
                                <div className={styles['line']}>
                                    <hr />
                                    <p><b>Hoặc</b></p>
                                </div>
                            </div>
                            {/* Register with Google */}
                            <div className={styles['RegisterOthers']}>
                                <button className=" py-2 bg-gray-100  border border-gray rounded-[16px] hover:border-black">
                                    <img src={google} alt="Google Icon" className="mr-2" />
                                    <span>Đăng ký với <b>Google</b></span>
                                </button>
                            </div>

                            <div className="">
                                <p>Bạn đã có tài khoản? <Link to={'/login'} className='text-[#C67D39] hover:underline font-bold'>Đăng nhập ngay</Link></p>
                            </div>
                        </div>
                        <div className="right flex flex-1">
                            <img src={bannerRegister} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register