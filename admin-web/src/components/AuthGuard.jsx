// [路由守卫] 检查登录状态
import React from 'react'
import { Navigate } from 'react-router-dom'
import { STORAGE_KEYS, ROUTE_PATHS } from '../utils/constants'

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
  
  if (!token) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />
  }
  
  return children
}

export default AuthGuard
