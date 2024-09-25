import { createContext, useEffect, useReducer } from "react";
import { Tcategory } from "../interface/Tcategory";
import categoryReducer, { State } from "../reducers/category_reducer";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export type CategoryContextType = {
    state: {
        categories: { data: Tcategory[] },
        category?: Tcategory,
        pagination: {
            currentPage: number,
            pageSize: number,
            total: number
        }
    },
    dispatch: React.Dispatch<any>,
    handleSubmitForm: (data: Tcategory) => void,
    removeCategory: (data: Tcategory) => void,
    getOneCategory: (id: number | undefined) => void,
    getAllCategories: (page: number) => void
}

const initialState: State = {
    categories: { data: [] },
    category: undefined,
    pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
    }
};

export const CategoryContext = createContext({} as CategoryContextType);

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(categoryReducer, initialState);
    const nav = useNavigate();

    // ! GET ALL & PAGINATION
    const getAllCategories = async (page = 1) => {
        try {

            const { data } = await instance.get(`categories?page=${page}`);
            dispatch({ type: 'GET_CATEGORIES', payload: data });

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    // ! GET ONE
    const getOneCategory = async (id: number | undefined) => {
        if (id === undefined) return;

        try {

            const { data } = await instance.get(`categories/${id}`);
            // console.log(data);
            dispatch({ type: 'GET_CATEGORY', payload: data.data })

        } catch (error) {
            console.log(error)
        }
    }

    // ! REMOVE
    const removeCategory = async (category: Tcategory) => {
        if (category.id === undefined) return;

        try {
            const { data, status } = await instance.delete(`categories/${category.id}`);

            console.log(data)

            dispatch({ type: 'REMOVE_CATEGORY', payload: category.id })


            // Alert
            if (status === 200) {
                message.success(data.message || "Xoá danh mục thành công!");  // Nếu không có message, hiển thị thông báo mặc định
            } else {
                message.error(data.message || "Xóa danh mục thất bại, vui lòng thử lại sau!");  // Nếu không có message, hiển thị thông báo mặc định
            }

            getAllCategories();

        } catch (error) {
            console.log(error);
            message.error("Có lỗi xảy ra khi xoá danh mục, vui lòng thử lại sau!"); 
        }
    }

    //** Submit form
    const handleSubmitForm = async (category: Tcategory) => {
        try {
            if (category.id) {
                // ! UPDATE
                // console.log('update data', data)

                const { data } = await instance.put(`categories/${category.id}`, category);
                console.log('update', data.data)

                dispatch({ type: 'UPDATE_CATEGORY', payload: data.data })

                // Alert
                if (data.status === true) {
                    message.success(data.message);
                } else {
                    message.error(data.message);
                }

                // redirect
                nav('/admin/categories')

                

            } else {
                // ! CREATE
                // console.log('create data', category)
                const { data } = await instance.post('categories', category);
                // console.log('create', data)

                dispatch({ type: 'CREATE_CATEGORY', payload: data.data })

                // Alert
                if (data.status === true) {
                    message.success(data.message);
                } else {
                    message.error(data.message);
                }

                // redirect
                nav('/admin/categories');

                getAllCategories();
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <CategoryContext.Provider value={{ state, dispatch, getAllCategories, handleSubmitForm, removeCategory, getOneCategory }}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider
