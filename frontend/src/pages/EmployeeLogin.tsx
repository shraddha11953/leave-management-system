import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Users,
} from "lucide-react";

import api from "../services/api";
import { toast } from "react-toastify";
import RegisterModal from "../components/RegisterModal";

import "./EmployeeLogin.css";

export default function EmployeeLogin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [openRegister, setOpenRegister] = useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {

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

    } catch {

      toast.error("Invalid Username or Password");

    }

  };

  return (

    <>

      <div className="employee-page">
        

        <div className="blur blur1"></div>


        <div className="blur blur2"></div>

        <div className="blur blur3"></div>

        <div className="login-card">
          <button
  className="back-btn"
  onClick={() => navigate("/")}
>
  ← Back
</button>

          <div className="login-icon">

            <Users size={45} />

          </div>

          <h1>

            Employee Login

          </h1>

          <p>

            Welcome back! Login to continue.

          </p>

          <form
            onSubmit={handleLogin}
          >

            {/* Username */}

            <div className="input-group">

              <User size={20} />

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
              />

            </div>

            {/* Password */}

            <div className="input-group">

              <Lock size={20} />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >

                {
                  showPassword
                    ? <EyeOff size={20} />
                    : <Eye size={20} />
                }

              </button>

            </div>

            <button
              type="submit"
              className="login-btn"
            >

              Login

            </button>

          </form>

          <div className="divider">

            <span>

              OR

            </span>

          </div>

          <p className="register-text">

            Don't have an account?

          </p>

          <button
            className="register-btn"
            onClick={() =>
              setOpenRegister(true)
            }
          >

            Create New Account

          </button>

          

        </div>

      </div>

      <RegisterModal
        isOpen={openRegister}
        onClose={() =>
          setOpenRegister(false)
        }
      />

    </>

  );

}