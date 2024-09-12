import { Button, Input, Upload, UploadFile } from "antd";
import { DeleteOutlined, DownOutlined, UpOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from './add.module.scss'

const Add_Lesson_Admin = () => {
    const [lessons, setLessons] = useState([{ id: 1, isUpload: false }]);
    const fileList: UploadFile[] = []

    // Thêm bài học mới khi nhấn "Thêm mới khóa học"
    const addNewLesson = () => {
        const newLesson = { id: lessons.length + 1, isUpload: false };
        setLessons([...lessons, newLesson]);
    };

    // Bật/tắt hiển thị phần tải file
    const toggleUpload = (index: number) => {
        setLessons((prev) =>
            prev.map((lesson, i) =>
                i === index
                    ? { ...lesson, isUpload: !lesson.isUpload }
                    : lesson
            )
        );
    };

    // Xóa bài học
    const handleDelete = (index: number) => {
        if (confirm("Bạn chắc chắn muốn xóa")) {
            setLessons(lessons.filter((_, i) => i !== index));
        }
    };

    // Render mỗi bài học và phần tải file
    const renderLesson = (lesson, index: number) => (
        <div key={lesson.id} className="mb-4">
            <div className="flex items-center">
                <Input
                    value={`Bài ${lesson.id}`} readOnly //Ẩn đi để điền được vào input
                    className="border border-black w-[593px] h-[60px]"

                    suffix={lesson.isUpload ?
                        <UpOutlined onClick={() => toggleUpload(index)} /> :
                        <DownOutlined onClick={() => toggleUpload(index)} />
                    }
                />
                <Button
                    type="text"
                    danger
                    className="ml-2"
                    onClick={() => handleDelete(index)}
                >
                    <DeleteOutlined />
                </Button>
            </div>
            {lesson.isUpload && (
                <div className="mt-4 w-[593px] ">
                    <Upload className="" action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture"
                        defaultFileList={fileList}>
                        <Button icon={<UploadOutlined />} className="w-[593px] h-[40px]">
                            Upload
                        </Button>
                    </Upload>
                </div>
            )}
        </div>
    );

    return (
        <form className={`${styles['container']} p-5`}>
            <div className="flex justify-between items-center">
                <h1 className={`${styles['title']} mb-4`}>
                    Lập trình Javascript
                </h1>
                <Button
                    icon={<PlusOutlined />}
                    onClick={addNewLesson}
                    className={`${styles['btn']} w-[264px] h-[70px] `}
                >
                    Thêm mới khóa học
                </Button>
            </div>
            {lessons.map((lesson, index) => renderLesson(lesson, index))}
            <div className="mt-10 w-[950px]">
                <div className="flex flex-col gap-2">
                    <label>Tên bài học <span className="text-red-600">*</span></label>
                    <Input className="mb-5 w-[950px] h-[60px] border border-black" />
                </div>
                <Upload listType="picture">
                    <Button icon={<UploadOutlined />} className="w-[950px] h-[40px]">
                        Tải lên Video
                    </Button>
                </Upload>
            </div>
            <div className="flex justify-end mt-16 mb-16">
                <Button className={`${styles['btn']} w-[264px] h-[70px]`}>
                    Lưu
                </Button>
            </div>
        </form>
    );
};

export default Add_Lesson_Admin;
