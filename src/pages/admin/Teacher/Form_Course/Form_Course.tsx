import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Image, Input, TreeSelect, Upload } from 'antd';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { CourseContext, CourseContextType } from '../../../../contexts/course_context';
import { LevelContext, LevelContextType } from '../../../../contexts/level_context';
import { Tcourse } from '../../../../interface/Tcourse';
import { LanguageContext, LanguageContextType } from './../../../../contexts/language_context';
import styles from './form_course.module.scss';

const Form_Course_Admin = () => {
    const {level} = useContext(LevelContext) as LevelContextType //Context level
    const {language} = useContext(LanguageContext) as LanguageContextType //Context language
    const {handleForm} = useContext(CourseContext) as CourseContextType //Context language
    const { TreeNode } = TreeSelect; 
    const {id} = useParams() //lấy params từ trên url

    const {register, handleSubmit, control, reset, formState: {errors}} = useForm<Tcourse>({
        defaultValues: {
          thumbnail: null, // Khởi tạo giá trị mặc định của fileList thuộc upload file antd là mảng rỗng 
        },
    })

    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null) // set ảnh khi upload lên đưa vào preview

    const onsubmit = (data: Tcourse) => {
        handleForm(data)
    }

    return (
        <form onSubmit={handleSubmit(onsubmit)} className={`${styles['container']} p-5`}>
            <div className="flex justify-between items-center mb-10">
                <h1 className={`${styles['title']}`}>{id ? "Cập nhật khóa học" : "Thêm mới khóa học"}</h1>
            </div>
            <div className='flex items-center gap-5'>
                <div>
                    <img src="" alt="Avatar" className='w-[100px] h-[100px] border-2 rounded-full' />
                </div>
                <div>
                    <div className='flex justify-center items-center gap-4'>
                        <p className='text-[20px] font-semibold'>DaddyGiao</p>
                        <p className={`font-bold  text-[11px] rounded-[6px] border border-[#CCDDF9]  bg-[#EAF1FF]  text-[#0058FA] w-[56px] p-1 text-center`}>Teacher</p>
                    </div>
                    <p className='text-[#74777F]'>giaothot2004@gmail.com</p>
                </div>
            </div>
            <div className="flex gap-10 mt-10">
                <div className="w-1/2">
                    <div className="flex flex-col gap-2 mb-5">
                        <label>Tên khóa học</label>
                        <Controller
                            name="title"
                            control={control}  // 'control' phải được khai báo từ useForm()
                            render={({ field }) => (
                            <Input 
                                className="h-[70px] border border-black rounded-[8px] text-[22px]" 
                                {...field}  //field gán các thuộc tính cần thiết cho Input
                            />
                            )}
                        />
                    </div>
                    <div>
                        <label>Upload ảnh</label>
                        <div className="w-[450px] h-auto mt-4">
                            <Controller 
                                name='thumbnail'
                                control={ control }
                                render={({ field }) => (
                                    <Upload.Dragger
                                        name="file"
                                        listType="picture"
                                        fileList={field.value ? [field.value] : []}  // Nếu có tệp nào đã được chọn, nó sẽ hiển thị tệp đó trong danh sách. Nếu không, danh sách sẽ trống [].
                                        onChange={({ fileList }) => {

                                            // Lấy file đã upload
                                            const file = fileList[0]; //Lấy tệp đầu tiên trong danh sách tệp mà người dùng đã upload.
                                            field.onChange(file);

                                            // Kiểm tra nếu file.originFileObj tồn tại
                                            if (file && file.originFileObj) {
                                                // Tạo preview URL cho file
                                                // Sử dụng URL.createObjectURL để tạo một đường dẫn tạm thời cho tệp hình ảnh mà người dùng vừa chọn. Đường dẫn này sẽ được dùng để hiển thị ảnh.
                                                const previewUrl = URL.createObjectURL(file.originFileObj); 
                                                setThumbnailPreview(previewUrl); // Cập nhật trạng thái thumbnailPreview với URL mới
                                            } else {
                                                // Nếu không có file, xóa preview tức là set bằng null
                                                setThumbnailPreview(null);
                                            }
                                        }} 
                                        maxCount={1}
                                        beforeUpload={() => false} // ngăn tự động tải lên
                                    >
                                        <div className='p-5'>   
                                            <p className="pb-4">
                                                <CloudUploadOutlined className="text-[60px] text-[#C67D39]" />
                                            </p>
                                            <b className="text-[16px] ">Drag & drop files or <span className='text-[#C67D39] underline'>Browse</span></b>
                                            <p className='text-[12px] text-[#676767] pt-4'>Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</p>
                                        </div>
                                    </Upload.Dragger>
                                )}
                            />
                        </div>
                    </div>
                    {thumbnailPreview && (
                            <div className={`${styles['thumbnail-upload']} w-[125px] h-[155px] mt-10`}>
                            <label className={` ${styles['thumbnail-label']} mb-2`}>Preview</label>
                            <Image
                                className='border-[1px] rounded-sm'
                                src={thumbnailPreview} // Sử dụng URL preview để hiển thị ảnh
                                width={300}
                                height={"auto"}
                            />
                            </div>
                        )}
                </div>
                <div className="w-1/2 space-y-6">
                    <div className="flex flex-col gap-2">
                        <label>Mô tả khóa học</label>
                        <Controller
                            name='description'
                            control={ control }
                            render={({ field }) => (
                                <textarea className="border border-black rounded-[8px] h-[70px] p-2" {...field}/>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label>Trình độ</label>
                        <Controller 
                            name='level_id'
                            control={ control }
                            render={({ field }) => (
                                <TreeSelect
                                    showSearch
                                    className="w-1/2 h-[70px] border border-black rounded-[8px]"
                                    defaultValue="Vui lòng chọn --"
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    value={field.value}
                                    onChange={field.onChange}
                                    filterTreeNode={(input, treeNode) =>
                                        treeNode?.props?.title?.toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    {level.map((item) => (
                                        <TreeNode key={item.id} value={item.id} title={item.name} {...register('level_id')}/>
                                    ))}
                                </TreeSelect>
                            )}
                        />
                        
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label>Ngôn ngữ</label>
                        < Controller 
                            name='language_id'
                            control={ control }
                            render={({ field }) => (
                                <TreeSelect
                                    showSearch
                                    className="w-1/2 h-[70px] border border-black rounded-[8px]"
                                    defaultValue="Vui lòng chọn --"
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    value={field.value}
                                    onChange={field.onChange}
                                    filterTreeNode={(input, treeNode) => 
                                        treeNode?.props?.title?.toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    {language.map((item) => (
                                        <TreeNode key={item.id} value={item.id} title={item.name} />
                                    ))}
                                </TreeSelect>
                            )}
                        />
                        
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label>Giá tiền</label>
                        <Controller
                            name='old_price'
                            control={ control }
                            render={({field}) => (
                                <Input type='number' className="h-[70px] border border-black rounded-[8px]" {...field}/>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label>Trạng thái</label>
                        <Controller 
                            name='status'
                            control={ control }
                            render={({ field }) => (
                                <TreeSelect
                                    // showSearch
                                    className="w-1/2 h-[70px] border border-black rounded-[8px]"
                                    defaultValue="Vui lòng chọn --"
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    // value={field.value}
                                    onChange={field.onChange}
                                    filterTreeNode={(input, treeNode) =>
                                        treeNode?.props?.title?.toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    <TreeNode value={1} title="Hoạt động" />
                                    <TreeNode value={0} title="Ngừng hoạt động" />
                                </TreeSelect>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label>Danh Mục</label>
                        <Controller 
                            name='category_id'
                            control={ control }
                            render={({ field }) => (
                                <TreeSelect
                                    showSearch
                                    className="w-1/2 h-[70px] border border-black rounded-[8px]"
                                    // value={field.value}
                                    style={{ width: '100%' }} 
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                >
                                    <TreeNode value={9} title="Khóa học làm mẹ thiên hạ, bố thiên nhiên" />
                                    <TreeNode value={5} title="Khóa học giàu tình cảm" />
                                    <TreeNode value={7} title="Khóa học làm súc vật" />


                                </TreeSelect>
                            )}
                        />
                        <input type="text" value={1} hidden {...register('user_id')} />
                        <input type="text" value={5} hidden {...register('category_id')} />
                        <input type="text" value={1} hidden {...register('status')} />



                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-30">
                <Button htmlType='submit' className={`${styles['btn']} w-[264px] h-[70px]`}>Lưu</Button>
            </div>
        </form>
    );
};

export default Form_Course_Admin;
