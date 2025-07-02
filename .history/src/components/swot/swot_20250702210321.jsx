"use client";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import { useState } from "react";
import cloud from "@/styles/images/cloud.png";
import Image from "next/image";

const { TextArea } = Input;

export default function SeasonalSale() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    if (!fileList.length) {
      message.error("Please upload an Excel file.");
      return;
    }

    const token = JSON.parse(localStorage.getItem("user"))?.access;
    setLoading(true);

    try {
      // 1️⃣ Upload the Excel file
      const formData = new FormData();
      formData.append("sales_excel", fileList[0]);

      const uploadResponse = await fetch("http://localhost:8000/api/sales-extract/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        const uploadResult = await uploadResponse.json();
        message.error(uploadResult?.detail || "File upload failed");
        return;
      }

      // 2️⃣ Submit the form data (SWOT analysis)
      const swotResponse = await fetch("http://localhost:8000/api/swot-analysis/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          competitive_edge: values.competitive_edge,
          growth_prospects: values.growth_prospects,
          internal_constraints: values.internal_constraints,
          external_risks: values.external_risks
        }),
      });

      if (!swotResponse.ok) {
        const swotResult = await swotResponse.json();
        message.error(swotResult?.detail || "SWOT analysis submission failed");
        return;
      }

      message.success("SWOT Analysis generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 businessNameGeneratorWrraper">
      <h1>SWOT Analysis Tool</h1>
      <h3 className="text-primary text-center text-[28px] py-5">
        Identify strengths, weaknesses, opportunities, and threats to make
        informed
        <br /> strategic decisions and drive growth
      </h3>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ width: "70%", margin: "0 auto" }}
      >
        <div className="grid grid-cols-2 gap-6 mt-16">
          {/* Competitive Edge - TextArea */}
          <Form.Item 
            name="competitive_edge" 
            label="Competitive Edge"
            rules={[{ required: true, message: 'Please describe your competitive edge' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Describe what makes your business stand out from competitors" 
            />
          </Form.Item>

          {/* Growth Prospects - TextArea */}
          <Form.Item 
            name="growth_prospects" 
            label="Growth Prospects"
            rules={[{ required: true, message: 'Please describe your growth prospects' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Describe potential areas for business expansion and growth" 
            />
          </Form.Item>

          {/* Internal Constraints - TextArea */}
          <Form.Item 
            name="internal_constraints" 
            label="Internal Constraints"
            rules={[{ required: true, message: 'Please describe your internal constraints' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Describe limitations within your organization" 
            />
          </Form.Item>

          {/* External Risks - TextArea */}
          <Form.Item 
            name="external_risks" 
            label="External Risks"
            rules={[{ required: true, message: 'Please describe external risks' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Describe potential threats from the market or environment" 
            />
          </Form.Item>
        </div>

        {/* Upload Excel File */}
        <div className="cursor-pointer flex justify-center items-center gap-4 w-full mx-auto pt-8">
          <Form.Item
            name="excel_file"
            valuePropName="fileList"
            getValueFromEvent={() => fileList}
            rules={[{ required: true, message: 'Excel file is required' }]}
          >
            <Upload
              beforeUpload={(file) => {
                // Check file type
                const isExcel = file.type === 'application/vnd.ms-excel' || 
                               file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                
                if (!isExcel) {
                  message.error('You can only upload Excel files!');
                  return false;
                }
                
                setFileList([file]);
                return false;
              }}
              onRemove={() => setFileList([])}
              showUploadList={{ showRemoveIcon: true }}
              fileList={fileList}
              accept=".xlsx,.xls"
              maxCount={1}
            >
              <div className="cursor-pointer flex flex-col justify-center items-center gap-2 w-full mx-auto pt-8 pb-4 border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors">
                <Image src={cloud} alt="cloud" width={60} height={60} />
                <h2 className="text-lg font-medium">Upload Your Excel File</h2>
                <p className="text-gray-500 text-sm">Click or drag file to this area to upload</p>
                <p className="text-gray-400 text-xs">Supports .xlsx, .xls files</p>
              </div>
            </Upload>
          </Form.Item>
        </div>

        <Form.Item className="flex justify-end mt-8">
          <Button 
            type="primary" 
            htmlType="submit" 
            block
            loading={loading}
            className="h-12 text-lg"
          >
            Generate SWOT Analysis
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}