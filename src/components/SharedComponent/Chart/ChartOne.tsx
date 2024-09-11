import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import type { TimeRangePickerProps } from 'antd';
import { ConfigProvider, DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import locale from 'antd/locale/vi_VN'
import 'dayjs/locale/vi'


// <===== PHẦN THỐNG LỊCH =====>


dayjs.locale('vi')

const { RangePicker } = DatePicker;

dayjs.locale('vi') // Cấu hình đưa lịch về tiếng việt

const onChange = (date: Dayjs) => {
  if (date) {
    console.log('Date: ', date);
  } else {
    console.log('Clear');
  }
};

const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
  if (dates) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  } else {
    console.log('Clear');
  }
};

const rangePresets: TimeRangePickerProps['presets'] = [
  { label: '7 ngày qua', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: '14 ngày qua', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: '30 ngày qua', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: '90 ngày qua', value: [dayjs().add(-90, 'd'), dayjs()] },
];


// Chart thống kê doanh thu
const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
          width: '100%'
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
          width: '100%'
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Thg 1',
      'Thg 2',
      'Thg 3',
      'Thg 4',
      'Thg 5',
      'Thg 6',
      'Thg 7',
      'Thg 8',
      'Thg 9',
      'Thg 10',
      'Thg 11',
      'Thg 12',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = () => {
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Khóa học',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
      },

      {
        name: 'Học viên',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
      },
    ],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <h2 className='font-bold text-[20px] uppercase mb-4'>biểu đồ doanh thu</h2>
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <div className="w-full">
              <p className=" text-primary text-[20px] font-bold mb-2">30</p>
              <p className="text-[12px] font-normal text-[#5A607F]">Tổng người mua 5/8/2024</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <div className="w-full">
              <p className=" text-primary text-[20px] font-bold mb-2">30</p>
              <p className="text-[12px] font-normal text-[#5A607F]">Tổng người mua 5/8/2024</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-67 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
          <Space direction="vertical" size={12}>
            <ConfigProvider locale={locale}>
            <RangePicker 
                presets={rangePresets} 
                onChange={onRangeChange}  
                format={'DD-MM-YYYY'}
            />
            </ConfigProvider>
          </Space>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5 w-[100%] overflow-hidden">
          <ReactApexChart
            key={Math.random()}
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
