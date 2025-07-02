"use client";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Form, Select, Upload, message } from "antd";
import { useState } from "react";
import cloud from "@/styles/images/cloud.png";
import Image from "next/image";

export default function SeasonalSale() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    if (!fileList.length) {
      message.error("Please upload an Excel file.");
      return;
    }

    const token = JSON.parse(localStorage.getItem("user"))?.access;

    try {
      console.log("fileList:", fileList, "values:", values);

      // Upload Excel File
      const formData = new FormData();
      formData.append("sales_excel", fileList[0]);

      const res2 = await fetch("http://localhost:8000/api/sales-extract/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result2 = await res2.json();
      if (!res2.ok) {
        message.error(result2?.detail || "File upload failed");
        return;
      }

      delete values.excel_file;

      // Submit SWOT Form Data
      const res1 = await fetch("http://localhost:8000/api/swot-analysis/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const result1 = await res1.json();
      if (!res1.ok) {
        message.error(result1?.detail || "Form submission failed");
        return;
      }

      message.success("SWOT Analysis generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      message.error("Something went wrong!");
    }
  };

  return (
    <div className="mt-5 businessNameGeneratorWrraper">
      <h1>SWOT Analysis Tool</h1>
      <h3 className="text-primary text-center text-[28px] py-5">
        Identify strengths, weaknesses, opportunities, and threats to make
        informed <br /> strategic decisions and drive growth.
      </h3>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ width: "70%", margin: "0 auto" }}
      >
        <div className="grid grid-cols-2 gap-6 mt-16">
          <Form.Item name="competitive_edge" label="Competitive Edge">
            <Select
              placeholder="Select edge"
              options={[
                { value: "high-quality materials", label: "High-Quality Materials" },
                { value: "innovative design", label: "Innovative Design" },
              ]}
            />
          </Form.Item>

          <Form.Item name="growth_prospects" label="Growth Prospects">
            <Select
              placeholder="Select prospects"
              options={[
                { value: "global expansion", label: "Global Expansion" },
                { value: "tech partnerships", label: "Tech Partnerships" },
              ]}
            />
          </Form.Item>

          <Form.Item name="internal_constraints" label="Internal Constraints">
            <Select
              placeholder="Select constraints"
              options={[
                { value: "limited workforce", label: "Limited Workforce" },
                { value: "budget restrictions", label: "Budget Restrictions" },
              ]}
            />
          </Form.Item>

          <Form.Item name="external_risks" label="External Risks">
            <Select
              placeholder="Select risks"
              options={[
                { value: "economic instability", label: "Economic Instability" },
                { value: "emerging competitors", label: "Emerging Competitors" },
              ]}
            />
          </Form.Item>
        </div>

        {/* Upload Excel File */}
        <div className="cursor-pointer flex justify-center items-center gap-4 w-full mx-auto pt-8">
          <Form.Item
            name="excel_file"
            valuePropName="fileList"
            getValueFromEvent={() => fileList}
          >
            <Upload
              beforeUpload={(file) => {
                setFileList([file]);
                return false;
              }}
              onRemove={() => setFileList([])}
              showUploadList={{ showRemoveIcon: true }}
              fileList={fileList}
            >
              <div className="cursor-pointer flex justify-center items-center gap-4 w-full mx-auto pt-8">
                <Image src={cloud} alt="cloud" width={80} height={75} />
                <h2 className="text-blue-500 underline">Upload Your Excel File</h2>
              </div>
            </Upload>
          </Form.Item>
        </div>

        <Form.Item className="flex justify-end">
          <Button type="text" htmlType="submit" className="text-primary text-base">
            Generate
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
