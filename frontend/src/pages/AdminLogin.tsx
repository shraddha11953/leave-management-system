import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { toast } from "react-toastify";

export default function AdminLogin() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/admin/login",
                {
                    username,
                    password
                }
            );

            localStorage.setItem(
                "admin",
                JSON.stringify(response.data)
            );

            toast.success("Admin Login Successful");

            navigate("/admin/dashboard");

        }
        catch {

            toast.error("Invalid Username or Password");

        }

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex justify-center items-center">

            <div className="bg-white shadow-2xl rounded-2xl p-10 w-[430px]">

                <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">

                    Admin Login

                </h1>

                <p className="text-center text-gray-500 mb-8">

                    Login using your administrator credentials

                </p>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    <input

                        type="text"

                        placeholder="Username"

                        value={username}

                        onChange={(e) => setUsername(e.target.value)}

                        className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"

                        required

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                        className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"

                        required

                    />

                    <button

                        type="submit"

                        className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 duration-300"

                    >

                        Login

                    </button>

                </form>

                <button

                    onClick={() => navigate("/")}

                    className="mt-6 w-full border rounded-lg py-3 hover:bg-gray-100"

                >

                    Back To Home

                </button>

            </div>

        </div>

    );

}