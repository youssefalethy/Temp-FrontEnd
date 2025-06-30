"use client";
import React, { useEffect } from "react";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Spin } from "antd";

export default function Page() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    status: "success",
    history: [],
  });

  const getHistory = async () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("user"))?.access;
    try {
      const res = await fetch("http://localhost:8000/api/history/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  if (loading) return <Spin />;

  return (
    <div className="container mx-auto">
      <h1 className="mb-10 font-bold text-[#2E4056]">History</h1>

      {data.history.map((item, index) => (
        <div
          key={index}
          className="border rounded-lg shadow-sm p-4 mb-6 bg-white max-w-4xl mx-auto"
        >
          <h2 className="text-sm font-semibold text-[#2E4056]">
            {item.activity_type.replace(/_/g, " ")}
          </h2>
          <p className="text-[#555] text-sm mt-2">
            {item?.activity_data?.saved_slogan ||
              JSON.stringify(item?.activity_data) ||
              "No description"}
          </p>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mt-4 border-t pt-3">
            <span className="flex items-center gap-1">
              <CalendarOutlined /> {dayjs(item.timestamp).format("YYYY-MM-DD")}
            </span>
            <span className="flex items-center gap-1">
              <UserOutlined /> User
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
