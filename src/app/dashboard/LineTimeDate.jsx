"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

export default function LineTimeDate() {
  const [lineData, setLineData] = useState(null);
  const [lineOptions, setLineOptions] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"))?.access;

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/time_of_day_sales/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        setLineData(json.data);
        setLineOptions(json.options);
      } catch (err) {
        console.error("Failed to fetch line chart data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container w-[600px] h-[400px] mx-auto py-10">
      {lineData && lineOptions ? (
        <Line data={lineData} options={lineOptions} />
      ) : (
        <p className="text-center text-gray-500">Loading Line Chart...</p>
      )}
    </div>
  );
}
