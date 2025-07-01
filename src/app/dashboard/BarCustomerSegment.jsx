"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

export default function BarCustomerSegment() {
  const [barData, setBarData] = useState(null);
  const [barOptions, setBarOptions] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"))?.access;

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/customer_segment_vs_sales_channel/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        setBarData(json.data);
        setBarOptions(json.options);
      } catch (err) {
        console.error("Failed to fetch profit analysis", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container w-[600px] mx-auto py-10">
      {barData && barOptions ? (
        <Bar data={barData} options={barOptions} />
      ) : (
        <p className="text-center text-gray-500">Loading Bar Chart...</p>
      )}
    </div>
  );
}
