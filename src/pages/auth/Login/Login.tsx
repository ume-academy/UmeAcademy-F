import React from 'react'
import banner from '../../../assets/images/client/LoginPage/banner_login.jpg';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';
import { GoogleOutlined } from '@ant-design/icons';

// images
import userIcon from '../../../assets/images/client/LoginPage/icon_user.png';
import lockIcon from '../../../assets/images/client/LoginPage/icon_lock.png';
import googleLogo from '../../../assets/images/client/LoginPage/google_logo.png';


type Props = {}

const Login = (props: Props) => {
    return (
        <>
            <div className="">
                <div className="container mx-auto">
                    <div className="flex space-x-9">
                        <div className="left flex flex-col flex-1 justify-center items-center space-y-7">
                            <div className="heading font-bold text-3xl">
                                ĐĂNG NHẬP
                            </div>

                            <div className="text-center space-y-4">
                                <p>
                                    Hãy đăng nhập ngay vào <b>UmeAcademy</b>
                                </p>
                                <p>
                                    Để cập nhật và nhận ngay thêm nhiều bài giảng bổ ích
                                </p>
                            </div>

                            {/* Form inputs*/}

                            <form className=' space-y-4'>
                                <div className={styles['form']}>
                                    <div className={styles['fromGroup']}>
                                        <input type="text" placeholder='Tên đăng nhập' className='rounded-2xl' />
                                        <img src={userIcon} alt="" />
                                    </div>

                                    <div className={styles['fromGroup']}>
                                        <input type="password" placeholder='Mật khẩu' className='rounded-2xl' />
                                        <img src={lockIcon} alt="" />
                                    </div>

                                    <div className={styles['btnGroup']}>
                                        <button className='rounded-2xl'>Đăng nhập</button>
                                    </div>
                                </div>
                            </form>

                            <div className={styles['hr']}>
                                <div className={styles['line']}>
                                    <hr />
                                    <p><b>Login </b> with Others</p>

                                </div>
                                {/* <div className={styles['text']}>
                                </div> */}
                            </div>

                            {/* Login with Google */}
                            <div className={styles['loginOthers']}>
                                <button className='rounded-2xl border border-[#F0EDFF] py-3'>
                                    <img src={googleLogo} alt="" />
                                    <p>Đăng nhập với <b>Google</b></p> 
                                </button>
                            </div>

                            <div className="">
                                <p>Bạn chưa có tài khoản? <Link to={''} className='text-[#C67D39] font-bold'>Đăng ký ngay</Link></p>
                            </div>
                        </div>
                        <div className="right flex flex-1">
                            <img src={banner} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login