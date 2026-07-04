import { useState } from "react";

import api from "../services/api";
import { toast } from "react-toastify";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
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

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await await api.post(
    "/employee/register",
        {
          username: formData.username,
          full_name: formData.full_name,
          email: formData.email,
          department: formData.department,
          password: formData.password,
        }
      );

      toast.success("Registration Successful");

      onClose();
    } catch (err) {
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-lg p-8 w-[500px]">

        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Employee Registration
        </h2>

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >

          <input
            name="username"
            placeholder="Username"
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
            required
          />

          <input
            name="full_name"
            placeholder="Full Name"
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
            required
          />

          <input
            name="department"
            placeholder="Department"
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-3 mt-5">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Register
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default RegisterModal;