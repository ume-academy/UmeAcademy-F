import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import Layout_Admin from './layouts/Layout_Admin';
import Layout_Client from './layouts/Layout_Client';
import Layout_Teacher from './layouts/Layout_Teacher';
import Dashboard_Admin from './pages/admin/Dashboard/Dashboard';
import Login from './pages/auth/Login/Login';
import Content_Course_Page from './pages/client/Courses/Content_Course_Page/Content_Course_Page';
import Course_Detail from './pages/client/Courses/Details/Course_Detail';
import Payment_History from './pages/client/History_Payment_Page/Payment_History';
import Home_Page from './pages/client/Home_Page/Home_Page';
import Dashboard_Teacher from './pages/teacher/Dashboard/Dashboard';
import List_Courses_Teacher from './pages/teacher/Courses/List/List_Courses';
import NotFound from './pages/client/NotFound/NotFound';
import Purchased_Course from './pages/client/Purchased_Course/Purchased_Course';
import Register from './pages/client/Register/Register';
import Search_Page from './pages/client/Search_Page/Search_Page';
import FormSubmitUser from './pages/admin/Users/FormSubmitUser/FormSubmitUser';
import Histories_Transaction_Teacher from './pages/teacher/Histories_Transaction/Histories_Transaction';
import Form_Course_Admin from './components/admin/Form_Course/Form_Course';
import Form_Course from './components/teacher/Form_Course/Form_Course';
import Histories_Transaction_Admin from './pages/admin/List_Histories_Transaction/Histories_Transaction';
import FormSubmitCategory from './pages/admin/Categories/FormSubmitCategory/FormSubmitCategory';
import List_Categories from './pages/admin/Categories/ListCategories/List_Categories';
import Add_Lesson_Teacher from './components/teacher/Add_Lesson/Add_Lesson';
import List_Courses_Admin from './pages/admin/Teacher/List_Courses/List_Courses';
import Add_Lesson_Admin from './components/admin/Add_Lesson/Add_Lesson';


function App() {


  {/* <===== Sử dụng cho layout admin cuộn lên đầu trang khi path thay đổi =====>*/ }
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  {/* <===== Kết thúc layout admin cuộn lên đầu trang =====>*/ }

  return (
    <>

      <Routes>

        {/* <===== Layout admin =====>*/}
        <Route path='/admin' element={<Layout_Admin />} >
          <Route path='/admin' element={<Dashboard_Admin />} />

          {/* <===== Users =====> */}
          <Route path='/admin/create_user' element={<FormSubmitUser />} />
          <Route path='/admin/update_user/:id' element={<FormSubmitUser />} />

          {/* Categories's route */}
          <Route path='/admin/categories' element={<List_Categories />} />
          <Route path='/admin/create_category' element={<FormSubmitCategory />} />
          <Route path='/admin/update_category/:id' element={<FormSubmitCategory />} />

          {/* <===== Teacher =====> */}
          <Route path='/admin/course' element={<List_Courses_Admin />} />
          <Route path='/admin/add_lesson' element={<Add_Lesson_Admin />} />
          <Route path='/admin/form_course_add' element={<Form_Course_Admin />} />
          <Route path='/admin/form_course_edit/:id' element={<Form_Course_Admin />} />

          {/* <===== Histories Transaction =====> */}
          <Route path='/admin/histories_transaction' element={<Histories_Transaction_Admin />} />

        </Route>

        {/* <===== Layout client =====>*/}
        <Route path='/' element={<Layout_Client />} >
          <Route index element={<Home_Page />} />
          <Route path='/search' element={<Search_Page />} />
          <Route path='/content_course' element={<Content_Course_Page />} />
          <Route path='/purchased_course' element={<Purchased_Course />} />
          <Route path='/history_payment' element={<Payment_History />} />
          <Route path='/course/details/:id' element={<Course_Detail />} />
        </Route>

        {/* <===== Role Teacher =====> */}
        <Route path='/teacher' element={<Layout_Teacher />} >
          <Route index element={<Dashboard_Teacher />} />
          <Route path='/teacher/courses' element={<List_Courses_Teacher />} />
          <Route path='/teacher/add_lesson' element={<Add_Lesson_Teacher />} />
          <Route path='/teacher/histories_transaction' element={<Histories_Transaction_Teacher />} />
          <Route path='/teacher/form_course_add' element={<Form_Course />} />
          <Route path='/teacher/form_course_edit/:id' element={<Form_Course />} />
        </Route>

        {/* <===== Auth =====>*/}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* <===== Not found page =====> */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App