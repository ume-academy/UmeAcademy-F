import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const FormSubmitCategory = () => {

    const [form] = Form.useForm();
    const { id } = useParams();


    const onFinish = (data: any) => {
        console.log(data);
    }

    return (
        <>
            <div className="heading mb-6 flex justify-between items-center">
                <h3 className='font-semibold text-xl text-[#C67D39]'>{id ? 'Cập nhật danh mục' : 'Thêm mới danh mục'}</h3>

                <Button className='bg-[#C67D39] text-white'>
                    <Link to={'/admin/categories'} className='space-x-2'>
                        <ArrowLeftOutlined className='pr-2'/>
                        Quay lại
                    </Link>
                </Button>
            </div>

            <div className="content">
                <Form
                    form={form}
                    onFinish={onFinish}
                // initialValues={}
                >
                    <div className="min-w-full flex flex-col justify-center items-center">
                        <div className="w-full">
                            <Form.Item name='title'>
                                <Input className='py-2' placeholder='Điền tên danh mục' />
                            </Form.Item>
                        </div>

                        <div className="">
                            <Form.Item>
                                <Button className='bg-[#C67D39] text-white' htmlType='submit'>{id ? 'Cập nhật danh mục' : 'Thêm mới danh mục'}</Button>
                            </Form.Item>
                        </div>
                    </div>

                </Form>
            </div>
        </>
    )
}

export default FormSubmitCategory