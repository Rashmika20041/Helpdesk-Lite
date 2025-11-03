
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLoginForm from "./components/UserLoginForm"
import UserRegisterForm from "./components/UserRegisterFrom"
import AdminLoginForm from "./components/AdminLoginForm"
import UserListPage from './components/UserListPage';
import AdminListPage from './components/AdminListPage';
import TicketDetailsPage from './components/TicketDetailsPage';
import AdminTicketDetailPage from './components/AdminTicketDetailPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLoginForm />} />
        <Route path="/register" element={<UserRegisterForm />} />
        <Route path="/admin" element={<AdminLoginForm />} />
        <Route path="/admin/tickets" element={<AdminListPage />} />
        <Route path="/admin/ticket/:id" element={<AdminTicketDetailPage />} />
        <Route path="/tickets" element={<UserListPage />} />
        <Route path="/ticket/:id" element={<TicketDetailsPage />} />
      </Routes>
    </Router>
  )
}

export default App
