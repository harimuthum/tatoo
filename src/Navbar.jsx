// import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const profileURL = `/profile/${localStorage.getItem("_id")}`;
  const bookURL = `/book/${localStorage.getItem("_myUsername")}`;

  const handleLogout = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("_myEmail");
    navigate("/");
  };

  return (
    <nav className="navbar h-[10vh] w-full p-[3%] bg-[#c58940] flex flex-row justify-between items-center">
      <div className="navbar-brand w-[20%]">
        <h2 className="font-black text-2xl transition duration-500 ease-in-out hover:scale-105">
          Book-Me
        </h2>
      </div>
      <div className="navbar-center w-[70%] text-slate-800 font-bold ">
        <ul className="flex flex-row space-x-12 ">
          <li className="transition duration-500 ease-in-out hover:scale-110">
            <Link to={profileURL}>Profile</Link>
          </li>
          <li className="transition duration-500 ease-in-out hover:scale-110">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="transition duration-500 ease-in-out hover:scale-110">
            <Link to={bookURL}>Book-A-User</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end w-[10%]">
        <button
          className="bg-[#f7ede2] border-2 border-gray-600 rounded-md px-8 py-2 text-slate-800 font-bold transition duration-500 ease-in-out hover:bg-[#5c4223] hover:text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
