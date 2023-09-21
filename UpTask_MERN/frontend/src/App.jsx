import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import {
  Login,
  Register,
  ForgotPassword,
  NewPassword,
  ConfirmAccount,
} from './pages';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="forgot-password/:token" element={<NewPassword />} />
            <Route path="confirm/:id" element={<ConfirmAccount />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
