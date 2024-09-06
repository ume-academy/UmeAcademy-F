
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import style from './footer.module.scss'
const Footer = () => {
    return (
        <>
            <footer className={`${style['innerFooter']} py-3`}>
                <div className="container mx-auto">
                    <div className="flex flex-col">
                        <div className="top">
                            {/* Nội dung sau này (nếu cần) */}
                        </div>
                        <div className="
                            bot flex flex-col items-center 
                            sm:flex-row sm:justify-center sm:space-x-2 sm:items-center 
                            md:justify-center 
                            lg:justify-end lg:space-x-4
                        ">
                            <div className="text-white underline font-semibold">
                                Follow us:
                            </div>
                            <ul className='flex space-x-4 items-start'>
                                <li className='rounded-full bg-[#184B4B]'>
                                    <Link to={''}>
                                        <InstagramOutlined
                                            className='text-md p-2 text-white
                                            sm:text-lg 
                                            md:text-xl
                                            lg:text-2xl'
                                        />
                                    </Link>
                                </li>
                                <li className='rounded-full bg-[#184B4B]'>
                                    <Link to={''}>
                                        <FacebookOutlined
                                            className='text-md p-2 text-white
                                            sm:text-lg 
                                            md:text-xl
                                            lg:text-2xl'
                                        />
                                    </Link>
                                </li>
                                <li className='rounded-full bg-[#184B4B]'>
                                    <Link to={''}>
                                        <TwitterOutlined className='text-md p-2 text-white
                                            sm:text-lg 
                                            md:text-xl
                                            lg:text-2xl'  
                                        />
                                    </Link>
                                </li>
                                <li className='rounded-full bg-[#184B4B]'>
                                    <Link to={''}>
                                        <YoutubeOutlined className='text-md p-2 text-white
                                            sm:text-lg 
                                            md:text-xl
                                            lg:text-2xl'  
                                        />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}


export default Footer