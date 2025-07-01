"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Pie } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

export default function PieChart() {
  const [pieData, setPieData] = useState(null);
  const [pieOptions, setPieOptions] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"))?.access;

    const fetchPieData = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/customer_feedback_analysis/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const json = await res.json();

        const options = json.options || {};

        if (
          options?.plugins?.tooltip?.callbacks?.label &&
          typeof options.plugins.tooltip.callbacks.label === "string"
        ) {
          options.plugins.tooltip.callbacks.label = function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value} feedbacks`;
          };
        }

        setPieData(json.data);
        setPieOptions(options);
      } catch (err) {
        console.error("Failed to fetch pie chart data", err);
      }
    };

    fetchPieData();
  }, []);

  return (
    <div className="container w-[600px] mx-auto py-10 space-y-10">
      {pieData && pieOptions ? (
        <Pie data={pieData} options={pieOptions} />
      ) : (
        <p className="text-center text-gray-500">Loading Pie Chart...</p>
      )}
    </div>
  );
}
