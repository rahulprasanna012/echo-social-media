import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";

export default function App() {
  return (
    <Routes>
      {/* All pages share MainLayout */}
      <Route element={<MainLayout />}>
        {/* Default (/) */}
        <Route index element={<HomePage />} />
        {/* Explicit /home */}
        <Route path="home" element={<HomePage />} />
        <Route path="create" element={<CreatePage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Fallback: anything else -> /home */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
