
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import Layout_Admin from './layouts/Layout_Admin';
import Layout_Client from './layouts/Layout_Client';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import List_Product from './pages/admin/Products/List_Product';
import Home_Page from './pages/client/Home_Page/Home_Page';
import Register from './pages/client/Register/Register';

function App() {

  
  {/* <===== Sử dụng cho layout admin cuộn lên đầu trang khi path thay đổi =====>*/}
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  {/* <===== Kết thúc layout admin cuộn lên đầu trang =====>*/}

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
          </Route>
          <Route path='/register' element={<Register />} />

      </Routes>
    </>
  )
}

export default App
