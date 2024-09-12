import { useEffect, useState } from 'react';
import TableTop5DashBoard from '../../../components/SharedComponent/TableTop5DashBoard/TableTop5DashBoard';
import ChartOne from '../../../components/SharedComponent/Chart/ChartOne';
import CardDataStatsDashBoard from './../../../components/SharedComponent/CardDataStatsDashBoard/CardDataStatsDashBoard';
import { DollarOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

interface Props {
    
}

const Dashboard = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    
        useEffect(() => {
            setTimeout(() => setLoading(false), 100000)
        },[])

    return (
        <>
      {/* Card báo cáo tổng hợp Price-Course-Student */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-3">
        <CardDataStatsDashBoard
          title="tổng số danh thu"
          total="$3.456K"
          rate="0.43%"
          levelDown
        >
        <DollarOutlined  style={{fontSize: 22, color: '#1E5EFF'}} />
        </CardDataStatsDashBoard>

        <CardDataStatsDashBoard
          title="Tổng khóa học"
          total="$45,2K"
          rate="4.35%"
          levelUp
        >
          <ShoppingCartOutlined style={{fontSize: 22, color: '#1E5EFF'}}/>
            
        </CardDataStatsDashBoard>

        <CardDataStatsDashBoard
          title="Tổng học viên"
          total="2.450"
          rate="2.59%"
          levelUp
        >
          <UserOutlined style={{fontSize: 22, color: '#1E5EFF'}}/>
        </CardDataStatsDashBoard>
      </div>

      {/*Chart Thống kê  */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
      </div>

      {/* Table thống kê */}
      <div className=" mt-[24px] px-6 pt-6 border-[1px] border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-8">
        <TableTop5DashBoard />
      </div>
    </>
    )
}

export default Dashboard
