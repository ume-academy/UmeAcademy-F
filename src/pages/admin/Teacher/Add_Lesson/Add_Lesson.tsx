import { CaretDownOutlined, CaretUpOutlined, CheckOutlined, CloseOutlined, CloudUploadOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, message, Popconfirm, Upload, UploadFile } from "antd";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { Lesson_Context, LessonContextType } from "../../../../contexts/lesson_context";
import { Tlesson } from "../../../../interface/Tlesson";
import styles from './add.module.scss';

const Add_Lesson = () => {

    const [showLession, setShowLesson] = useState<number | null>(null);

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // ! Validation
    const lesson_create_schema = z.object({
        title: z.string({ message: 'Không được bỏ trống!' }).max(64),
        video: z
            .any() // Sử dụng .any() vì video có thể là một đối tượng tệp
            .refine((file) => file && file.originFileObj, {
                message: 'Vui lòng tải lên một tệp video.',
            }),
    });

    const { control, handleSubmit, reset, formState: { errors } } = useForm<Tlesson>({
        resolver: zodResolver(lesson_create_schema)
    });

    const { state: lessionState, dispatch, getAllLessons, removeLessonById, createLesson } = useContext(Lesson_Context) as LessonContextType

    const { id } = useParams();

    // console.log(id)



    //! GET ALL LESSONS 
    useEffect(() => {
        if (id) {
            getAllLessons(+id)
        }
    }, [])

    // console.log(lessionState.lessons)

    // Create
    const onSubmitAdd = (data: Tlesson) => {
        // console.log(data);

        // Cloudinary
        // Lấy video URL từ file đầu tiên (nếu file tồn tại và đã hoàn thành)
        // const videoUrl = fileList.length > 0 && fileList[0].status === 'done'
        //     ? fileList[0].response?.secure_url
        //     : null;

        // Kết hợp dữ liệu form với video URL
        // if (id) {
        //     createLesson(+id, { ...data, video: videoUrl });
        // }

        // const mainData = { ...data, video: data.video.originFileObj}

        // Tạo một đối tượng FormData

        if (id) {
            createLesson(+id, { ...data, video: data.video.originFileObj });

            // reset sau khi submit
            reset();
        }
    };

    // Update
    const onSubmitUpdate = (data: Tlesson) => {
        console.log(data)
    }

    // const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    //     setFileList([...newFileList])
    // }

    // Hiển thị dropdown
    const dropdownDisplay = (lessonId: number) => {
        setShowLesson(showLession === lessonId ? null : lessonId); // Đóng nếu đang mở
    };

    return (
        <div className={`${styles['container']} p-5`}>
            <div className="flex justify-between items-center">
                <h1 className={`${styles['title']} mb-4`}>
                    {lessionState?.lessons[0]?.course}
                </h1>
                <Button
                    icon={<PlusOutlined />}
                    className={`${styles['btn']} w-[264px] h-[70px] `}
                >
                    Thêm mới khóa học
                </Button>
            </div>
            <div className="">
                <div className="font-semibold text-xl mb-2">Danh sách bài học</div>
                <Form
                    layout="vertical"
                    onFinish={handleSubmit(onSubmitUpdate)}
                >
                    {
                        lessionState.lessons.length > 0 ? (
                            lessionState.lessons?.map((item, index) => (
                                <div key={index + 1} className="">
                                    <div className="flex items-center">
                                        <Form.Item
                                        // rules={[{ required: true, message: 'Không được bỏ trống!' }]}
                                        >
                                            <Controller
                                                name={`title`}
                                                control={control}
                                                // defaultValue={item.title}
                                                render={({ field }) => (
                                                    <div >
                                                        <Input
                                                            defaultValue={item.title}
                                                            readOnly={showLession !== item.id} //Ẩn đi để điền được vào input
                                                            className="border border-black w-[593px] h-[60px]"
                                                            {...field}
                                                            suffix={
                                                                showLession === item.id ? (
                                                                    <CaretUpOutlined onClick={() => item.id && dropdownDisplay(item.id)} />
                                                                ) : (
                                                                    <CaretDownOutlined onClick={() => item.id && dropdownDisplay(item.id)} />
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            />
                                            {/* Validate errors */}
                                            {/* <div className="text-red-500 m-0 p-0">
                                                {errors.title && <p>{errors.title.message}</p>}
                                            </div> */}
                                        </Form.Item>

                                        <div className="pb-6">
                                            {
                                                showLession === item.id ? (
                                                    
                                                    <div className="flex space-x-4 ml-4">
                                                        {/* Hủy cập nhật */}
                                                        <button type="button" onClick={() => item.id && dropdownDisplay(item.id)}
                                                            className="text-red-700 font-semibold text-xl"    
                                                        >
                                                            <CloseOutlined />
                                                        </button>

                                                        {/* Cập nhật */}
                                                        <button type="submit" className="text-green-700 font-bold text-xl">
                                                            <CheckOutlined />
                                                        </button>
                                                    </div>

                                                ) : (
                                                    <Popconfirm
                                                        placement="right"
                                                        title={'Xóa bài học'}
                                                        description={'Bạn có chắc chắn muốn xóa bài học được chỉ định không?'}
                                                        okText="Xóa"
                                                        cancelText="Hủy"
                                                        onConfirm={() => {
                                                            if (id && item.id) {
                                                                removeLessonById(+id, +item.id) // id course + id lesson
                                                            }
                                                        }}
                                                    >
                                                        <Button type="text" danger className="ml-2">
                                                            <DeleteOutlined />
                                                        </Button>
                                                    </Popconfirm>
                                                )
                                            }

                                        </div>
                                    </div>

                                    {showLession === item.id && ( // Hiển thị nếu showLession là id của bài học
                                        <div className="">
                                            <div className=" rounded-md">
                                                <span className="font-semibold">Xem trước:</span>
                                                <video controls width="400" className="">
                                                    <source src={item.video} type="video/mp4" />
                                                    Trình duyệt của bạn không hỗ trợ video.
                                                </video>
                                            </div>


                                            <div className="mt-4 my-5 w-[593px]">
                                                <Upload
                                                    className=""
                                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                                    listType="picture"
                                                    defaultFileList={fileList}
                                                >
                                                    <Button icon={<UploadOutlined />} className="w-[593px] h-[40px]">
                                                        Upload
                                                    </Button>
                                                </Upload>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            // HIển thị chưa có bản ghi khi mảng chứa lesson <= 0
                            <div className="font-semibold">
                                Hiện tại khóa học này chưa có bài học nào!
                            </div>
                        )
                    }
                </Form>
            </div>
            <div className="mt-10 w-[950px]">
                <div className="flex flex-col gap-2">
                    <Form
                        layout="vertical"
                        onFinish={handleSubmit(onSubmitAdd)}
                    >
                        <Form.Item
                            label={<div>Tên bài học <span className="text-red-600">*</span></div>}
                        // rules={[{ required: true, message: 'Không được bỏ trống!' }]}
                        >
                            <Controller
                                name='title'
                                control={control}
                                render={({ field }) => (
                                    <div >
                                        <Input
                                            className="mb-2 w-[950px] h-[60px] border border-black"
                                            {...field}
                                        />
                                    </div>
                                )}
                            />
                            {/* Validate errors */}
                            <div className="text-red-500 m-0 p-0">
                                {errors.title && <p>{errors.title.message}</p>}
                            </div>
                        </Form.Item>

                        {/* upload by Cloundinary  */}
                        {/* <Form.Item>
                            <Controller
                                name="video"
                                control={control}
                                // defaultValue={[]} // Đảm bảo giá trị mặc định là mảng (fileList)
                                render={({ field }) => (

                                    // Cloundinary 
                                    // <Upload
                                    //     action="https://api.cloudinary.com/v1_1/phmvu2912/video/upload"
                                    //     data={{ upload_preset: 'steezy_shop' }}
                                    //     onChange={handleChange}
                                    //     fileList={fileList}
                                    //     listType="picture"
                                    // >
                                    //     <Button icon={<UploadOutlined />} className="w-[950px] h-[40px]">
                                    //         Tải lên Video
                                    //     </Button>
                                    // </Upload>
                                )}
                            />
                        </Form.Item> */}

                        <Form.Item>
                            <Controller
                                name="video"
                                control={control}
                                render={({ field }) => (
                                    <Upload.Dragger
                                        name="file"
                                        listType="picture"
                                        fileList={field.value ? typeof field.value === 'string'
                                            ? [{ uid: '-1', name: 'video', status: 'done', url: field.value }]
                                            : [field.value]
                                            : []}
                                        onChange={({ fileList }) => {
                                            const file = fileList[0]; // Lấy file đầu tiên trong danh sách
                                            field.onChange(file); // Cập nhật giá trị của controller với file

                                            // Xử lý kiểm tra định dạng tệp
                                            const ACCEPTED_FILE_TYPES = ['.mp4', '.mov', '.avi'];
                                            const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
                                            console.log('Uploaded file:', file.name, 'Extension:', extension); // Debug thông tin tệp

                                            if (!ACCEPTED_FILE_TYPES.includes(extension)) {
                                                // Nếu định dạng tệp không hợp lệ, thông báo cho người dùng
                                                message.error('Định dạng tệp không được hỗ trợ!'); // Hoặc xử lý khác
                                            }
                                        }}
                                        maxCount={1}
                                        beforeUpload={() => false} // Ngăn tự động tải lên
                                    >
                                        <div className='p-5'>
                                            <p className="pb-4">
                                                <CloudUploadOutlined className="text-[60px] text-[#C67D39]" />
                                            </p>
                                            <b className="text-[16px] ">Kéo & thả tệp hoặc <span className='text-[#C67D39] underline'>Duyệt</span></b>
                                            <p className='text-[12px] text-[#676767] pt-4'>Định dạng hỗ trợ: MP4, MOV, AVI</p>
                                        </div>
                                    </Upload.Dragger>
                                )}
                            />
                        </Form.Item>



                        <div className="flex justify-end my-16">
                            <button className={`${styles['btn']} w-[264px] h-[70px]`}>
                                Lưu
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Add_Lesson;
