import { Link } from 'react-router-dom';
import styles from './Register.module.scss';

// images
import { bannerRegister, google } from '../../../contants/client';
//icon
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

const Register = () => {
    return (
        <>
            <div className={`${styles['wrapper']} flex justify-center items-center min-h-screen`}>
                <div className="">
                    <div className="flex space-x-9 ">
                        <div className="left flex flex-col flex-1 justify-center items-center space-y-7 ">

                            <div className="heading font-bold text-3xl">
                                Đăng ký
                            </div>

                            {/* Form inputs*/}
                            <form className='space-y-4 px-15'>
                                <div className={styles['form']}>
                                    <div className={styles['fromGroup']}>
                                        <input type="text" placeholder='Email' className='rounded-2xl' />
                                        <MailOutlined className={`${styles['icon']}`} />
                                    </div>

                                    <div className={styles['fromGroup']}>
                                        <input type="password" placeholder='Tên đăng nhập' className='rounded-2xl' />
                                        <UserOutlined className={`${styles['icon']}`} />
                                    </div>

                                    <div className={styles['fromGroup']}>
                                        <input type="password" placeholder='Mật khẩu' className='rounded-2xl' />
                                        <LockOutlined className={`${styles['icon']}`} />
                                    </div>

                                    <div className={styles['btnGroup']}>
                                        <button className='rounded-2xl'>Đăng nhập</button>
                                    </div>
                                </div>
                            </form>
                            <div className={styles['hr']}>
                                <div className={styles['line']}>
                                    <hr />
                                    <p><b>Register </b> with Others</p>
                                </div>
                            </div>
                            {/* Register with Google */}
                            <div className={styles['RegisterOthers']}>
                                <button className=" py-2 bg-gray-100  border border-gray rounded-[16px] hover:border-black">
                                    <img src={google} alt="Google Icon" className="mr-2" />
                                    <span>Đăng nhập với <b>Google</b></span>
                                </button>
                            </div>

                            <div className="">
                                <p>Bạn đã có tài khoản? <Link to={''} className='text-[#C67D39] hover:underline font-bold'>Đăng nhập ngay</Link></p>
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