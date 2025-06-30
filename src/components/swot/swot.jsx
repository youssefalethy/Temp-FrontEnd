"use client";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import { useState } from "react";
import cloud from "@/styles/images/cloud.png";
import Image from "next/image";

export default function SeasonalSale() {
  const onFinish = async (value) => {
    const token = JSON.parse(localStorage.getItem("user")).access;
    const data = await fetch("http://localhost:8000/api/seasonalsales/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="mt-5 businessNameGeneratorWrraper">
      <h1>SWOT Analysis Tool</h1>
      <h3 className="text-primary text-center text-[28px] py-5 ">
        Identify strengths, weaknesses, opportunities, and threats to make
        informed
        <br /> strategic decisions and drive growth
      </h3>
      <Form
        name="register"
        layout="veqrtical"
        onFinish={onFinish}
        style={{
          width: "70%",
          margin: "0 auto",
        }}
      >
        <div className="grid grid-cols-2 gap-6 mt-16 ">
          <Form.Item
            name="competitive-edge"
            required={false}
            label="Competitive Edge"
          >
            <Select
              options={[
                { value: "KeyWords 1", label: "KeyWords 1" },
                { value: "KeyWords 2", label: "KeyWords 2 " },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="growth-prospects"
            required={false}
            label="Growth Prospects"
          >
            <Select
              options={[
                { value: "Tone of Voice 1", label: "Tone of Voice 1" },
                { value: "Tone of Voice 2", label: "Tone of Voice 2 " },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="internal-constrains"
            required={false}
            label="Internal Constraints"
          >
            <Select
              options={[
                { value: "Content Type 1", label: "Content Type 1" },
                { value: "Content Type 2", label: "Content Type 2 " },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="external-risks"
            required={false}
            label="External Risks"
          >
            <Select
              options={[
                {
                  value: "Discount Percentage 1",
                  label: "Discount Percentage 1",
                },
                { value: "90", label: "90" },
              ]}
            />
          </Form.Item>

          {/* Upload Excel Sheet */}
        </div>
        <Form.Item className="cursor-pointer flex justify-center items-center gap-4 w-full mx-auto " valuePropName="fileList">
          <Upload beforeUpload={() => false} maxCount={1}>
            {/* <Button icon={<CloudUploadOutlined />}>Upload Excel Sheet</Button> */}
            <div className="cursor-pointer flex justify-center items-center gap-4 w-full mx-auto pt-8">
              <Image src={cloud} alt="cloud" width={80} height={75} />
              <h2>Upload Your Excel File</h2>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item className="mt- flex justify-end">
          <Button type="primary" htmlType="submit" block>
            Generate
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
