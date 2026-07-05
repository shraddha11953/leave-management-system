import { useState } from "react";
import {
  User,
  Mail,
  Building2,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  X,
} from "lucide-react";

import api from "../services/api";
import { toast } from "react-toastify";

import "./RegisterModal.css";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({
  isOpen,
  onClose,
}: RegisterModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await api.post("/employee/register", {
        username: formData.username,
        full_name: formData.full_name,
        email: formData.email,
        department: formData.department,
        password: formData.password,
      });

      toast.success("Registration Successful");

      onClose();

      setFormData({
        username: "",
        full_name: "",
        email: "",
        department: "",
        password: "",
        confirmPassword: "",
      });

    } catch {

      toast.error("Registration Failed");

    }
  };

  return (
    <div className="register-overlay">

      <div className="register-card">

        {/* Close */}

        <button
          className="close-btn"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {/* Icon */}

        <div className="register-icon">

          <UserPlus size={42} />

        </div>

        <h2>

          Employee Registration

        </h2>

        <p>

          Create your employee account

        </p>

        <form onSubmit={handleRegister}>

          {/* Username */}

          <div className="input-group">

            <User size={19} />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />

          </div>

          {/* Full Name */}

          <div className="input-group">

            <User size={19} />

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />

          </div>

          {/* Email */}

          <div className="input-group">

            <Mail size={19} />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* Department */}

          <div className="input-group">

            <Building2 size={19} />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              required
            />

          </div>

          {/* Password */}

          <div className="input-group">

            <Lock size={19} />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              maxLength={50}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          {/* Confirm Password */}

          <div className="input-group">

            <Lock size={19} />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              maxLength={50}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          <div className="register-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="register-btn"
            >
              Register
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}