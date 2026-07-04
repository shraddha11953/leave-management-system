import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import api from "../services/api";
import { toast } from "react-toastify";

import "./AdminLogin.css";

export default function AdminLogin() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {

        e.preventDefault();

        try {

            const response = await api.post("/admin/login", {
                username,
                password,
            });

            localStorage.setItem(
                "admin",
                JSON.stringify(response.data)
            );

            toast.success("Admin Login Successful");

            navigate("/admin/dashboard");

        } catch {

            toast.error("Invalid Username or Password");

        }

    };

    return (

        <div className="admin-page">

            {/* Background */}

            <div className="blur blur1"></div>

            <div className="blur blur2"></div>

            <div className="blur blur3"></div>

            <div className="login-card">
                <button
  className="back-btn"
  onClick={() => navigate("/")}
>
  ← Back to home
</button>

                <div className="login-icon">

                    <ShieldCheck size={45} />

                </div>

                <h1>

                    Admin Login

                </h1>

                <p>

                    Welcome back! Login to continue.

                </p>

                <form
                    onSubmit={handleLogin}
                >

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

                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}

                        </button>

                    </div>

                    <button
                        className="login-btn"
                        type="submit"
                    >

                        Login

                    </button>

                </form>

                

            </div>

        </div>

    );

}