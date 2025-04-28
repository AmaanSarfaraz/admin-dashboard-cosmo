import React, { useState, useEffect } from "react";
import BrandContext from "./brandContext";
import {
  MdOutlineDashboard,
  MdInsertChart,
  MdOutlineCalendarToday,
  MdTableChart,
  MdDashboard,
} from "react-icons/md";
// import axios from "axios";

const BrandContextProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);

  const fetchBrands = async () => {
    try {
      const demoBrands = [
        {
          icon: <MdOutlineDashboard size={20} />,
          name: "Dashboard",
          date: "2025-04-25",
        },
        {
          icon: <MdInsertChart size={20} />,
          name: "Hawkins",
          date: "2025-04-24",
        },
        {
          icon: <MdInsertChart size={20} />,
          name: "Sunflame",
          date: "2025-04-24",
        },
        {
          icon: <MdOutlineCalendarToday size={20} />,
          name: "Hettich",
          date: "2025-04-23",
        },
        {
          icon: <MdTableChart size={20} />,
          name: "Panasonic",
          date: "2025-04-22",
        },
        {
          icon: <MdDashboard size={20} />,
          name: "Settings",
          date: "2025-04-21",
        },
      ];

      setBrands(demoBrands);
    } catch (error) {
      console.log(`Failed to fetch brands: ${error}`);
    }
  };

  const addBrand = async (brandName, icon) => {
    try {
      // await axios.post(`${url}`, { name: brandName });
      // setBrands((prev) => [...prev, { name: brandName, icon }]);
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
