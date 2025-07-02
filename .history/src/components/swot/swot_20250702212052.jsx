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
  const [formValues, setFormValues] = useState(null); // For regenerate

  const token = JSON.parse(localStorage.getItem("user"))?.access;

  const onFinish = async (values) => {
    if (!fileList.length) {
      message.error("Please upload an Excel file.");
      return;
    }

    setLoading(true);
    setFormValues(values); // Store values for regenerate

    try {
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

      const swotResponse = await fetch("http://localhost:8000/api/swot-analysis/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
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

  const handleRegenerate = async () => {
    if (!formValues) return;
    setLoading(true);

    try {
      const swotResponse = await fetch("http://localhost:8000/api/swot-analysis/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formValues),
      });

      const result = await swotResponse.json();
      if (!swotResponse.ok) {
        message.error(result?.detail || "Regeneration failed");
        return;
      }

      message.success("SWOT Regenerated successfully!");
      setSwotData(result);
    } catch (error) {
      console.error("Error:", error);
      message.error("Something went wrong during regeneration.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/save-swot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(swotData),
      });

      if (!res.ok) {
        const result = await res.json();
        message.error(result?.detail || "Failed to save SWOT");
        return;
      }

      message.success("SWOT saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      message.error("An error occurred while saving.");
    }
  };

  const renderSwotSection = (title, items, color) => (
    <div className="p-4 rounded-lg shadow-md bg-white border mt-4">
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
      {!swotData ? (
        <>
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
              <Form.Item name="competitive_edge" label="Competitive Edge" rules={[{ required: true }]}>
                <TextArea rows={4} placeholder="What gives your business an edge?" />
              </Form.Item>
              <Form.Item name="growth_prospects" label="Growth Prospects" rules={[{ required: true }]}>
                <TextArea rows={4} placeholder="Where can your business expand?" />
              </Form.Item>
              <Form.Item name="internal_constraints" label="Internal Constraints" rules={[{ required: true }]}>
                <TextArea rows={4} placeholder="What limits you internally?" />
              </Form.Item>
              <Form.Item name="external_risks" label="External Risks" rules={[{ required: true }]}>
                <TextArea rows={4} placeholder="Market/environment risks" />
              </Form.Item>
            </div>

            <div className="flex justify-center items-center pt-8">
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
                  fileList={fileList}
                  accept=".xlsx,.xls"
                  maxCount={1}
                  showUploadList={{ showRemoveIcon: true }}
                >
                  <div className="cursor-pointer flex flex-col justify-center items-center border-2 border-dashed p-6 rounded-xl hover:border-blue-500 transition">
                    <Image src={cloud} alt="cloud" width={60} height={60} />
                    <h2 className="text-lg font-medium pt-2">Upload Your Excel File</h2>
                    <p className="text-gray-500 text-sm">Click or drag to upload (.xlsx, .xls)</p>
                  </div>
                </Upload>
              </Form.Item>
            </div>

            <Form.Item className="flex justify-end mt-8">
              <Button type="primary" htmlType="submit" block loading={loading} className="h-12 text-lg">
                Generate SWOT Analysis
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div className="max-w-[940px] mx-auto py-16">
          <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-lg transform -translate-y-40">
            <h1 className="text-2xl font-bold mb-6 text-[#1B2559] text-center">
              SWOT Analysis Report
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderSwotSection("Strengths", swotData.generated_swot?.strengths, "green")}
              {renderSwotSection("Weaknesses", swotData.generated_swot?.weaknesses, "red")}
              {renderSwotSection("Opportunities", swotData.generated_swot?.opportunities, "blue")}
              {renderSwotSection("Threats", swotData.generated_swot?.threats, "orange")}
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-semibold text-[#1B2559] mb-4">Additional Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="bg-gray-50 p-4 rounded shadow border">
                  <h4 className="font-semibold mb-2 text-blue-600">Market Position</h4>
                  {Object.entries(swotData.insights?.market_position || {}).map(([city, value]) => (
                    <p key={city}>
                      {city}: <span className="font-semibold">{value}</span>
                    </p>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded shadow border">
                  <h4 className="font-semibold mb-2 text-green-600">Resource Utilization</h4>
                  {Object.entries(swotData.insights?.resource_utilization || {}).map(([kpi, val]) => (
                    <p key={kpi}>
                      {kpi}: <span className="font-semibold">{val.toFixed(4)}</span>
                    </p>
                  ))}
                </div>

                <div className="col-span-2 bg-gray-50 p-4 rounded shadow border">
                  <h4 className="font-semibold mb-2 text-purple-600">Industry Trends</h4>
                  <p>
                    Popular Sales Channel:{" "}
                    <span className="font-semibold">
                      {swotData.insights?.industry_trends?.trends?.popular_sales_channel}
                    </span>
                  </p>
                </div>

                <div className="col-span-2 bg-gray-50 p-4 rounded shadow border">
                  <h4 className="font-semibold mb-2 text-red-500">Competitor Weaknesses</h4>
                  {swotData.insights?.competitor_analysis?.weaknesses?.length ? (
                    swotData.insights.competitor_analysis.weaknesses.map((w, i) => <p key={i}>{w}</p>)
                  ) : (
                    <p className="text-gray-500 italic">No weaknesses detected.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8 pe-3">
              <Button
                type="primary"
                className="!bg-white border !text-black"
                onClick={handleRegenerate}
              >
                Regenerate
              </Button>
              <Button type="primary" className="!w-24" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
