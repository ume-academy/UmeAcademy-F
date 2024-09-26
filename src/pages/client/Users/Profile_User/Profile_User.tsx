import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useContext, useEffect } from 'react';
import { UserContext, UserContextType } from '../../../../contexts/user_context';
import styles from './profile_user.module.scss';

const Profile_User = () => {
    const { state, updateUserByClient, getUserById } = useContext(UserContext) as UserContextType;
    const [form] = Form.useForm();
    const id = 2;

    useEffect(() => {
        if (id) {
            getUserById(+id);
        }
    }, [id]);

    useEffect(() => {
        if (id && state.users.length) {
            const user = state.users.find(u => u.id === +id)
            if (user) {
                form.setFieldsValue(user);
            }
        }
    }, [id, state.users, form]);

    const onFinish = (data: any) => {
        updateUserByClient({ ...data, id });
    };

    return (
        <>
            <div className={`${styles['heading']} flex justify-center items-center mb-6`} style={{ flex: '0 0 20%' }}>
                <h3 className='font-semibold text-xl'>Thông tin hồ sơ</h3>
            </div>

            <div className={`${styles['content']} h-full py-16`}>
                <Form
                    form={form}
                    onFinish={onFinish}
                >
                    <div className="flex flex-col justify-center items-center space-y-6">
                        <Form.Item
                            className={`${styles['formGroup']} `}
                            name='email'
                            rules={[
                                { required: true, message: 'Không được bỏ trống!' },
                                { type: 'email', message: 'Email không hợp lệ!' }
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined className='pr-2' />}
                                placeholder='Địa chỉ Email'
                                className={`${styles['inputForm']} py-2`}
                            />
                        </Form.Item>

                        <Form.Item
                            className={`${styles['formGroup']} `}
                            name='fullname'
                            rules={[
                                { required: true, message: 'Không được bỏ trống!' },
                                { max: 25, message: 'Tên người dùng không được phép vượt quá 25 ký tự!' }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className='pr-2' />}
                                placeholder='Tên người dùng'
                                className={`${styles['inputForm']} py-2`}
                            />
                        </Form.Item>

                        <Form.Item
                            className={`${styles['formGroup']} `}
                            name='password'
                            rules={[
                                { required: true, message: 'Không được bỏ trống!' },
                                { min: 8, message: 'Mật khẩu phải có độ dài ít nhất từ 8 ký tự trở lên!' }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className='pr-2' />}
                                placeholder='Mật khẩu'
                                type='password'
                                className={`${styles['inputForm']} py-2`}
                                visibilityToggle={true}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button className='bg-[#C67D39] text-white p-6' htmlType='submit'>
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default Profile_User;
