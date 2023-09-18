import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import {
  Login,
  Register,
  ForgotPassword,
  NewPassword,
  ConfirmAccount,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="forgot-password/:token" element={<NewPassword />} />
          <Route path="confirm/:token" element={<ConfirmAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
