import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserFriends, FaDollarSign, FaBell, FaTasks } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import axios from "axios";
import BrandContext from "../context/brandContext/brandContext.js";
import Brands from "./Brands.jsx";
import PhotoGallery from "./PhotoGallery.jsx";
import UploadPhoto from "./AddPhoto.jsx";

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
      icon: <FaTasks size={24} />,
      label: "Total Products",
      value: "10",
      color: "bg-blue-500",
    },
    {
      icon: <FaDollarSign size={24} />,
      label: "Low Stock Alerts",
      value: "$32,384",
      color: "bg-green-600",
    },
    {
      icon: <FaBell size={24} />,
      label: "Recently Added Products",
      value: "9 New",
      color: "bg-yellow-400",
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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-800 text-white p-6 rounded">
            <h2 className="text-xl font-bold mb-4">Recently Added Brands</h2>
            <ul className="space-y-3">
              {brands.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className="text-sm text-gray-400">{item.date}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded text-center text-white">
              <PhotoGallery />
            </div>
            <div className="rounded text-center text-black grid grid-rows-[1fr_2fr] h-96 gap-4">
              <div className="bg-amber-300">
                <h1>Add Photo</h1>
              </div>
              <div className="bg-blue-400">
                <h1>Delete Photo</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
