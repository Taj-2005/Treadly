'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logging, setLogging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLogging(true);
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    let hasError = false;

    if (!email) {
      setEmailError("Please enter your email.");
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      hasError = true;
    }

    if (hasError) {
      setLogging(false);
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      const errMsg = data.error || "Login failed. Please try again.";
      setGeneralError(errMsg);
      toast.error(errMsg);
      setLogging(false);
      return;
    }

    localStorage.setItem("token", data.token);
    toast.success("Logged in successfully!");
    router.push("/home");
  }

  return (
    <div className="min-h-screen bg-[#fef7f1] flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#bfa48f] rounded-2xl mb-4 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute z-100 left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-black w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                {emailError && (
                  <p className="text-red-500 text-sm ml-1">{emailError}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Password</label>
                <div className="relative">
                  <Lock className="absolute z-100 left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="text-black w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm ml-1">{passwordError}</p>
                )}
              </div>

              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-[#bfa48f] hover:underline hover:text-orange-700 font-medium transition-colors">
                  Forgot your password?
                </Link>
              </div>

              {generalError && (
                <p className="text-red-600 text-sm text-center">{generalError}</p>
              )}

              <button
                type="submit"
                disabled={logging}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 transform ${
                  logging 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#bfa48f] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {logging ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="animate-spin h-5 w-5" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-500 bg-white rounded-full">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="font-semibold text-[#bfa48f] hover:underline hover:text-orange-700 transition-colors">
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <span className="text-[#bfa48f] hover:underline">Terms of Service</span>
            {" "}and{" "}
            <span className="text-[#bfa48f] hover:underline">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
