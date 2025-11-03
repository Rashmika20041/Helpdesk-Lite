
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import UserLoginForm from "./components/UserLoginForm"
import UserRegisterForm from "./components/UserRegisterFrom"
import AdminLoginForm from "./components/AdminLoginForm"
import UserListPage from './components/UserListPage';
import AdminListPage from './components/AdminListPage';
import TicketDetailsPage from './components/TicketDetailsPage';
import AdminTicketDetailPage from './components/AdminTicketDetailPage';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserLoginForm />} />
          <Route path="/register" element={<UserRegisterForm />} />
          <Route path="/admin" element={<AdminLoginForm />} />
          <Route path="/admin/login" element={<AdminLoginForm />} />
          <Route path="/admin/tickets" element={
            <ProtectedRoute requiredRole="admin">
              <AdminListPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/ticket/:id" element={
            <ProtectedRoute requiredRole="admin">
              <AdminTicketDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/tickets" element={
            <ProtectedRoute requiredRole="user">
              <UserListPage />
            </ProtectedRoute>
          } />
          <Route path="/ticket/:id" element={
            <ProtectedRoute requiredRole="user">
              <TicketDetailsPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
