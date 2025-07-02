"use client";
import { Button, Form, Select, message } from "antd";
import { useState } from "react";

export default function BusinessAwarness() {
  const [savedValues, setSavedValues] = useState();
  const [data, setData] = useState();

  const regenrate = async () => {
    const token = JSON.parse(localStorage.getItem("user"))?.access;
    try {
      const response = await fetch("http://localhost:8000/api/brandawareness/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(savedValues),
      });

      const result = await response.json();
      setData(result);
      message.success("Brand Awareness regenerated successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onFinish = async (value) => {
    const token = JSON.parse(localStorage.getItem("user"))?.access;
    try {
      const response = await fetch("http://localhost:8000/api/brandawareness/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
      });

      const result = await response.json();
      setData(result);
      setSavedValues(value);
      message.success("Brand Awareness generated successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-5 businessNameGeneratorWrraper">
      {!data ? (
        <>
          <h1>Brand Awareness</h1>
          <h3 className="text-primary text-center text-[28px] py-5">
            Generate impactful marketing content quickly and <br /> easily.
          </h3>

          <Form
            name="brandAwareness"
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "70%", margin: "0 auto" }}
          >
            <div className="grid grid-cols-2 gap-6 mt-16 mb-20">
              <Form.Item name="content_keywords" label="Keywords">
                <Select
                  mode="multiple"
                  placeholder="Select content keywords"
                  options={[
                    { value: "sustainability", label: "Sustainability" },
                    { value: "eco-friendly", label: "Eco-Friendly" },
                    { value: "modern fashion", label: "Modern Fashion" },
                    { value: "innovation", label: "Innovation" },
                    { value: "health", label: "Health" },
                    { value: "luxury", label: "Luxury" },
                  ]}
                />
              </Form.Item>

              <Form.Item name="tone_of_voice" label="Tone of Voice">
                <Select
                  placeholder="Select tone of voice"
                  options={[
                    { value: "professional", label: "Professional" },
                    { value: "friendly", label: "Friendly" },
                    { value: "bold", label: "Bold" },
                    { value: "playful", label: "Playful" },
                    { value: "empathetic", label: "Empathetic" },
                    { value: "inspirational", label: "Inspirational" },
                  ]}
                />
              </Form.Item>

              <Form.Item name="content_type" label="Content Type">
                <Select
                  placeholder="Select content type"
                  options={[
                    { value: "social media caption", label: "Social Media Caption" },
                    { value: "blog post intro", label: "Blog Post Intro" },
                    { value: "ad copy", label: "Ad Copy" },
                    { value: "email subject line", label: "Email Subject Line" },
                    { value: "website banner", label: "Website Banner" },
                  ]}
                />
              </Form.Item>

              <Form.Item className="flex justify-end col-span-2">
                <Button type="primary" htmlType="submit" block>
                  Generate
                </Button>
              </Form.Item>
            </div>
          </Form>
        </>
      ) : (
        <div className="container py-16 bg-white">
          <h1 className="my-8">Your Brand Awareness Content</h1>
          <div className="mx-auto max-w-[850px]">
            <h2 className="text-[#1B2559] text-lg font-bold">
              {data?.business?.industry}
            </h2>
            <h2 className="text-[#1B2559] mt-6">{data?.generated_content}</h2>
          </div>

          <div className="flex w-full justify-end gap-5 pe-5 mt-10">
            <Button type="primary" onClick={regenrate}>
              ReGenerate
            </Button>
            <Button
              className="!bg-white border !text-black"
              type="primary"
              // TODO: Implement Save Logic
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
