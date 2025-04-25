import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserFriends,
  FaDollarSign,
  FaBell,
  FaTasks,
  FaShoppingCart,
  FaCommentDots,
} from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineDashboard, MdMenu } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import axios from "axios";
import BrandContext from "../context/brandContext/brandContext.js";
import Brands from "./Brands.jsx";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");
  const { brands } = useContext(BrandContext);
  const navigateTo = useNavigate();

  const stats = [
    {
      icon: <FaUserFriends size={24} />,
      label: "Companies",
      value: `${brands.length}`,
      color: "bg-gray-700",
    },
    {
      icon: <FaDollarSign size={24} />,
      label: "Revenue",
      value: "$32,384",
      color: "bg-green-600",
    },
    {
      icon: <FaBell size={24} />,
      label: "Alerts",
      value: "9 New",
      color: "bg-yellow-400",
    },
    {
      icon: <FaTasks size={24} />,
      label: "Tasks",
      value: "10",
      color: "bg-blue-500",
    },
    {
      icon: <FaShoppingCart size={24} />,
      label: "Orders",
      value: "24",
      color: "bg-red-400",
    },
    {
      icon: <FaCommentDots size={24} />,
      label: "Mentions",
      value: "96",
      color: "bg-purple-500",
    },
  ];

  const handleLogout = async (e) => {
    e.preventDefault;
    try {
      // await axios.post(`${url}`, { withCredentials: true });
      localStorage.removeItem("token");
      navigateTo("/login");
    } catch (error) {
      console.log(`error occured while logging out ${error}`);
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white text-[#450874c2] flex flex-col">
        <div className="flex flex-col items-center py-6 border-b border-gray-700">
          <FaUserCircle className="text-6xl" />
          <p className="text-sm mt-2 text-gray-400">Logged in as</p>
          <h2 className="mt-1 font-semibold">John Smith</h2>
        </div>
        <ul className="flex-1 p-4 space-y-4">
          <Brands />

          <hr className=" my-6 border-gray-600" />
          <li onClick={handleLogout}>
            <Link className="focus:text-red-400 text-black hover:text-red-500 text-md flex items-center rounded px-10 transition-all">
              <span className="text-xl">Logout</span>
              <IoMdLogOut className="w-[22px] h-[22px] ml-4" />
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <h1 className="text-[#450874c2] text-2xl font-bold">COSMOS HOUSE</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center p-4 rounded text-white ${stat.color}`}
            >
              {stat.icon}
              <h2 className="mt-2 text-lg">{stat.label}</h2>
              <p className="font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <div className="col-span-2 bg-green-500 p-6 rounded text-white flex flex-col">
            <h2 className="text-xl font-bold">$ Revenue Breakdown</h2>
            <p className="mt-2">
              Today: <span className="font-semibold">$324.20</span> - Week:{" "}
              <span className="font-semibold">$1,230.43</span>
            </p>
          </div>
          <div className="bg-gray-300 p-6 rounded flex flex-col">
            <h2 className="text-xl font-bold">Server Load</h2>
            <p className="mt-2 text-gray-700">130 GB of 1024 GB used</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-800 text-white p-6 rounded">
            <h2 className="text-xl font-bold mb-4">To-Do List</h2>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span>Software Update 2.1</span>
                <span className="text-sm text-gray-400">Yesterday</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Server #2 Hardware Upgrade</span>
                <span className="text-sm text-gray-400">9:53 AM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-yellow-400">Call Ticket #2032</span>
                <span className="text-sm text-gray-400">10:14 AM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-red-400">Emergency Maintenance</span>
                <span className="text-sm text-gray-400">10:20 AM</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-400 p-4 rounded text-center">
              Data Usage
            </div>
            <div className="bg-blue-500 p-4 rounded text-center text-white">
              Satisfaction Score
            </div>
            <div className="bg-red-400 p-4 rounded text-center">
              Bounce Rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
