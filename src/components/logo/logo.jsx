"use client";
import { Button, Form, Input, message, Select } from "antd";
import Image from "next/image";
import { useState } from "react";

export default function Logo() {
  const [overviewData, setOverviewData] = useState(null);
  const [dataAdded, setDataAdded] = useState(null);
  const [loading, setLoading] = useState(false);

  const reGenerate = async () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("user"))?.access;
    const data = await fetch("http://localhost:8000/api/generate-logo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(overviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        setDataAdded(data);
        message.success("Logo Regenerated successfully!");
      })
      .catch((error) => console.error("Error:", error));
  };
  
  const onFinish = async (value) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("user"))?.access;

    try {
      const res = await fetch("http://localhost:8000/api/generate-logo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
      });

      const data = await res.json();
      setOverviewData(value);
      setDataAdded(data);
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSlogan = async () => {
    const token = JSON.parse(localStorage.getItem("user"))?.access;

    try {
      const res = await fetch("http://localhost:8000/api/save-logo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const result = await res.json();
        message.error(result?.detail || "Failed to save Logo");
        return;
      }

      const result = await res.json();
      message.success("Logo saved successfully!");
      console.log("Saved:", result);
    } catch (error) {
      console.error("Error:", error);
      message.error("Error saving logo");
    }
  };

  const handleExportLogo = async () => {
    const token = JSON.parse(localStorage.getItem("user"))?.access;

    try {
      const res = await fetch("http://localhost:8000/api/download-logo/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        message.error("Failed to download logo");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "logo.jpg"; // Adjust the filename/extension as needed
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      message.success("Logo downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      message.error("An error occurred while downloading the logo.");
    }
  };

  return (
    <div className="mt-5 businessNameGeneratorWrraper">
      {!dataAdded ? (
        <>
          <h1>Logo Creation</h1>
          <h3 className="text-primary text-center text-[28px] py-5">
            Generate professional, custom logos tailored to your business
            <br />
            with our advanced AI technology
          </h3>
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "70%", margin: "0 auto" }}
          >
            <div className="grid grid-cols-2 gap-6 mt-16 mb-20">
              <Form.Item name="brand_name" required={false} label="">
                <Input placeholder="Business Name" />
              </Form.Item>
              <Form.Item name="slogan" required={false} label="">
                <Input placeholder="Slogan" />
              </Form.Item>
              <Form.Item
                name="style"
                required={false}
                label="Style Preferences"
              >
                <Select
                  options={[
                    { value: "Modern Minimalist", label: "Modern Minimalist" },
                    { value: "Vintage/Retro", label: "Vintage/Retro" },
                    { value: "Handmade/Organic", label: "Handmade/Organic" },
                    { value: "Futuristic", label: "Futuristic" },
                    { value: "Playful/Whimsical", label: "Playful/Whimsical" },
                    { value: "Elegant/Luxury", label: "Elegant/Luxury" },
                    { value: "Bold & Edgy", label: "Bold & Edgy" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="colors" required={false} label="Color">
                <Select
                  options={[
                    { value: "red", label: "Red" },
                    { value: "Green", label: "Green" },
                    { value: "blue", label: "Blue" },
                    { value: "yellow", label: "Yellow" },
                    { value: "purple", label: "Purple" },
                    { value: "orange", label: "Orange" },
                    { value: "pink", label: "Pink" },
                    { value: "black", label: "Black" },
                    { value: "white", label: "White" },
                  ]}
                />
              </Form.Item>
            </div>
            <Form.Item className="mt- flex justify-end">
              <Button type="primary" htmlType="submit" block loading={loading}>
                Generate
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div className="max-w-[940px] mx-auto py-16">
          <div className="bg-white p-3 border border-gray-200 rounded-2xl shadow-lg transform -translate-y-40">
            <h1>Your Logo</h1>
            {dataAdded?.image_url && (
              <div className="flex justify-center items-center w-full h-full my-5">
                <Image
                  src={`http://localhost:8000${dataAdded?.image_url}`}
                  alt="logo"
                  width={400}
                  height={103}
                  className="object-contain"
                  quality={100}
                  priority
                />
              </div>
            )}
            <div className="flex w-full justify-end items-end gap-5 pe-5 mt-10">
              <Button type="primary" className="!bg-white border !text-black" onClick={reGenerate}>
                ReGenerate
              </Button>
              <div className="flex flex-col gap-2">
                <Button
                  type="primary"
                  block
                  className="!w-24"
                  onClick={handleSaveSlogan}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  block
                  className="!w-24"
                  onClick={handleExportLogo}
                >
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
