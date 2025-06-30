"use client";
import {
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Button, Form, message, Select } from "antd";
import { useState } from "react";

export default function BusinessNameGenerator() {
  const [data, setData] = useState(null); // store full API response
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState("");

  const onFinish = async (value) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("user")).access;

    try {
      const res = await fetch("http://localhost:8000/api/generate-brand-names/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify({
          ...value,
          businessname_keywords: [value.businessname_keywords],
        }),
      });

      const result = await res.json();
      setData(result);
      setFavorite(""); // clear selected favorite
      message.success("Brand names generated successfully!");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (name) => {
    setFavorite((prev) => (prev === name ? "" : name));
  };

  const handleReGenerate = async () => {
    if (!favorite) {
      message.warning("Please select a name to regenerate.");
      return;
    }

    const token = JSON.parse(localStorage.getItem("user")).access;
    const body = {
      business_id: data?.business?.business_id,
      base_name: favorite,
    };

    try {
      const res = await fetch("http://localhost:8000/api/regenerate-brand-names/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      setData(result);
      setFavorite("");
      message.success("Brand names regenerated successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSave = async () => {
    if (!favorite) {
      message.warning("Please select a name to save.");
      return;
    }

    const token = JSON.parse(localStorage.getItem("user")).access;
    const body = {
      business_id: data?.business?.business_id,
      saved_brandname: favorite,
    };

    try {
      const res = await fetch("http://localhost:8000/api/save-brand-name/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      message.success("Brand name saved successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-5 businessNameGeneratorWrraper">
      {!data ? (
        <>
          <h1>Business Name Generator</h1>
          <h3 className="text-primary text-center text-[28px] py-5 ">
            Generate the perfect business name in seconds with our <br />
            easy-to-use tool
          </h3>
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "70%", margin: "0 auto" }}
          >
            <div className="grid grid-cols-2 gap-6 mt-16 mb-20">
              <Form.Item
                name="businessname_keywords"
                required={false}
                label="KeyWords"
              >
                <Select
                  options={[
                    { value: "Excellence", label: "Excellence" },
                    { value: "Precision", label: "Precision" },
                    { value: "Unity", label: "Unity" },
                    { value: "Passion", label: "Passion" },
                    { value: "Impact", label: "Impact" },
                    { value: "Revolution", label: "Revolution" },
                    { value: "Pioneer", label: "Pioneer" },
                    { value: "Dynamic", label: "Dynamic" },
                    { value: "Elevate", label: "Elevate" },
                    { value: "Unstoppable", label: "Unstoppable" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="name_style"
                required={false}
                label="Name Style"
              >
                <Select
                  options={[
                    { value: "Compound Words", label: "Compound Words (e.g., SnapChat)" },
                    { value: "Alliteration", label: "Alliteration (e.g., PayPal)" },
                    { value: "Abstract", label: "Abstract (e.g., Nike)" },
                    { value: "Acronyms", label: "Acronyms (e.g., IBM)" },
                    { value: "Rhyming", label: "Rhyming (e.g., YouTube)" },
                    { value: "Blended Words", label: "Blended Words (e.g., Netflix)" },
                    { value: "Latin/Greek Roots", label: "Latin/Greek Roots (e.g., Volvo)" },
                    { value: "Nature-inspired", label: "Nature-inspired (e.g., Evergreen)" },
                    { value: "Tech-sounding", label: "Tech-sounding (e.g., ZenithX)" },
                    { value: "Short & Catchy", label: "Short & Catchy (e.g., Zoom)" },
                  ]}
                />
              </Form.Item>
            </div>

            <Form.Item className="mt- flex justify-end">
              <Button loading={loading} type="primary" htmlType="submit" block>
                Generate
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div className="container py-16 bg-white">
          <div className="text-center py-16 shadow-2xl">
            <h1>Your Brand Name</h1>
            <div className="grid grid-cols-3 gap-6">
              {data?.generated_names?.map((item, index) => (
                <div
                  key={index}
                  className={`relative group bg-gray-50 p-4 mb-5 rounded-lg shadow h-[300px] mx-6 mt-3 flex items-center justify-center ${
                    favorite === item ? "ring-2 ring-red-400" : ""
                  }`}
                >
                  <h2 className="text-[#2E4056] text-2xl text-center">
                    {item}
                  </h2>
                  <div
                    className="absolute top-3 right-3 text-xl cursor-pointer"
                    onClick={() => toggleFavorite(item)}
                  >
                    {favorite === item ? (
                      <HeartFilled style={{ color: "red" }} />
                    ) : (
                      <HeartOutlined />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full justify-end gap-5 pe-5 mt-10">
              <Button type="primary" block onClick={handleReGenerate}>
                ReGenerate
              </Button>
              <Button
                className="!bg-white border !text-black"
                type="primary"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
