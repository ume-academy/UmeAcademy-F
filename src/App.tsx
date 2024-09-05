import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss'
import LayoutAdmin from './layouts/LayoutAdmin';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import List_Product from './pages/admin/Products/List_Product';
import Hihi from './pages/client/hihi/hihi';
import { useEffect } from 'react';

function App() {

  
  {/* <===== Sử dụng cho layout admin =====>*/}
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);



  {/* <===== Kết thúc layout admin =====>*/}

  return (
    <>

        <Routes>

          {/* <===== Layout admin =====>*/}
          <Route path='/admin' element={<LayoutAdmin />} >
                <Route path='/admin' element={<Dashboard />} />
                <Route path='/admin/list_product' element={<List_Product />} />
          </Route>

          {/* <===== Layout client =====>*/}

          <Route path='/' element={<Layout_Client />} >
          </Route>
          
        </Routes>

    </>
  )
}

export default App
