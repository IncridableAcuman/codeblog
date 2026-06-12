import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { VerifyOtpPage } from "../features/auth/pages/VerifyOtpPage";
import { ForgotPasswordPage } from "../features/auth/pages/ForgotPasswordPage";
import { ResetPasswordPage } from "../features/auth/pages/ResetPasswordPage";
import { UseAuth } from "../context/AuthContext";
import { MainLayout } from "../components/layout/MainLayout";
import { BlogListPage } from "../features/blog/pages/BlogListPage";
import { BlogDetailPage } from "../features/blog/pages/BlogDetailPage";
import { CreatePostPage } from "../features/blog/pages/CreatePostPage";
import { DashboardPage } from "../features/dashboard/page/DashboardPage";
import { ProfilePage } from "../features/profile/pages/ProfilePage";

// Himoyalangan router (Faqat tizimga kirganlar uchun)
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = UseAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Yuklanmoqda...
      </div>
    ); // O'zingizni Spinner'ingizni qo'ysangiz bo'ladi
  }

  // Agar user mavjud bo'lsa (yoki backend response mantiqiga qarab shunchaki 'user' o'zini tekshiring)
  return user && user.isActive ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = UseAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Yuklanmoqda...
      </div>
    );
  }

  // Agar foydalanuvchi tizimga kirgan va faol bo'lsa, uni dashboardga o'tkazib yuboramiz
  return user && user.isActive ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>{children}</>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Asosiy umumiy qobiq */}
      <Route path="/" element={<MainLayout />}>
        {/* Public Sahifalar (Hamma ko'ra oladi) */}
        <Route index element={<BlogListPage />} />
        <Route
          path="blog/:id"
          element={<div>Blog batafsil ko'rish sahifasi</div>}
        />
        <Route path="blog/:id" element={<BlogDetailPage />} />

        {/* Faqat mehmonlar uchun sahifalar */}
        <Route
          path="login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="register"
          element={
            <AuthRoute>
              <RegisterPage />
            </AuthRoute>
          }
        />
        <Route
          path="verify-otp"
          element={
            <AuthRoute>
              <VerifyOtpPage />
            </AuthRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <AuthRoute>
              <ForgotPasswordPage />
            </AuthRoute>
          }
        />
        <Route
          path="reset-password"
          element={
            <AuthRoute>
              <ResetPasswordPage />
            </AuthRoute>
          }
        />

        {/* Himoyalangan sahifalar (Dashboard, Create Post) */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="create-post"
          element={
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Noto'g'ri URL kiritilsa bosh sahifaga otadi */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
