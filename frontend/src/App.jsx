import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom' // ✅ sax
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Admin from './pages/Dashboard/Admin'
import AdminProtected from './components/auth/AdminProtected'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/dashboard' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path='/admin' element={<AdminProtected><Admin/></AdminProtected>}></Route>
      <Route path='/' element={<Navigate to="/login" replace />} />
    
    </Routes>



  )
}

export default App
