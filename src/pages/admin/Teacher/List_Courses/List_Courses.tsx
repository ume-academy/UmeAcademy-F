import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Image, message, Pagination, Popconfirm, Table, TableColumnsType, Tag } from 'antd';
import { PopconfirmProps } from 'antd/lib';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CourseContext, CourseContextType } from '../../../../contexts/course_context';
import { Tcourse } from '../../../../interface/Tcourse';
import styles from './list_courses.module.scss';

const List_Courses = () => {
    const {state, removeCourse, getAllCourses} = useContext(CourseContext) as CourseContextType
    const {courses, pagination } = state
    console.log('Courses in List_Courses:', state); 

    // Chuyển trang
    const handlePageChange = (page: number) => {
      getAllCourses(page)
    }

    // Alert xóa thành công
    const confirm: PopconfirmProps['onConfirm'] = (e) => {
      console.log(e);
      message.success('Xóa thành công!');
    };
    
    // Alert hủy xóa
    const cancel: PopconfirmProps['onCancel'] = (e) => {
      console.log(e);
      message.error('Xóa thất bại');
    };
  
    // funtion dùng để xóa 
    const handleRemove = (course: Tcourse) => {
        removeCourse(course.id)
        confirm()
    }

    // Render data
    const data: Tcourse[] = courses.data.map((item, index) => ({
      key: index + 1,
      id: item.id,
      title: item.title,
      thumbnail: (
        <Image
          src={
            typeof item.thumbnail === 'string' ? item.thumbnail :
            "https://media.istockphoto.com/id/1402586283/vector/update-software-icon-in-flat-style-system-upgrade-notification-vector-illustration-on.jpg?s=612x612&w=0&k=20&c=Mt1y_o2wjmhxMdTKwxJGobkefSQAe4Hd6tDYxvlUQXU="
          }
        />
      ),
      old_price: item.old_price,
      teacher: item.teacher.fullname,
      created_at: new Date(item.created_at).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }), // định dạng ngày theo dd/MM/yyyy
      total_student: item.total_student,
      status: (<div className="text-center">
        {
            item.status === 0 ? (
                <Tag color={'green'}>Hoạt động</Tag>
            ) : item.status === 2 ? (
                <Tag color={'blue'}>Chờ xuất bản</Tag>
            ) : (
                <Tag color={'red'}>Ngưng hoạt động</Tag>
            )
        }
      </div>)
    })); 

    // Các cột trong table
    const columns: TableColumnsType<Tcourse> = [
      {
        title: "ID",
        dataIndex: "id",
        key: "index",
        ellipsis: true,
        align: "center",
        width: 60,
      },
      {
        title: <div className="text-center">Tên khóa học</div>,
        dataIndex: "title",
        key: "title",
        ellipsis: true,
        align: "center",
      },
      {
        title: <div className="text-center">Ảnh</div>,
        dataIndex: "thumbnail",
        key: "thumbnail",
        ellipsis: true,
        align: "center",
      },
      {
        title: <div className="text-center">Giá</div>,
        dataIndex: "old_price",
        key: "old_price",
        ellipsis: true,
        align: "center",
      },
      {
        title: <div className="text-center">Giảng viên</div>,
        dataIndex: "teacher",
        key: "teacher",
        ellipsis: true,
        align: "center",
      },
      {
        title: "Ngày tạo",
        dataIndex: "created_at",
        key: "created_at",
        ellipsis: true,
        align: "center",
      },
      {
        title: <div className="text-center">SL Học Viên</div>,
        dataIndex: "total_student",
        key: "total_student",
        align: "center",
        width: 120,
      },
      {
        title: <div className="text-center">Trạng thái</div>,
        dataIndex: "status",
        key: "status",
        align: "center",
        width: 140,
      },
      {
        title: <div className="text-center">Hành động</div>,
        dataIndex: "status",
        render: (_: Tcourse, course) => (
          <div className={`${styles["btnGroup"]}`}>
            <div className="">
              <Link to={"/admin/form_course_edit/2"} className="m-0 p-0">
                <EditOutlined className="flex-1 text-xl" />
              </Link>
            </div>

            <div className="">
              <Popconfirm
                title="Bạn có chắc chắn muốn xóa?"
                placement="topRight"
                onConfirm={() => handleRemove(course)}
                onCancel={cancel}
                okText="Có"
                cancelText="Không"
              >
                <DeleteOutlined className="flex-1 text-xl text-red-500" />
              </Popconfirm>
            </div>
          </div>
        ),
        key: "action",
      },
    ];

    return (
        <>
          <div className={`${styles['heading']} text-2xl font-bold mb-6`}>
                <h3>Danh sách khóa học</h3>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            <div className="mt-5">
                <Pagination
                    align='end'
                    current={pagination.currentPage} // trang hiện tại
                    total={pagination.total} // tổng số bản ghi
                    pageSize={pagination.pageSize} // Số bản ghi trên mỗi trang
                    onChange={handlePageChange} // gọi hàm 
                />
            </div>
        </>
    )
}

export default List_Courses
