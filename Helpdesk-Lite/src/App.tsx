
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLoginForm from "./components/UserLoginForm"
import UserRegisterForm from "./components/UserRegisterFrom"
import AdminLoginForm from "./components/AdminLoginForm"
import UserListPage from './components/UserListPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLoginForm />} />
        <Route path="/register" element={<UserRegisterForm />} />
        <Route path="/admin" element={<AdminLoginForm />} />
        <Route path="/users" element={<UserListPage />} />
      </Routes>
    </Router>
  )
}

export default App
