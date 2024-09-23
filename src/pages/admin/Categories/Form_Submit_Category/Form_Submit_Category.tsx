import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CategoryContext } from '../../../../contexts/category_context';

const Form_Submit_Category = () => {

    const { state, handleSubmitForm, getOneCategory } = useContext(CategoryContext);

    const [form] = Form.useForm();
    const { id } = useParams();

    const onFinish = (data: any) => {
        // console.log(data);
        handleSubmitForm(id ? { ...data, id } : data);
    }

    // API GET ONE
    useEffect(() => {
        if (id) {
            getOneCategory(+id); //**  thêm + trước id để convert string -> number
        }
    }, [id]);

    // Đổ data vào form
    useEffect(() => {
        if (id && state.category) {
            form.setFieldsValue(state.category); // Cập nhật giá trị của form
        }
    }, [id, state.category, form]);

    // console.log(state.category)

    return (
        <>
            <div className="heading mb-6 flex justify-between items-center">
                <h3 className='font-semibold text-xl text-[#C67D39]'>{id ? 'Cập nhật danh mục' : 'Thêm mới danh mục'}</h3>

                <Button className='bg-[#C67D39] text-white'>
                    <Link to={'/admin/categories'} className='space-x-2'>
                        <ArrowLeftOutlined className='pr-2' />
                        Quay lại
                    </Link>
                </Button>
            </div>

            <div className="content">
                <Form
                    form={form}
                    onFinish={onFinish}
                >
                    <div className="min-w-full flex flex-col justify-center items-center">
                        <div className="w-full">
                            <Form.Item name='name' rules={[
                                { required: true, message: 'Không được bỏ trống!' }
                            ]}>
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

export default Form_Submit_Category