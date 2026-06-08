import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';
import { VerifyOtpPage } from '../features/auth/pages/VerifyOtpPage';
import { ForgotPasswordPage } from '../features/auth/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../features/auth/pages/ResetPasswordPage';
import { UseAuth } from '../context/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { BlogListPage } from '../features/blog/pages/BlogListPage';

// Himoyalangan router (Faqat tizimga kirganlar uchun)
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = UseAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Auth router (Tizimga kirgan odam qayta login sahifasiga kirolmasligi uchun)
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = UseAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Asosiy umumiy qobiq */}
      <Route path="/" element={<MainLayout />}>
        {/* Public Sahifalar (Hamma ko'ra oladi) */}
        <Route index element={<BlogListPage/>} />
        <Route path="blog/:id" element={<div>Blog batafsil ko'rish sahifasi</div>} />

        {/* Faqat mehmonlar uchun sahifalar */}
        <Route path="login" element={<AuthRoute><LoginPage /></AuthRoute>} />
        <Route path="register" element={<AuthRoute><RegisterPage /></AuthRoute>} />
        <Route path="verify-otp" element={<AuthRoute><VerifyOtpPage /></AuthRoute>} />
        <Route path="forgot-password" element={<AuthRoute><ForgotPasswordPage /></AuthRoute>} />
        <Route path="reset-password" element={<AuthRoute><ResetPasswordPage /></AuthRoute>} />

        {/* Himoyalangan sahifalar (Dashboard, Create Post) */}
        <Route path="dashboard" element={
          <ProtectedRoute>
            <div>Dashboard paneli (Milestone 5 da quramiz)</div>
          </ProtectedRoute>
        } />
        <Route path="create-post" element={
          <ProtectedRoute>
            <div>Yangi post yaratish (Milestone 4 da quramiz)</div>
          </ProtectedRoute>
        } />
      </Route>

      {/* Noto'g'ri URL kiritilsa bosh sahifaga otadi */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};