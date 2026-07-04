import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { toast } from "react-toastify";
import RegisterModal from "../components/RegisterModal";

export default function EmployeeLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openRegister, setOpenRegister] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/employee/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "employee",
        JSON.stringify(response.data)
      );

      toast.success("Login Successful");

      navigate("/employee/dashboard");
    } catch (error) {
      toast.error("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-[420px]">

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Employee Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-gray-600">
            New Employee?
          </p>

          <button
  onClick={() => setOpenRegister(true)}
  className="text-blue-600 font-semibold mt-2 hover:underline"
>
  Register Here
</button>

        </div>
        <RegisterModal
  isOpen={openRegister}
  onClose={() => setOpenRegister(false)}
/>

      </div>

    </div>
  );
}