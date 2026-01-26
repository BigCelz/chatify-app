import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";


function App() {
  const {checkAuth, authUser, isCheckingAuth} = useAuthStore();

  useEffect(()=> {
    checkAuth()
  },[])

  if(isCheckingAuth) return <PageLoader />

  console.log(authUser)

  return (
  <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-900">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
    {/* Glow blobs */}
    <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-[120px]" />
    <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-[120px]" />

    <div className="relative z-10 w-full">
      <Toaster/>
      <Routes>
        <Route path="/" element={ authUser ? <ChatPage /> : <Navigate to={'/login'}/>} />
        <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to={'/'}/>} />
        <Route path="/signup" element={ !authUser ? <SignUpPage /> : <Navigate to={'/'}/>} />
      </Routes>
    </div>
  </div>
);

}

export default App;
