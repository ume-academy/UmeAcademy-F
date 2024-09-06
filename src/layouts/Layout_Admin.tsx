import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../common/Loader/Loader';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';


const Layout_Admin = () => {
        const [sidebarOpen, setSidebarOpen] = useState(false);
        const [loading, setLoading] = useState<boolean>(true);
    
        useEffect(() => {
            setTimeout(() => setLoading(false), 1000)
        },[])

  return loading ? (<Loader />) : (
      <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        
          {/* <!-- ===== Bao bọc toàn bộ layout admin ===== --> */}
          <div className="flex h-screen overflow-hidden">
              {/* <!-- ===== Start sidebar ===== --> */}
              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              {/* <!-- ===== End sidebar ===== --> */}

              {/* <!-- ===== Bắt đầu nội dung chính ===== --> */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

                  {/* <!-- ===== Start header ===== --> */} 
                  <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                  {/* <!-- ===== End header ===== --> */}


                  {/* <!-- ===== Start Content ===== --> */}
                  <main>
                      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                          <Outlet />
                      </div>
                  </main>
                  {/* <!-- ===== End Content ===== --> */}

              </div>
          </div>
      </div>
      </>
  )}

export default Layout_Admin
