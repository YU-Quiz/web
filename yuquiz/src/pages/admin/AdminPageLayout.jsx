import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import "../../styles/admin/AdminPageLayout.scss";

const AdminPageLayout = () => {
  
    return (
        <div className='adminpage-layout-container'>
            <AdminSidebar />
            <Outlet />
        </div>
    );
  }
  
  export default AdminPageLayout;
