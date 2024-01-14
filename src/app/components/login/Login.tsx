/* eslint-disable no-unused-vars */
"use client"
import { useState } from "react";
// import { Link } from "react-router-dom";
import { handleLogin } from "@/utils/resource"
import { usePathname } from 'next/navigation';
import Link from "next/link";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//   const navigate = useNavigate();
  const pathname = usePathname();
  console.log('s',pathname);
 
  const handleSubmit = (e:any) => {
    if (username.trim() && password.trim()) {
      e.preventDefault();
      //👇🏻 accepts the user's password and email
      handleLogin({username, password,pathname});
      console.log({ username, password });
      setPassword("");
      setUsername("");
    }
  };

  return (
    <main className="w-full min-h-[100vh] flex flex-col items-center justify-center">
      <form
        className="w-full min-h-[100vh] flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-[2%] font-bold text-3xl">Log into your account</h2>
        <label htmlFor="username" className="font-bold text-xl">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="username w-[60%] border-2 border-gray-400"
        />
        <label htmlFor="password" className="font-bold text-xl">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password w-[60%] border-2 border-gray-400"
        />
        <button className="w-[200px] p-[15px] bg-[#e28521] rounded-md px-8 py-2 text-slate-800 font-bold transition duration-500 ease-in-out hover:bg-[#5c4223] hover:text-white">
          LOG IN
        </button>
        <p className="text-center my-8 flex flex-row">
          {"Don't have an account?  "}
          <div className="ml-1 transition duration-500 ease-in-out hover:scale-105 ">
            <Link className="font-bold" href="/signup">
              Create one
            </Link>
          </div>
        </p>
      </form>
    </main>
  );
};

export default Login;
