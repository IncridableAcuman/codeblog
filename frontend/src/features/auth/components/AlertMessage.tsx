import React from "react";
import { motion } from "framer-motion";
import type { AlertMessageProps } from "../interfaces/AlertMessageProps";



export const AlertMessage: React.FC<AlertMessageProps> = ({ message, type }) => {
  const isSuccess = type === "success";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-3 text-sm rounded-lg text-center border ${
        isSuccess
          ? "text-green-600 bg-green-50 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900"
          : "text-red-600 bg-red-50 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900"
      }`}
    >
      {message}
    </motion.div>
  );
};