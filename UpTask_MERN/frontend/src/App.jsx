import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import ProtectedRoutes from './layout/ProtectedRoutes';
import {
  Login,
  Register,
  ForgotPassword,
  NewPassword,
  ConfirmAccount,
  Projects,
  NewProject,
} from './pages';
import { AuthProvider } from './context/AuthProvider';
import { ProjectsProvider } from './context/ProjectProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />
            </Route>

            {/* Protected Routes */}
            <Route path="/projects" element={<ProtectedRoutes />}>
              <Route index element={<Projects />} />
              <Route path="create-project" element={<NewProject />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
