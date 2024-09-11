import { Button, Input, TreeSelect, UploadFile } from 'antd';
import { CameraOutlined, CloudUploadOutlined } from '@ant-design/icons';
import styles from './form_course.module.scss';
import Dragger from 'antd/es/upload/Dragger';

const Form_Course = () => {
    const { TreeNode } = TreeSelect;
    const fileList: UploadFile[] = []
    const id = 1
    return (
        <form className={`${styles['container']} p-5`}>
            <div className="flex justify-between items-center mb-10">
                <h1 className={`${styles['title']}`}>{id ? "" : "Thêm mới khóa học"}</h1>
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
                        <Input className="h-[70px] border border-black rounded-[8px]" />
                    </div>

                    <div className="mt-10 space-y-4">
                        <label>Upload video</label>
                        <Dragger
                            name="files"
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture"
                            defaultFileList={fileList}
                            className={`${styles['uploader']} h-[200px] w-[450px]`}
                        >
                            <p className="">
                                <CloudUploadOutlined className="text-[60px] text-[#C67D39]" />
                            </p>
                            <b className="text-[16px] ">Drag & drop files or <span className='text-[#C67D39] underline'>Browse</span></b>
                            <p className='text-[12px] text-[#676767] '>Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</p>
                        </Dragger>
                    </div>
                    <div className={`${styles['thumbnail-upload']} w-[125px] h-[155px] mt-10 space-y-4`}>
                        <label className={styles['thumbnail-label']}>Thumbnail</label>
                        <Dragger
                            name="thumbnail"
                            className={styles['uploader']}
                            showUploadList={false}
                        >
                            <p className={styles['upload-icon']}>
                                <CameraOutlined />
                            </p>
                        </Dragger>
                    </div>
                </div>
                <div className="w-1/2 space-y-6">
                    <div className="flex flex-col gap-2">
                        <label>Mô tả khóa học</label>
                        <textarea className="border border-black rounded-[8px] h-[70px] p-2" />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label>Trình độ</label>
                        <TreeSelect
                            showSearch
                            className="w-1/2 h-[70px] border border-black rounded-[8px]"
                            defaultValue="DaddyGiao"
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        >
                            <TreeNode value="giao" title="Giao" />
                            <TreeNode value="giao-1" title="Giao 1" />
                            <TreeNode value="dadyGiao" title="DaddyGiao" />
                        </TreeSelect>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label>Quốc gia</label>
                        <TreeSelect
                            showSearch
                            className="w-1/2 h-[70px] border border-black rounded-[8px]"
                            defaultValue="Việt Nam"
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        >
                            <TreeNode value="jav" title="Jav" />
                            <TreeNode value="forn" title="Forn Hub" />
                        </TreeSelect>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label>Giá tiền</label>
                        <Input type='number' className="h-[70px] border border-black rounded-[8px]" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-30">
                <Button className={`${styles['btn']} w-[264px] h-[70px]`}>Lưu</Button>
            </div>
        </form>
    );
};

export default Form_Course;
