import React from 'react';
import '../../assets/css/admin/adminDashboard.css';
import { useNavigate } from 'react-router';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h2>관리자 페이지</h2>

      <div className="admin-menu">
        <button onClick={() => navigate('/admin/book')}>도서 관리</button>
        <button onClick={() => navigate('/admin/category')}>카테고리 관리</button>
        <button onClick={() => navigate('/admin/user')}>회원 관리</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
