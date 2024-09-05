import { useState } from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";

const Card = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex flex-wrap justify-center mt-10 gap-8">
            <div className="w-[289px] h-[449px] rounded-lg hover:shadow-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:translate-y-[-7px] cursor-pointer">
                <div className="bg-[#D9D9D9] h-[210px] text-[18px] flex items-center font-bold justify-center">
                    Banner
                </div>
                <div className="p-4 space-y-8">
                    <div>
                        <p className="text-[20px] font-bold text-[#0A4A4A]">Business Analyst</p>
                        <p className="text-[16px] font-bold">Duration : 25mins</p>
                        <div className="flex items-center text-[16px]">
                            <del className="text-[#868686] font-bold">$15.90</del>
                            <i className="text-[#CC0000] ml-2">*Free</i>
                        </div>
                    </div>
                    <div className="flex items-center ">
                        <div className="flex text-yellow-400">
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                            <StarOutlined />
                        </div>
                        <i className="text-xs text-[#868686] ml-2">(43,435)</i>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className={`w-[133px] h-[40px] rounded-[5px] font-bold text-[16px] border-2 ${isHovered ? 'bg-[#C67D39] text-white border-transparent' : 'border-2-[#178C8C] text-[#178C8C]'}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {isHovered ? "MUA NGAY" : "Enroll Now"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-[289px] h-[449px] rounded-lg hover:shadow-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:translate-y-[-7px] cursor-pointer">
                <div className="bg-[#D9D9D9] h-[210px] text-[18px] flex items-center font-bold justify-center">
                    Banner
                </div>
                <div className="p-4 space-y-8">
                    <div>
                        <p className="text-[20px] font-bold text-[#0A4A4A]">Business Analyst</p>
                        <p className="text-[16px] font-bold">Duration : 25mins</p>
                        <div className="flex items-center text-[16px]">
                            <del className="text-[#868686] font-bold">$15.90</del>
                        </div>
                    </div>
                    <div className="flex items-center ">
                        <div className="flex text-yellow-400">
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                            <StarOutlined />
                        </div>
                        <i className="text-xs text-[#868686] ml-2">(43,435)</i>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className={`w-[133px] h-[40px] rounded-[5px] font-bold text-[16px] border-2 ${isHovered ? 'bg-[#C67D39] text-white border-transparent' : 'border-2-[#178C8C] text-[#178C8C]'}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {isHovered ? "MUA NGAY" : "Enroll Now"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-[289px] h-[449px] rounded-lg hover:shadow-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:translate-y-[-7px] cursor-pointer">
                <div className="bg-[#D9D9D9] h-[210px] text-[18px] flex items-center font-bold justify-center">
                    Banner
                </div>
                <div className="p-4 space-y-8">
                    <div>
                        <p className="text-[20px] font-bold text-[#0A4A4A]">Business Analyst</p>
                        <p className="text-[16px] font-bold">Duration : 25mins</p>
                        <div className="flex items-center text-[16px]">
                            <p className="text-[#CC0000] font-bold">$15.90</p>
                        </div>
                    </div>
                    <div className="flex items-center ">
                        <div className="flex text-yellow-400">
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                            <StarOutlined />
                        </div>
                        <i className="text-xs text-[#868686] ml-2">(43,435)</i>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className={`w-[133px] h-[40px] rounded-[5px] font-bold text-[16px] border-2 ${isHovered ? 'bg-[#C67D39] text-white border-transparent' : 'border-2-[#178C8C] text-[#178C8C]'}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {isHovered ? "MUA NGAY" : "Enroll Now"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-[289px] h-[449px] rounded-lg hover:shadow-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:translate-y-[-7px] cursor-pointer">
                <div className="bg-[#D9D9D9] h-[210px] text-[18px] flex items-center font-bold justify-center">
                    Banner
                </div>
                <div className="p-4 space-y-8">
                    <div>
                        <p className="text-[20px] font-bold text-[#0A4A4A]">Business Analyst</p>
                        <p className="text-[16px] font-bold">Duration : 25mins</p>
                        <div className="flex items-center text-[16px]">
                            <p className="text-[#CC0000] font-bold">$15.90</p>
                        </div>
                    </div>
                    <div className="flex items-center ">
                        <div className="flex text-yellow-400">
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                            <StarOutlined />
                        </div>
                        <i className="text-xs text-[#868686] ml-2">(43,435)</i>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className={`w-[133px] h-[40px] rounded-[5px] font-bold text-[16px] border-2 ${isHovered ? 'bg-[#C67D39] text-white border-transparent' : 'border-2-[#178C8C] text-[#178C8C]'}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {isHovered ? "MUA NGAY" : "Enroll Now"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
