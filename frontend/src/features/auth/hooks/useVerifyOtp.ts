import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/api";

export const useVerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const from = location.state?.from || "register";

  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length < 4) {
      setError("Iltimos, barcha kataklarni to'ldiring.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      if (from === "forgot-password") {
        const response = await axiosInstance.post("/auth/verify-forgot-password", { 
          email, 
          code: fullOtp 
        });
        const resetToken = response.data.accessToken; 
        navigate("/reset-password", { state: { email, token: resetToken } });
      } else {
        await axiosInstance.post("/auth/verify-register", { 
          email, 
          code: fullOtp 
        });
        navigate("/login");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Kodni tasdiqlashda xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError("");
    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      setTimer(60);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError("Kodni qayta yuborishda xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    otp,
    isLoading,
    error,
    timer,
    inputRefs,
    handleChange,
    handleKeyDown,
    handleSubmit,
    handleResend,
  };
};