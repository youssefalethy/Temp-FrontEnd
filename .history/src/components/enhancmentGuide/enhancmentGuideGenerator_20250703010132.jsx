"use client";
import { Button, Form, Input, Select, message } from "antd";
import { useState } from "react";

export default function EnhancmentGuide() {
  const [GenData, setGenData] = useState(null);
  const [dataAdded, setdataAdded] = useState(false);
  const [cachedFormData, setCachedFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("user"))?.access;

  const generateGuide = async (formDataRaw) => {
    setLoading(true);

    const payload = {
      project_budget_range: formDataRaw.project_budget_range,
      marketing_channel: formDataRaw.marketing_channel,
      sales_channel: formDataRaw.sales_channel,
      challenges: formDataRaw.challenges,
      business_advantages: {
        advantages: formDataRaw.business_advantages || [],
      },
    };

    try {
      const response = await fetch("http://localhost:8000/api/businessenhacementguide/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        setGenData(result?.enhancement_guide);
        setdataAdded(true);
        message.success("Enhancement guide generated successfully!");
      } else {
        message.error(result?.detail || "Failed to generate enhancement guide.");
        console.error("Response:", result);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    setCachedFormData(values);
    await generateGuide(values);
  };

  const regenerate = async () => {
    if (!cachedFormData) return message.error("No previous data to regenerate.");
    await generateGuide(cachedFormData);
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/save-enhancement-guide/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      const result = await res.json();
      if (!res.ok) {
        message.error(result?.detail || "Failed to save enhancement guide");
        return;
      }

      message.success("Enhancement guide saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      message.error("Something went wrong while saving!");
    }
  };

  return (
    <div className="mt-5 businessNameGeneratorWrraper">
      {!dataAdded ? (
        <>
          <h1>Business Enhancement Guide</h1>
          <h3 className="text-primary text-center text-[28px] py-5">
            Unlock actionable strategies and tools to streamline operations, <br />
            boost efficiency, and drive growth for your business
          </h3>

          <Form
            name="enhancement_form"
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "70%", margin: "0 auto" }}
          >
            <div className="grid grid-cols-2 gap-6 mt-16 mb-20">
              <Form.Item
                name="project_budget_range"
                label="Project Budget Range"
                rules={[{ required: true, message: "Please select a budget range." }]}
              >
                <Select
                  placeholder="Select a budget range"
                  options={[
                    { value: "$1,000 - $5,000", label: "$1,000 - $5,000" },
                    { value: "$5,000 - $10,000", label: "$5,000 - $10,000" },
                    { value: "$10,000 - $25,000", label: "$10,000 - $25,000" },
                    { value: "$25,000 - $50,000", label: "$25,000 - $50,000" },
                    { value: "$50,000 - $100,000", label: "$50,000 - $100,000" },
                    { value: "Over $100,000", label: "Over $100,000" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="business_advantages"
                label="Business Advantages"
                rules={[{ required: true, message: "Please select advantages." }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select advantages"
                  options={[
                    { value: "Strong brand recognition", label: "Strong brand recognition" },
                    { value: "High customer loyalty", label: "High customer loyalty" },
                    { value: "Innovative product design", label: "Innovative product design" },
                    { value: "Scalable operations", label: "Scalable operations" },
                    { value: "Established distribution network", label: "Established distribution network" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="marketing_channel"
                label="Marketing Channel"
                rules={[{ required: true, message: "Please select a marketing channel." }]}
              >
                <Select
                  placeholder="Select a marketing channel"
                  options={[
                    { value: "Social Media Advertising", label: "Social Media Advertising" },
                    { value: "Email Campaigns", label: "Email Campaigns" },
                    { value: "Content Marketing", label: "Content Marketing" },
                    { value: "TV/Radio Ads", label: "TV/Radio Ads" },
                    { value: "Influencer Marketing", label: "Influencer Marketing" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="challenges"
                label="Challenges"
                rules={[{ required: true, message: "Please describe your challenges." }]}
              >
                <Input.TextArea placeholder="Describe your business challenges..." />
              </Form.Item>

              <Form.Item
                name="sales_channel"
                label="Sales Channel"
                rules={[{ required: true, message: "Please select a sales channel." }]}
              >
                <Select
                  placeholder="Select a sales channel"
                  options={[
                    { value: "E-commerce website", label: "E-commerce website" },
                    { value: "Retail store", label: "Retail store" },
                    { value: "B2B sales team", label: "B2B sales team" },
                    { value: "Social media selling", label: "Social media selling" },
                  ]}
                />
              </Form.Item>
            </div>

            <Form.Item className="flex justify-end">
              <Button loading={loading} type="primary" htmlType="submit" block>
                Generate Guide
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div className="max-w-[940px] mx-auto py-16">
          <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-lg transform -translate-y-40">
            <h1 className="text-center text-2xl font-bold text-[#1B2559] mb-6">
              Your Business Enhancement Guide
            </h1>

            {Object.entries(GenData).map(([categoryKey, categoryValue]) => (
              <div
                key={categoryKey}
                className="bg-white shadow-2xl mb-4 rounded-lg p-6 border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
                  {categoryKey.replace(/_/g, " ")}
                </h2>

                <ul className="space-y-4">
                  {Object.entries(categoryValue).map(([subKey, subValue]) => (
                    <li key={subKey} className="bg-gray-50 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-semibold text-gray-700 capitalize">
                        {subKey.replace(/_/g, " ")}
                      </h3>

                      {Array.isArray(subValue) ? (
                        <ul className="ml-4 mt-2 space-y-2">
                          {subValue.map((item, index) => (
                            <li
                              key={index}
                              className="bg-white p-4 rounded-lg shadow-md border"
                            >
                              {item?.description && (
                                <p className="text-gray-600">
                                  <strong className="text-gray-800">Description:</strong>{" "}
                                  {item.description}
                                </p>
                              )}
                              {item?.KPIs && (
                                <ul className="ml-4 mt-2 list-disc text-gray-600">
                                  <li className="font-bold text-gray-700">KPIs:</li>
                                  {item.KPIs.map((kpi, kpiIndex) => (
                                    <li key={kpiIndex}>- {kpi}</li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : typeof subValue === "object" && subValue !== null ? (
                        <ul className="ml-4 mt-2 space-y-2">
                          {Object.entries(subValue).map(([key, value]) => (
                            <li
                              key={key}
                              className="bg-white p-4 rounded-lg shadow-md border"
                            >
                              <strong className="text-gray-800">{key.replace(/_/g, " ")}:</strong>{" "}
                              {String(value)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">
                          <strong>{subKey.replace(/_/g, " ")}:</strong> {String(subValue)}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* ✅ Buttons - like Marketing Plan style */}
            <div className="flex justify-end items-center gap-4 mt-6">
              <Button
                type="primary"
                className="!bg-white border !text-black"
                onClick={regenerate}
              >
                Regenerate
              </Button>
              <div className="flex flex-col gap-2">
                <Button type="primary" block className="!w-24" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
