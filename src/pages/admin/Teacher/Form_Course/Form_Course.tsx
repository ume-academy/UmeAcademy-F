import { CloudUploadOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Image, Input, TreeSelect, Upload } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import instance from '../../../../api';
import { CourseContext, CourseContextType } from '../../../../contexts/course_context';
import { LevelContext, LevelContextType } from '../../../../contexts/level_context';
import { Tcourse } from '../../../../interface/Tcourse';
import course_schema from '../../../../validation/course_schema';
import { LanguageContext, LanguageContextType } from './../../../../contexts/language_context';
import styles from './form_course.module.scss';

const Form_Course_Admin = () => {
    const {level} = useContext(LevelContext) as LevelContextType //Context level
    const {language} = useContext(LanguageContext) as LanguageContextType //Context language
    const {handleForm} = useContext(CourseContext) as CourseContextType //Context language
    const { TreeNode } = TreeSelect; 
    const {id} = useParams() //lấy params từ trên url
    const {handleSubmit, control, reset, formState: {errors}} = useForm<Tcourse>({
        resolver: zodResolver(course_schema),
        defaultValues: {
        _method: "PUT",
        //   thumbnail: null, // Khởi tạo giá trị mặc định của fileList thuộc upload file antd là mảng rỗng 
          user_id: 1
        },
        mode: 'onBlur'
    })

    // set ảnh khi upload lên đưa vào preview
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null) 

    // Lấy ra thông tin khóa học theo ID
    useEffect(() => {
        if(id){
           (async () => {
                const {data} = await instance.get(`/courses/${id}`)
                console.log(data)
                reset({
                    title: data.data.title,
                    description: data.data.description,
                    level_id: data.data.information.level.id,
                    language_id: data.data.information.language.id,
                    old_price: data.data.old_price,
                    status: data.data.status,
                    category_id: 5,
                    thumbnail: {
                        uid: '-1', // UID tạm thời cho file
                        name: 'thumbnail.jpg', // Tên file bất kỳ
                        status: 'done', // Đánh dấu là hoàn tất upload
                        url: data.data.thumbnail, // URL của ảnh từ API
                    },
                    teacher: data.data.teacher
                })
                setThumbnailPreview(data.data.thumbnail)
            })()
        }
    }, [id, reset])

    const onsubmit = async (data: Tcourse) => {
        console.log(data._method)
        try {
            await handleForm({...data, id: Number(id)})
        } catch (error) {
            console.log("Không lấy được dữ liệu", error)
        }
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
                {id && <Controller 
                            name="_method"
                            control={ control }
                            render={({ field }) => (
                                <Input 
                                type='hidden'
                                className="h-[70px] border border-black rounded-[8px] text-[22px] " 
                                {...field}  //field gán các thuộc tính cần thiết cho Input
                            />
                            )}
                        /> }
                    <div className="flex flex-col gap-2 mb-5">
                        <label>Tên khóa học</label>
                        <Controller
                            name="title"
                            control={control}  // 'control' phải được khai báo từ useForm()
                            render={({ field }) => (
                            <Input 
                                type='text'
                                className="h-[70px] border border-black rounded-[8px] text-[22px]" 
                                {...field}  //field gán các thuộc tính cần thiết cho Input
                            />
                            )}
                        />
                        {errors.title && <p className='text-danger text-[14px]'>{errors.title.message}</p>}
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
                                        fileList={field.value ? typeof field.value === 'string' 
                                            ? [{ uid: '-1', name: 'thumbnail', status: 'done', url: field.value }] // Chuyển đổi URL string thành đối tượng UploadFile
                                            : [field.value] 
                                          : []}  // Nếu có tệp nào đã được chọn, nó sẽ hiển thị tệp đó trong danh sách. Nếu không, danh sách sẽ trống [].
                                        onChange={({ fileList }) => {
                                            const file = fileList[0]; // Lấy tệp đầu tiên trong danh sách tệp mà người dùng đã upload.
                                            field.onChange(file); // Sử dụng file.originFileObj nếu có, nếu không thì dùng file.

                                            // Kiểm tra định dạng tệp
                                            const ACCEPTED_FILE_TYPES = ['.png', '.jpeg', '.jpg', '.gif'];
                                            const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

                                            if (ACCEPTED_FILE_TYPES.includes(extension)) {
                                            // Nếu định dạng tệp hợp lệ, hiển thị preview
                                            if (file && file.originFileObj) {
                                                const previewUrl = URL.createObjectURL(file.originFileObj); 
                                                setThumbnailPreview(previewUrl); // Cập nhật trạng thái thumbnailPreview với URL mới
                                            } else {
                                                setThumbnailPreview(null); // Nếu không có file hoặc file không hợp lệ, xóa preview
                                            }
                                            } else {
                                            // Nếu định dạng tệp không hợp lệ, xóa preview
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
                        {errors.thumbnail && <p className='text-danger text-[14px]'>{errors.thumbnail.message}</p>}
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
                        {errors.description && <p className='text-danger text-[14px]'>{errors.description.message}</p>}
                        
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
                                        <TreeNode key={item.id} value={item.id} title={item.name}/>
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
                        {errors.language_id && <p className='text-danger text-[14px]'>{errors.language_id.message}</p>}
                        
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label>Giá tiền</label>
                        <Controller
                            name='old_price'
                            control={ control }
                            render={({field}) => (
                                <Input type='number' className="h-[70px] border border-black rounded-[8px]" 
                                {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
                            )}
                        />
                        {errors.old_price && <p className='text-danger text-[14px]'>{errors.old_price.message}</p>}
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
                                    // defaultValue="Vui lòng chọn --"
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    value={field.value}
                                    onChange={(value) => field.onChange(Number(value))}
                                    filterTreeNode={(input, treeNode) =>
                                        treeNode?.props?.title?.toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    <TreeNode value={1} title="Hoạt động" />
                                    <TreeNode value={0} title="Ngừng hoạt động" />
                                </TreeSelect>
                            )}
                        />
                        {errors.status && <p className='text-danger text-[14px]'>{errors.status.message}</p>}
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
                                    value={field.value}
                                    onChange={(value) => field.onChange(Number(value))}
                                    style={{ width: '100%' }} 
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                >
                                    <TreeNode value={9} title="Khóa học làm mẹ thiên hạ, bố thiên nhiên" />
                                    <TreeNode value={5} title="Khóa học giàu tình cảm" />
                                    <TreeNode value={6} title="Khóa học làm súc vật" />
                                </TreeSelect>
                            )}
                        />
                        {errors.category_id && <p className='text-danger text-[14px]'>{errors.category_id.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label>user_id</label>
                        <Controller 
                            name='user_id'
                            control={ control }
                            render={({ field }) => (
                                <Input 
                                className="h-[70px] border border-black rounded-[8px] text-[22px] " 
                                {...field}  //field gán các thuộc tính cần thiết cho Input
                            />
                            )}
                        />
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
