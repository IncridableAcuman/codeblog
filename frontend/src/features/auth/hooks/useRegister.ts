import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/api";

export const useRegister = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Kiritilgan parollar bir-biriga mos kelmadi!");
      return;
    }

    setIsLoading(true);

    try {
      await axiosInstance.post("/auth/register", { fullName, email, password });
      navigate("/verify-otp", { state: { email, from: "register" } });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fullName, setFullName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    showPassword, setShowPassword,
    error,
    isLoading,
    handleSubmit
  };
};