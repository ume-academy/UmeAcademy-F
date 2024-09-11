import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import Layout_Admin from './layouts/Layout_Admin';
import Layout_Client from './layouts/Layout_Client';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import List_Product from './pages/admin/Products/List_Product';
import Home_Page from './pages/client/Home_Page/Home_Page';
import Register from './pages/client/Register/Register';
import Search_Page from './pages/client/Search_Page/Search_Page';
import Login from './pages/auth/Login/Login';
import Purchased_Course from './pages/client/Purchased_Course/Purchased_Course';
import Payment_History from './pages/client/History_Payment_Page/Payment_History';
import Course_Detail from './pages/client/Courses/Details/Course_Detail';
import Layout_Teacher from './layouts/Layout_Teacher';
import Dashboard_Teacher from './pages/teacher/Dashboard/Dashboard_Teacher';
import List_Courses from './pages/teacher/Courses/List/List_Courses';
import Histories_Transaction from './pages/teacher/Histories_Transaction/Histories_Transaction';

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
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin/list_product' element={<List_Product />} />
        </Route>

        {/* <===== Layout client =====>*/}
        <Route path='/' element={<Layout_Client />} >
          <Route index element={<Home_Page />} />
          <Route path='/search' element={<Search_Page />} />
          <Route path='/purchased_course' element={<Purchased_Course />} />
          <Route path='/history_payment' element={<Payment_History />} />
          <Route path='/course/details/:id' element={<Course_Detail />} />
        </Route>

        {/* Role Teacher */}
        <Route path='/teacher' element={<Layout_Teacher />} >
          <Route index element={<Dashboard_Teacher />} />
          <Route path='/teacher/courses' element={<List_Courses />} />

          {/* Lịch sử thanh toán */}
          <Route path='/teacher/histories_transaction' element={<Histories_Transaction />} />
        </Route>

        {/* <===== Auth =====>*/}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

      </Routes>
    </>
  )
}

export default App