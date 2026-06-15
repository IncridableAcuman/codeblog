import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/api";

export const useResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = location.state?.token;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Xavfsizlik: Token bo'lmasa login sahifasiga qaytarish
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Parollar bir-biriga mos kelmadi!");
      return;
    }

    setIsLoading(true);

    try {
      await axiosInstance.post("/auth/reset-password", {
        token,
        password,
        confirmPassword
      });

      setSuccess("Parolingiz muvaffaqiyatli yangilandi! Login sahifasiga o'tyapsiz...");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Parolni yangilashda xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    password, setPassword,
    confirmPassword, setConfirmPassword,
    showPassword, setShowPassword,
    error,
    success,
    isLoading,
    handleSubmit
  };
};