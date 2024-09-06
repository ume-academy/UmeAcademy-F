import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import styles from './register.module.scss'
import bannerRegister from '../../../assets/images/client/Regitser/banner-register.jpg'
import google from '../../../assets/images/client/Regitser/google.png'

const Register = () => {
    return (
        <div className=" flex flex-wrap justify-between  mt-18 p-5">
            <div className="max-w-[364px] w-full ml-[300px]">
                <p className='text-center font-bold text-[30px] mb-10'>Đăng ký</p>
                <form action="" className=" text-center space-y-14">
                    <div className='space-y-6'>
                        <div className="relative">
                            <MailOutlined className={`${styles['icon']}`} />
                            <input type="email" placeholder="Email" className={`${styles['input']} placeholder:text-[12px] placeholder:text-black`} />
                        </div>
                        <div className="relative">
                            <UserOutlined className={`${styles['icon']}`} />
                            <input type="text" placeholder="Fullname" className={`${styles['input']} placeholder:text-[12px] placeholder:text-black`} />
                        </div>
                        <div className="relative">
                            <LockOutlined className={`${styles['icon']}`} />
                            <input type="password" placeholder="Password" className={`${styles['input']} placeholder:text-[12px] placeholder:text-black`} />
                        </div>
                    </div>
                    <div className='space-y-8 text-[16px]'>
                        <button type="submit" className={`${styles['btn']} shadow-xl`}>Đăng ký</button>
                        <p className="text-center  text-[#525252]">Register with Others</p>
                        <button className="w-full py-2 bg-gray-100 flex items-center justify-center border border-gray rounded-[16px] hover:border-black">
                            <img src={google} alt="Google Icon" className="mr-2" />
                            <span className='text-[12px]'>Đăng nhập với <b>Google</b></span>
                        </button>
                        <p className="text-center mt-4 text-[#525252]">
                            <span>Bạn đã có tài khoản?</span> <a href="/login" className="text-[#C67D39] hover:underline font-bold">Đăng nhập ngay</a>
                        </p>
                    </div>
                </form>
            </div>
            <div>
                <img src={bannerRegister} alt="Register Banner" width="500" />
            </div>
        </div>
    )
}

export default Register