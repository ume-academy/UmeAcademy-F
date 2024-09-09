import Card_History_Payment from './Card_History_Payment';
import styles from './history_payment.module.scss';

const History_Payment = () => {
  return (
    <div className={`${styles.container} mt-20`}>
      <div className='flex items-center gap-5'>
        <div>
          <img src="" alt="Avatar" className='w-[100px] h-[100px] border-2 rounded-full' />
        </div>
        <div>
          <p className='text-[20px] font-semibold'>DaddyGiao</p>
          <p className='text-[#74777F]'>giaothot2004@gmail.com</p>
        </div>
      </div>
      <Card_History_Payment />
    </div>
  )
}

export default History_Payment;
