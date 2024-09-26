import React, { createContext, useEffect, useReducer } from "react";
import { Tlesson } from "../interface/Tlesson";
import lessonReducer from "../reducers/lesson_reducer";
import instance from "../api";
import { message } from "antd";

export type LessonContextType = {
    state: {
        lessons: Tlesson[]
    },
    dispatch: React.Dispatch<any>;
    getAllLessons: (id: number) => void;
    removeLessonById: (courseId: number, idLesson: number) => void;
    createLesson: (courseId: number, lesson: Tlesson) => void
}

const initialState = {
    lessons: [],
}

export const Lesson_Context = createContext({} as LessonContextType);

const LessonProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(lessonReducer, initialState);

    // ! APIs
    // ! GET ALL
    const getAllLessons = async (id: number) => {
        try {

            // Call api
            const { data } = await instance.get(`courses/${id}/lessons`);

            // console.log(data);

            dispatch({ type: 'GET_LESSONS', payload: data.data })

        } catch (error) {
            console.log(error)
        }
    }

    // ! REMOVE 
    const removeLessonById = async (courseId: number, idLesson: number) => {
        try {

            const { data, status } = await instance.delete(`courses/${courseId}/lessons/${idLesson}`);

            dispatch({ type: 'REMOVE_LESSON', payload: idLesson })

            if (status === 200) {
                message.success('Xóa bài học thành công!');
            }

        } catch (error) {
            console.log(error);

            message.error('Có lỗi xảy ra, vui lòng thử lại sau!')
        }
    }

    // ! CREATE
    const createLesson = async (courseId: number, lesson: Tlesson) => {
        try {
            const { data, status } = await instance.post(`courses/${courseId}/lessons`, lesson, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(data);

            dispatch({type: 'CREATE_LESSON', payload: data.data});

            if(status === 201) {
                return message.success('Thêm mới bài học thành công!');
            } else {
                return message.error('Thêm mới bài học thất bại!');
            }
        } catch (error) {
            console.log(error)

            message.error('Có lỗi xảy ra, vui lòng thử lại sau!')
        }
    }

    return (
        <Lesson_Context.Provider value={{ state, dispatch, getAllLessons, removeLessonById, createLesson }}>
            {children}
        </Lesson_Context.Provider>
    )
}

export default LessonProvider