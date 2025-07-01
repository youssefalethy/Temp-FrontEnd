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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

// Register chart components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels
);

export default function HorizontalBarSellingProduct() {
  const [barData, setBarData] = useState(null);
  const [barOptions, setBarOptions] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"))?.access;

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/selling-products/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        const dataset = json.data?.datasets?.[0];

        // Handle single bar case
        if (dataset?.data?.length === 1) {
          dataset.barThickness = 40;

          // Set a single color
          if (Array.isArray(dataset.backgroundColor)) {
            dataset.backgroundColor = dataset.backgroundColor[0];
          }

          // Add dummy spacing around Y axis
          json.data.labels = ["", ...json.data.labels, ""];
          dataset.data = [0, ...dataset.data, 0];
        }

        // Fix axis styles to ensure ticks & labels show
        json.options.scales = {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Units Sold",
              color: "#2d3436",
              font: { size: 16 },
            },
            ticks: {
              display: true,
              color: "#2d3436",
              font: { size: 14 },
              callback: (value) => `${value} units`,
            },
            grid: {
              color: "#e0e0e0",
              drawBorder: true,
            },
          },
          y: {
            title: {
              display: true,
              text: "Products",
              color: "#2d3436",
              font: { size: 16 },
            },
            ticks: {
              display: true,
              color: "#2d3436",
              font: { size: 14 },
              mirror: false,
            },
            grid: {
              display: false,
            },
          },
        };

        // Tooltip
        const tooltip = json.options.plugins?.tooltip?.callbacks;
        if (tooltip) {
          if (typeof tooltip.title === "string") {
            tooltip.title = new Function("context", "return context[0].label;");
          }
          if (typeof tooltip.label === "string") {
            tooltip.label = new Function(
              "context",
              "return context.formattedValue + ' units';"
            );
          }
        }
        json.options.plugins.tooltip.displayColors = false;

        // Data labels
        const datalabels = json.options.plugins?.datalabels;
        if (datalabels?.formatter && typeof datalabels.formatter === "string") {
          datalabels.formatter = new Function("value", "return value + ' units';");
        }
        json.options.plugins.datalabels = {
          ...datalabels,
          display: true,
        };

        setBarData(json.data);
        setBarOptions(json.options);
      } catch (err) {
        console.error("Failed to fetch chart data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container w-[800px] h-[450px] mx-auto py-10">
      {barData && barOptions ? (
        <Bar data={barData} options={barOptions} plugins={[ChartDataLabels]} />
      ) : (
        <p className="text-center text-gray-500">Loading Chart...</p>
      )}
    </div>
  );
}
