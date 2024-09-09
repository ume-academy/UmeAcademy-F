import style from './history_payment.module.scss'

const Card_Payment_History = () => {
    return (
        <div className={`${style["card"]} mt-10`}>
            <div className={`${style["item-card"]} flex justify-between`}>
                <div className='text-[#74777F] space-y-3'>
                    <p className='text-[24px]'>Lập trình Javascript</p>
                    <p>Due date: <span className='text-black font-medium'>Thứ 5 - Ngày 29 tháng 8 năm 2024</span> </p>
                    <p>Code transaction: <span className='text-black font-medium'>67456456458456456</span> </p>

                </div>
                <div className={`${style["success"]} text-center pt-9`}>
                    <p className='text-[24px] font-medium'>10 USD</p>
                    <button className='w-[111px] h-[28px]'>
                        Successully
                    </button>
                </div>
            </div>
            <div className={`${style["item-card"]} flex justify-between`}>
                <div className='text-[#74777F] space-y-3'>
                    <p className='text-[24px]'>Lập trình Javascript</p>
                    <p>Due date: <span className='text-black font-medium'>Thứ 5 - Ngày 29 tháng 8 năm 2024</span> </p>
                    <p>Code transaction: <span className='text-black font-medium'>67456456458456456</span> </p>

                </div>
                <div className={`${style["fail"]} text-center pt-9`}>
                    <p className='text-[24px] font-medium'>10 USD</p>
                    <button className='w-[111px] h-[28px]'>
                        Successully
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card_Payment_History