import React from 'react'
import { Outlet } from 'react-router-dom';
import { AdminNav } from '../components/AdminNav';

export function AdminLayout() {
  return (
    <>
      <AdminNav />
      <Outlet />
    </>
  );
}
