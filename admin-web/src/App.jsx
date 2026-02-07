// [路由] 配置路由表
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthGuard from './components/AuthGuard'
import MainLayout from './components/MainLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import HotelEdit from './pages/HotelEdit'
import HotelAudit from './pages/HotelAudit'
import HotelStatus from './pages/HotelStatus' 
import { ROUTE_PATHS } from './utils/constants'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>             
        {/* 公开路由保持不变 */}
        <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
        <Route path={ROUTE_PATHS.REGISTER} element={<Register />} />
        
        {/* 受保护的路由 */}
        <Route path="/" element={
          <AuthGuard>
            <MainLayout />
          </AuthGuard>
        }>
          <Route index element={<Navigate to={ROUTE_PATHS.DASHBOARD} replace />} />
          <Route path={ROUTE_PATHS.DASHBOARD} element={<Dashboard />} />
          
          {/* 使 id 成为可选参数，适配 录入(:无)、查看(:id)、驳回修改(:id) */}
          <Route path={`${ROUTE_PATHS.HOTEL_EDIT}/:id?`} element={<HotelEdit />} />
          
          {/*商家房源状态页 */}
          <Route path="/hotel/status" element={<HotelStatus />} />
          
          <Route path={ROUTE_PATHS.HOTEL_AUDIT} element={<HotelAudit />} />
        </Route>
        
       <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App