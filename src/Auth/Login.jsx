import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TbLoader3 } from "react-icons/tb";
import { API_URL } from "../api/apiUrl"; 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/user/user-log-in`,
        { email, password },
      );
      localStorage.setItem("user-auth-token",res.data.token)
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="w-1/2 bg-cover bg-center hidden lg:block"
        style={{ backgroundImage: "url('src/assets/loginImage.png')" }}
      ></div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-md space-y-6 text-center">
          <img src="src/assets/Logo.png" alt="Logo" className="mx-auto w-24" />
          <h2 className="text-xl font-semibold">Login to your account</h2>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a href="#" className="text-xs text-gray-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className={`w-full bg-blue-700 text-white py-3 rounded-md flex items-center justify-center gap-2 transition-opacity ${
                isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
              }`}
            >
              {isDisabled && <TbLoader3 className="animate-spin text-white" size={24} />}
              {isDisabled ? "Logging in..." : "Continue"}
            </button>
          </form>

          <div className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-700 font-medium hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
