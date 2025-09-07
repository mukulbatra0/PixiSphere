import React from "react";
import { motion } from "framer-motion";

/**
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children
 * @property {"primary" | "secondary" | "outline"} [variant="primary"]
 * @property {"sm" | "md" | "lg"} [size="md"]
 * @property {() => void} [onClick]
 * @property {boolean} [fullWidth=false]
 * @property {"button" | "submit" | "reset"} [type="button"]
 * @property {boolean} [disabled=false]
 */

/**
 * @param {ButtonProps} props
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  fullWidth = false,
  type = "button",
  disabled = false,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-primary text-white hover:bg-primary-600 focus:ring-primary-500",
    secondary:
      "bg-secondary text-white hover:bg-secondary-600 focus:ring-secondary-500",
    outline:
      "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-primary-500",
  }[variant];

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }[size];

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${disabledClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button;