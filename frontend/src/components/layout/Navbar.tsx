import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiSun, FiMoon, FiGlobe, FiLogOut } from "react-icons/fi";
import { UseTheme } from "../../context/ThemeContext";
import { UseAuth } from "../../context/AuthContext";
import axiosInstance from "../../services/api";

export const Navbar: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { theme, toggleTheme } = UseTheme();
  const { user,setUser } = UseAuth();


  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

const handleLogout = async () => {
  try {
    await axiosInstance.post("/auth/logout", {}); 
  } catch (error) {
    console.log("Backend logout error:", error);
  } finally {
    localStorage.removeItem("accessToken");
    if (setUser) setUser(null); 
    window.location.href = "/login";
  }
};

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
        >
          CodeBlog
        </Link>

        {/* O'ng tomon: Sozlamalar va Profil */}
        <div className="flex items-center gap-4">
          {/* Til o'zgartirgich */}
          <div className="relative group flex items-center gap-1 text-slate-600 dark:text-slate-300">
            <FiGlobe size={18} />
            <select
              value={i18n.language.substring(0, 2)}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-medium cursor-pointer"
            >
              <option value="uz" className="dark:bg-slate-800">
                UZ
              </option>
              <option value="en" className="dark:bg-slate-800">
                EN
              </option>
              <option value="ru" className="dark:bg-slate-800">
                RU
              </option>
            </select>
          </div>

          {/* Dark Mode Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-all"
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Dinamik Foydalanuvchi qismi */}
          {user?.isActive && user ? (
            <div className="flex items-center gap-3 border-l pl-4 border-slate-200 dark:border-slate-750">
              <Link to="/dashboard" className="flex items-center gap-2 group">
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20"
                />
                <span className="hidden md:inline text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-500">
                  {user.fullName.split(" ")[0]}
                </span>
              </Link>
              <button
                onClick={() => {
                  handleLogout()
                }}
                className="p-2 text-slate-400 hover:text-red-500 rounded-xl transition-colors"
                title="Chiqish"
              >
                <FiLogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm"
            >
              {t("entrance")}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
