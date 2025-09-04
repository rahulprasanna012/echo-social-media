import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import EditProfilePage from "./pages/EditProfilePage";
import MessagePage from "./pages/MessagePage";
import LoginForm from "./components/auth/LoginForm";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <Routes>
      {/* All pages share MainLayout */}

      <Route path="login" element={<AuthPage />} />
      <Route element={<MainLayout />}>
        {/* Default (/) */}
        <Route index element={<HomePage />} />
        {/* Explicit /home */}
        <Route path="home" element={<HomePage />} />
        <Route path="create" element={<CreatePage />} />
        <Route path="profile" element={<ProfilePage />} />
         <Route path="edit-profile" element={<EditProfilePage />} />
         <Route path="message" element={<MessagePage />} />
      </Route>

      {/* Fallback: anything else -> /home */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
