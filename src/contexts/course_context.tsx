import React, { createContext, useEffect, useReducer } from "react";
import instance from "../api";
import course_reducer, { Action, State } from "../reducers/course_reducer";
import { Tcourse } from "../interface/Tcourse";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export interface CourseContextType {
  state: {
    courses: { data: Tcourse[] };
    course?: Tcourse;
    pagination: {
      currentPage: number;
      pageSize: number;
      total: number;
    };
  };
  dispatch: React.Dispatch<Action>;
  getAllCourses: (page: number) => void; // khai báo type để phân trang
  removeCourse: (id: number) => void;
  handleForm: (course: Tcourse) => void;
  searchCourse: (query: string ) => void
  purchasedCourse: (id: number) => void
}

const initialState: State = {
  courses: { data: [] },
  course: undefined,
  pagination: {
    currentPage: 1,
    pageSize: 12,
    total: 0,
  },
};

export const CourseContext = createContext({} as CourseContextType);

const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(course_reducer, initialState);
  const nav = useNavigate();

  // Lấy toàn bộ danh sách
  const getAllCourses = async (page: number) => {
    try {
      const { data } = await instance.get(`/courses?page=${page}&per_page=${state.pagination.pageSize}`);
      dispatch({ type: "GET_ALL_COURSES", payload: data });
    } catch (error) {
      console.log(`Không tìm thấy trang ${page}`, error);
    }
  };

  useEffect(() => {
    getAllCourses(state.pagination.currentPage); // Truyền tham số 'page' khi gọi hàm
  }, []); // Cập nhật khi trang hiện tại thay đổi

  // Xóa khóa học
  const removeCourse = async (id: number) => {
    try {
      console.log(id);
      await instance.delete(`/courses/${id}`);
      dispatch({ type: "DELETE_COURSE", payload: id });
      // Kiểm tra số lượng khóa học sau khi xóa
      const currentPage = state.pagination.currentPage;
      const pageSize = state.pagination.pageSize;
      const total = state.pagination.total;

      // Nếu số lượng khóa học trên trang hiện tại ít hơn pageSize
      // và có nhiều trang hơn một trang, chuyển về trang trước đó
      if ((total - 1) % pageSize === 0 && currentPage > 1) {
        // Điều chỉnh trang về trang trước đó nếu trang hiện tại không còn sản phẩm
        const newPage = currentPage - 1;
        getAllCourses(newPage);
      } else {
        // Lấy lại khóa học trên trang hiện tại
        getAllCourses(currentPage);
      }
    } catch (error) {
      console.log("Không thể xóa!", error);
    }
  };

  // thêm, sửa khóa học
  const handleForm = async (course: Tcourse) => {
    {
      // console.log(course.id);
      // console.log(course)
      try {
        if (course.id) {
          console.log(course)
          const { data, status } = await instance.post(`/courses/${course.id}`, {
            _method: course._method,
            id: course.id,
            title: course.title,
            description: course.description,
            thumbnail: course.thumbnail?.originFileObj,
            old_price: course.old_price,
            category_id: course.category_id,
            user_id: course.user_id,
            language_id: course.language_id,
            level_id: course.level_id,
            status: course.status
          }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
          });
          dispatch({ type: "UPDATE_COURSE", payload: data });
          if(status === 200){
            message.success(data.message || "Cập nhật thành công")
          }else{
            message.success(data.message || "Cập nhật thất bại")
          }
          nav("/admin/courses");

        } else {
          const { data, status } = await instance.post("/courses", {
            title: course.title,
            description: course.description,
            thumbnail: course.thumbnail?.originFileObj,
            old_price: course.old_price,
            category_id: course.category_id,
            user_id: course.user_id,
            language_id: course.language_id,
            level_id: course.level_id,
            status: course.status
          }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
          });
          dispatch({ type: "CREATE_COURSE", payload: data });
          if(status === 200){
            message.success(data.message || "Cập nhật thành công")
          }else{
            message.success(data.message || "Cập nhật thất bại")
          }
        }
        await getAllCourses(state.pagination.currentPage)
        nav("/admin/courses");
      } catch (error) {
        console.log("Không thể thêm", error);
        alert("Thất bại!!!")
      }
    }
  };

  // Tìm kiếm khóa học
  const searchCourse = async (query: string) => {
    try {
      const {data} = await instance.get(`/courses/search?query=${query}`)
      dispatch({type: "SEARCH_COURSE", payload: data.data})
      // nav(`/search?query=${query}`)
    } catch (error) {
      console.log(`Lỗi khi tìm kiếm khóa học với từ khóa: ${query}`, error)
    }
  }

  const purchasedCourse = async (id: number) => {
    try {
      const {data} = await instance.get(`users/${id}/course-attended`)
      console.log(data)
    } catch (error) {
      console.log(`Lỗi khi tìm kiếm khóa học của tôi`, error)
    }
  }

  return (
    <CourseContext.Provider
      value={{ state, dispatch, removeCourse, getAllCourses, handleForm, searchCourse, purchasedCourse }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;
