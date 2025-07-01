"use client";
import React from "react";
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
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import PieChart from "./PieChart";
import BarProfitAnalysis from "./BarProfitAnalysis";
import BarRevenue from "./BarRevenue";
import BarSales from "./BarSales";
import LineSalesOverTime from "./LineSalesOverTime";
import LineTimeDate from "./LineTimeDate";
import HorizontalBarSellingProduct from "./HorizontalBarSellingProduct";
import DoughnutSales from "./DoughnutSales";
import BarCustomerSegment from "./BarCustomerSegment";

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

const page = () => {
  // Chart 1 - Sales over a Day (Bar)
  const salesOverDay = {
    labels: ["10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"],
    datasets: [
      {
        label: "Sales Quantity",
        data: [5, 7, 6, 25, 500, 30, 6, 4],
        backgroundColor: "#337ab7",
      },
    ],
  };

  // Chart 2 - Monthly Sales Trend (Line)
  const monthlySales = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    datasets: [
      {
        label: "Total Sales",
        data: [90, 160, 250, 120, 300, 380],
        fill: true,
        backgroundColor: "rgba(51,122,183,0.2)",
        borderColor: "#337ab7",
      },
    ],
  };

  // Chart 3 - Revenue by Segment (Bar)
  const revenueSegment = {
    labels: ["Enterprise", "SMB", "Individual"],
    datasets: [
      {
        label: "Revenue",
        data: [15000, 9000, 4000],
        backgroundColor: ["#337ab7", "#5cb85c", "#f0ad4e"],
      },
    ],
  };

  // Chart 4 - Doughnut Total Orders
  const doughnutOrders = {
    labels: ["Processed", "Pending"],
    datasets: [
      {
        data: [498, 102],
        backgroundColor: ["#5cb85c", "#f0ad4e"],
      },
    ],
  };

  // Chart 5 - Product Orders (Grouped Bar)
  const productOrders = {
    labels: ["Product A", "Product B", "Product C"],
    datasets: [
      {
        label: "Online Order",
        data: [30, 60, 90],
        backgroundColor: "#5bc0de",
      },
      {
        label: "In-Store Order",
        data: [20, 40, 70],
        backgroundColor: "#d9534f",
      },
    ],
  };

  // Chart 6 - Profit Analysis (Bar)
  const profitAnalysis = {
    labels: [
      "Gaming Laptop",
      "Vacuum",
      "Smart TV",
      "Speaker",
      "Product A",
      "Product B",
      "Product C",
    ],
    datasets: [
      {
        label: "Profit",
        data: [220000, 180000, 110000, 80000, 20000, 5000, 2000],
        backgroundColor: "#f0ad4e",
      },
      {
        label: "Net Revenue",
        data: [180000, 140000, 100000, 60000, 15000, 4000, 1800],
        backgroundColor: "#5cb85c",
      },
    ],
  };

  // Chart 7 - Sales by City (Bar + Line)
  const salesCity = {
    labels: ["Chicago", "Atlanta", "Houston", "Seattle", "NYC"],
    datasets: [
      {
        type: "bar",
        label: "Revenue",
        data: [40000, 35000, 30000, 15000, 10000],
        backgroundColor: "#337ab7",
      },
      {
        type: "line",
        label: "Number of Sales Items",
        data: [30, 28, 25, 18, 10],
        borderColor: "#d9534f",
        backgroundColor: "#d9534f",
      },
    ],
  };

  // Chart 8 - Units Sold (Horizontal Bar)
  const unitsSold = {
    labels: [
      "Gaming Laptop",
      "Vacuum",
      "Smart TV",
      "Speaker",
      "Product A",
      "Product B",
      "Smart Thermostat",
    ],
    datasets: [
      {
        label: "Units Sold",
        data: [128, 94, 82, 62, 48, 30, 14],
        backgroundColor: "#5cb85c",
      },
    ],
  };

  // Chart 9 - Customer Satisfaction (Pie)
  const customerSatisfaction = {
    labels: [
      "Could be better",
      "Satisfied",
      "Highly recommended",
      "Good product",
    ],
    datasets: [
      {
        data: [39, 24, 20, 17],
        backgroundColor: ["#f0ad4e", "#5bc0de", "#5cb85c", "#337ab7"],
      },
    ],
  };

  return (
    <div className="container w-[600px] mx-auto">
      {/* <Bar data={salesOverDay} />
      <Line data={monthlySales} />
      <Bar data={revenueSegment} />
      <Doughnut data={doughnutOrders} />
      <Bar data={productOrders} />
      <Bar data={profitAnalysis} />
      <Bar data={salesCity} />
      <Bar
        data={unitsSold}
        options={{
          indexAxis: "y",
        }}
      /> */}
      {/* <Pie data={customerSatisfaction} /> */}
      <h1>Dashboard</h1>
      <PieChart />
      <BarProfitAnalysis />
      <BarRevenue />
      <BarSales />
      <LineSalesOverTime />
      <LineTimeDate />
      <HorizontalBarSellingProduct />
      <DoughnutSales />
      <BarCustomerSegment />
    </div>
  );
};

export default page;
