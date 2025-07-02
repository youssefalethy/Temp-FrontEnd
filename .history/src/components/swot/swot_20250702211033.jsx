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
  const [swotData, setSwotData] = useState(null);

  const onFinish = async (values) => {
    if (!fileList.length) {
      message.error("Please upload an Excel file.");
      return;
    }

    const token = JSON.parse(localStorage.getItem("user"))?.access;
    setLoading(true);

    try {
      // Upload Excel File
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

      // SWOT Request
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
          external_risks: values.external_risks,
        }),
      });

      const result = await swotResponse.json();
      if (!swotResponse.ok) {
        message.error(result?.detail || "SWOT analysis submission failed");
        return;
      }

      message.success("SWOT Analysis generated successfully!");
      setSwotData(result);
    } catch (error) {
      console.error("Error:", error);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const renderSwotSection = (title, items, color) => (
    <div className="p-4 rounded-lg shadow-md bg-white border mt-6">
      <h3 className={`text-lg font-semibold text-${color}-600 mb-3`}>{title}</h3>
      {items?.length ? (
        items.map((item, idx) => (
          <div key={idx} className="mb-2">
            <p className="font-medium">• {item.description}</p>
            <p className="text-sm text-gray-500">KPIs: {item.kpis.join(", ")}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">No data available</p>
      )}
    </div>
  );

  return (
    <div className="mt-5 businessNameGeneratorWrraper">
      <h1>SWOT Analysis Tool</h1>
      <h3 className="text-primary text-center text-[28px] py-5">
        Identify strengths, weaknesses, opportunities, and threats to make
        informed <br /> strategic decisions and drive growth
      </h3>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ width: "70%", margin: "0 auto" }}
      >
        <div className="grid grid-cols-2 gap-6 mt-16">
          <Form.Item
            name="competitive_edge"
            label="Competitive Edge"
            rules={[{ required: true, message: "Please describe your competitive edge" }]}
          >
            <TextArea rows={4} placeholder="Describe what makes your business stand out" />
          </Form.Item>

          <Form.Item
            name="growth_prospects"
            label="Growth Prospects"
            rules={[{ required: true, message: "Please describe your growth prospects" }]}
          >
            <TextArea rows={4} placeholder="Describe your potential for growth" />
          </Form.Item>

          <Form.Item
            name="internal_constraints"
            label="Internal Constraints"
            rules={[{ required: true, message: "Please describe internal constraints" }]}
          >
            <TextArea rows={4} placeholder="Describe internal limitations" />
          </Form.Item>

          <Form.Item
            name="external_risks"
            label="External Risks"
            rules={[{ required: true, message: "Please describe external risks" }]}
          >
            <TextArea rows={4} placeholder="Describe market/environment threats" />
          </Form.Item>
        </div>

        {/* Upload Excel File */}
        <div className="cursor-pointer flex justify-center items-center gap-4 w-full mx-auto pt-8">
          <Form.Item
            name="excel_file"
            valuePropName="fileList"
            getValueFromEvent={() => fileList}
            rules={[{ required: true, message: "Excel file is required" }]}
          >
            <Upload
              beforeUpload={(file) => {
                const isExcel =
                  file.type === "application/vnd.ms-excel" ||
                  file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                if (!isExcel) {
                  message.error("You can only upload Excel files!");
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
                <p className="text-gray-500 text-sm">Click or drag file to this area</p>
                <p className="text-gray-400 text-xs">Supports .xlsx, .xls</p>
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

      {/* SWOT RESULTS */}
      {swotData && (
        <div className="max-w-5xl mx-auto mt-16 bg-gray-50 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#1B2559]">
            SWOT Analysis Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderSwotSection("Strengths", swotData.generated_swot?.strengths, "green")}
            {renderSwotSection("Weaknesses", swotData.generated_swot?.weaknesses, "red")}
            {renderSwotSection("Opportunities", swotData.generated_swot?.opportunities, "blue")}
            {renderSwotSection("Threats", swotData.generated_swot?.threats, "orange")}
          </div>

          {/* INSIGHTS */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-[#1B2559] mb-4">Additional Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              {/* Market Position */}
              <div className="bg-white p-4 rounded shadow border">
                <h4 className="font-semibold mb-2 text-blue-600">Market Position</h4>
                {Object.entries(swotData.insights?.market_position || {}).map(([city, value]) => (
                  <p key={city}>
                    {city}: <span className="font-semibold">{value}</span>
                  </p>
                ))}
              </div>

              {/* Resource Utilization */}
              <div className="bg-white p-4 rounded shadow border">
                <h4 className="font-semibold mb-2 text-green-600">Resource Utilization</h4>
                {Object.entries(swotData.insights?.resource_utilization || {}).map(
                  ([kpi, val]) => (
                    <p key={kpi}>
                      {kpi}: <span className="font-semibold">{val.toFixed(4)}</span>
                    </p>
                  )
                )}
              </div>

              {/* Industry Trends */}
              <div className="bg-white p-4 rounded shadow border col-span-1 md:col-span-2">
                <h4 className="font-semibold mb-2 text-purple-600">Industry Trends</h4>
                <p>
                  Popular Sales Channel:{" "}
                  <span className="font-semibold">
                    {swotData.insights?.industry_trends?.trends?.popular_sales_channel}
                  </span>
                </p>
              </div>

              {/* Competitor Weaknesses */}
              <div className="bg-white p-4 rounded shadow border col-span-1 md:col-span-2">
                <h4 className="font-semibold mb-2 text-red-500">Competitor Weaknesses</h4>
                {swotData.insights?.competitor_analysis?.weaknesses?.length ? (
                  swotData.insights.competitor_analysis.weaknesses.map((w, i) => (
                    <p key={i}>{w}</p>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No weaknesses detected.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
