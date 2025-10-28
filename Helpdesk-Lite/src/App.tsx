
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLoginForm from "./components/UserLoginForm"
import UserRegisterForm from "./components/UserRegisterFrom"
import AdminLoginForm from "./components/AdminLoginForm"
import UserListPage from './components/UserListPage';
import TicketDetailsPage from './components/TicketDetailsPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLoginForm />} />
        <Route path="/register" element={<UserRegisterForm />} />
        <Route path="/admin" element={<AdminLoginForm />} />
        <Route path="/tickets" element={<UserListPage />} />
        <Route path="/ticket/:id" element={<TicketDetailsPage />} />
      </Routes>
    </Router>
  )
}

export default App
