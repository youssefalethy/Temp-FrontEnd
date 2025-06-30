"use client";
import {
  CloudUploadOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { useState } from "react";

export default function Slogan() {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(""); // Only one favorite slogan

  const onFinish = async (value) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("user")).access;
    try {
      const res = await fetch("http://localhost:8000/api/generate-slogan/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify({
          ...value,
          slogan_keywords: [value.slogan_keywords],
        }),
      });
      const result = await res.json();
      setData(result);
      setFavorite(""); // reset selected favorite
      message.success("Slogan regenerated successfully!");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (slogan) => {
    setFavorite((prev) => (prev === slogan ? "" : slogan));
  };

  const handleFavouriteSlogan = async () => {
    if (!favorite) {
      message.warning("Please select a slogan to regenerate.");
      return;
    }

    const token = JSON.parse(localStorage.getItem("user")).access;
    const body = {
      business_id: data?.business?.business_id,
      base_slogan: favorite,
    };

    console.log(body, "body");

    try {
      const res = await fetch("http://localhost:8000/api/regenerate-slogan/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify(body),
      });
      message.success("Slogan regenerated successfully!");
      const result = await res.json();
      console.log("result", result);
      setData(result);
      setFavorite(""); // clear selected favorite after regeneration
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSaveSlogan = async () => {
    if (!favorite) {
      message.warning("Please select a slogan to save.");
      return;
    }

    const token = JSON.parse(localStorage.getItem("user")).access;
    const body = {
      selected_slogan: favorite,
    };
    console.log(body, "bodyaa");

    try {
      const res = await fetch("http://localhost:8000/api/save-slogan/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify(body),
      });
      message.success("Slogan saved successfully!");
      const result = await res.json();
      console.log("result", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-5 businessNameGeneratorWrraper">
      {!data ? (
        <>
          <h1>Slogan Generator</h1>
          <h3 className="text-primary text-center text-[28px] py-5 ">
            Generate a catchy slogan that perfectly matches your brand’s
            identity
            <br /> with just a few clicks
          </h3>
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "70%", margin: "0 auto" }}
          >
            <div className="grid grid-cols-2 gap-6 mt-16 mb-20">
              <Form.Item
                name="slogan_keywords"
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
                name="emotional_tone"
                required={false}
                label="Emotional Tone"
              >
                <Select
                  options={[
                    {
                      value: "Compound Words",
                      label: "Compound Words (e.g., SnapChat)",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="core_value"
                required={false}
                label="Core Values and Themes"
              >
                <Select
                  options={[
                    {
                      value: "Compound Words",
                      label: "Compound Words (e.g., SnapChat)",
                    },
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
            <h1>Your Slogan</h1>
            <div className="grid grid-cols-3 gap-6">
              {data?.generated_slogans?.map((item, index) => (
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
              <Button type="primary" block onClick={handleFavouriteSlogan}>
                ReGenerate
              </Button>
              <Button
                className="!bg-white border !text-black"
                type="primary"
                onClick={handleSaveSlogan}
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
