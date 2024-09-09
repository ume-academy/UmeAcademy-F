import Card_Payment_History from './Card_Payment_History';
import styles from './Payment_History.module.scss';


const Payment_History = () => {
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
      <Card_Payment_History />
    </div>
  )
}

export default Payment_History;
