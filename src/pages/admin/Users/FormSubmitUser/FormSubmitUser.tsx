import { ArrowLeftOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import { useParams } from 'react-router-dom';
import styles from './formsubmituser.module.scss';

const FormSubmitUser = () => {

    const [form] = Form.useForm();
    const { id } = useParams();

    
    const onFinish = (data: any) => {
        console.log(data)
    }

    return (
        <>
            <div className={`${styles['heading']} flex justify-between items-center mb-6`} style={{ flex: '0 0 20%' }}>
                <h3 className='font-semibold text-xl'>{id ? 'Cập nhật người dùng' : 'Thêm mới người dùng'}</h3>

                <div className="">
                    <Button className='bg-[#C67D39] text-white' href='/admin/list_users'>
                        <ArrowLeftOutlined />
                        Quay lại
                    </Button>
                </div>
            </div>

            <div className={`${styles['content']} h-full py-16 `} >
                <Form
                    form={form}
                    // initialValues={} //** Fill data
                    onFinish={onFinish} //** Submit form
                    // disabled={componentDisabled} 
                >
                    <div className="flex flex-col justify-center items-center space-y-6">
                        {/* Email */}
                        <Form.Item
                            className={`${styles['formGroup']} `}
                            // name
                            name='email'
                            // Validate
                            rules={[
                                { required: true, message: 'Không được bỏ trống!'},
                                { type: 'email', message: 'Email không hợp lệ!' }
                            ]}
                        >
                            <Input
                                // icon
                                prefix={<MailOutlined className='pr-2' />}
                                placeholder='Địa chỉ Email'
                                className={`${styles['inputForm']} py-2`}
                            />
                        </Form.Item>

                        {/* Username */}
                        <Form.Item
                            className={`${styles['formGroup']} `}
                            //name
                            name='username'
                            // Validate
                            rules={[
                                { required: true, message: 'Không được bỏ trống!'},
                                { max: 2, message: 'Tên người dùng không được phép vượt quá 25 ký tự!' }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className='pr-2' />}
                                placeholder='Tên người dùng'
                                className={`${styles['inputForm']} py-2`}
                            />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            className={`${styles['formGroup']} `}
                            // name
                            name='password'
                            // Validate
                            rules={[
                                { required: true, message: 'Không được bỏ trống!'},
                                { min: 6, message: 'Mật khẩu phải có độ dài ít nhất từ 6 ký tự trở lên!' },
                                { max: 12, message: 'Mật khẩu không được phép vượt quá 12 ký tự!' }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className='pr-2' />}
                                placeholder='Mật khẩu'
                                type='password'
                                className={`${styles['inputForm']} py-2`}
                            />
                        </Form.Item>

                        {/* Role */}
                        <Form.Item
                            className={`${styles['formGroup']} `}
                            // Name
                            name='role'
                            // Validate
                            rules={[
                                { required: true, message: 'Không được bỏ trống!'},
                            ]}
                        >
                            <Select
                                defaultValue="Phân quyền người dùng" // Giá trị mặc định
                                options={[
                                    { value: 'client', label: 'Khách hàng' },
                                    { value: 'teacher', label: 'Giảng viên' },
                                    { value: 'admin', label: 'Quản trị viên' },
                                ]}
                                className='h-10'
                            />
                        </Form.Item>

                        {/* Status */}
                        <Form.Item
                            className={`${styles['formGroup']} `}
                            // Name
                            name='status'
                            // Validate
                            rules={[
                                { required: true, message: 'Không được bỏ trống!'},
                            ]}
                        >
                            <Select
                                defaultValue="Trạng thái" // Giá trị mặc định
                                options={[
                                    { value: 'jack', label: 'Jack' },
                                    { value: 'lucy', label: 'Lucy' },
                                    { value: 'Yiminghe', label: 'yiminghe' },
                                ]}
                                className='h-10'
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button className='bg-[#C67D39] text-white p-6' htmlType='submit'>{id ? 'Cập nhật' : 'Thêm mới'}</Button>
                        </Form.Item>

                    </div>
                </Form>
            </div >
        </>
    )
}

export default FormSubmitUser