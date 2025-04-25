import React, { useState, useEffect } from "react";
import BrandContext from "./brandContext";
import {
  MdOutlineDashboard,
  MdInsertChart,
  MdOutlineCalendarToday,
  MdTableChart,
  MdDashboard,
} from "react-icons/md";
// import axios from "axios"; // keep commented out if you're not testing with backend yet

const BrandContextProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);

  const fetchBrands = async () => {
    try {
      // Fake data for local testing (replace with real API call later)
      const demoBrands = [
        { icon: <MdOutlineDashboard size={20} />, name: "Dashboard" },
        { icon: <MdInsertChart size={20} />, name: "Hawkins" },
        { icon: <MdInsertChart size={20} />, name: "Sunflame" },
        { icon: <MdOutlineCalendarToday size={20} />, name: "Hettich" },
        { icon: <MdTableChart size={20} />, name: "Panasonic" },
        { icon: <MdDashboard size={20} />, name: "Settings" },
      ];
      setBrands(demoBrands);
    } catch (error) {
      console.log(`Failed to fetch brands: ${error}`);
    }
  };

  const addBrand = async (brandName, icon) => {
    try {
      // await axios.post(`${url}`, { name: brandName });
      setBrands((prev) => [...prev, { name: brandName, icon }]); // mock add
    } catch (error) {
      console.log("Failed to add brand:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <BrandContext.Provider value={{ brands, fetchBrands, addBrand }}>
      {children}
    </BrandContext.Provider>
  );
};

export default BrandContextProvider;
