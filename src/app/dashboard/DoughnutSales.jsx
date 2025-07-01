"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function DoughnutSales() {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"))?.access;

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/sales_by_channel/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        setChartData(json.data);
        setChartOptions(json.options);
      } catch (err) {
        console.error("Failed to fetch doughnut chart data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container w-[500px] h-[400px] mx-auto py-10">
      {chartData && chartOptions ? (
        <Doughnut data={chartData} options={chartOptions} />
      ) : (
        <p className="text-center text-gray-500">Loading Doughnut Chart...</p>
      )}
    </div>
  );
}
