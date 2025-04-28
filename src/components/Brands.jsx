import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import BrandContext from "../context/brandContext/brandContext";

const Brands = () => {
  const { brands } = useContext(BrandContext);

  return (
    <>
      {brands.map((brand, idx) => (
        <li key={idx}>
          <Link className="focus:text-green-400 active:text-green-400 text-black hover:text-white text-md flex items-center hover:bg-gray-900 rounded px-4 py-3 transition-all">
            <span className="w-[22px] h-[22px] mr-4">{brand.icon}</span>
            <span>{brand.name}</span>
          </Link>
        </li>
      ))}
    </>
  );
};

export default Brands;
