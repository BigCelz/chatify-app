import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MailIcon, MessageCircleIcon, UserIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900 h-screen">
      <div className="relative w-full max-w-6xl h-[650px] md:h-[700px]">
        <div className="w-full h-full flex flex-col md:flex-row">
          {/* left side - Form */}
          <div className="md:w-1/2 flex items-center justify-center p-8 md:border-r border-slate-600/30">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <MessageCircleIcon className="w-12 h-12 mx-auto text-cyan-400 mb-4" />
                <h2 className="text-3xl font-bold text-slate-200 mb-2">
                  Create Account
                </h2>
                <p className="text-slate-400">Signup for a new account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="auth-input-label">Full Name</label>
                  <div className="relative">
                    <UserIcon className="auth-input-icon" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="input"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="auth-input-label">Email</label>
                  <div className="relative">
                    <MailIcon className="auth-input-icon" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="input"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="auth-input-label">Password</label>
                  <div className="relative">
                    <LockIcon className="auth-input-icon" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="input"
                      placeholder="*********"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="auth-btn mt-2"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? "Signing up..." : "Sign Up"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/login" className="auth-link">
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </div>

          {/* right side - Image */}
          <div className="md:w-1/2 hidden md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
            <div>
              <img
                src="/signup1.png"
                alt="Signup illustration"
                className="w-full h-auto object-contain "
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-medium text-cyan-400">
                  Start Your Journey Today.
                </h3>

                <div className="mt-4 flex justify-center gap-4">
                  <span className="auth-badge">Free</span>
                  <span className="auth-badge">Easy Setup</span>
                  <span className="auth-badge">Private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
