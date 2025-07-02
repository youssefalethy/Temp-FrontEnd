"use client";
import { Button, Form, Input, Select, message } from "antd";
import { useState } from "react";

export default function EnhancmentGuide() {
  const [GenData, setGenData] = useState(null);
  const [dataAdded, setdataAdded] = useState(false);
  const [cachedFormData, setCachedFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("user"))?.access;

  // ⬇️ Handles the actual generation request
  const generateGuide = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/businessenhacementguide/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setGenData(result?.enhancement_guide);
        setdataAdded(true);
        message.success("Enhancement guide generated successfully!");
      } else {
        message.error(result?.detail || "Failed to generate enhancement guide.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // ⬇️ On form submit
  const onFinish = async (values) => {
    setCachedFormData(values);
    await generateGuide(values);
  };

  // ⬇️ Only regenerates using cached data
  const regenerate = async () => {
    if (!cachedFormData) return message.error("No previous data to regenerate.");
    await generateGuide(cachedFormData);
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/api/save-enhancement-guide//", {
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
                  options={[
                    { value: "Under 5K", label: "Under $5,000" },
                    { value: "5K - 20K", label: "$5,000 - $20,000" },
                    { value: "20K - 100K", label: "$20,000 - $100,000" },
                    { value: "Over 100K", label: "Over $100,000" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="business_advantages"
                label="Business Advantages"
                rules={[{ required: true, message: "Please select an advantage." }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select advantages"
                  options={[
                    { value: "Competitive Pricing", label: "Competitive Pricing" },
                    { value: "Premium Quality", label: "Premium Quality" },
                    { value: "24/7 Support", label: "24/7 Support" },
                    { value: "Brand Trust", label: "Brand Trust" },
                    { value: "Fast Delivery", label: "Fast Delivery" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="marketing_channel"
                label="Marketing Channels"
                rules={[{ required: true, message: "Please select at least one channel." }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select channels"
                  options={[
                    { value: "Social Media", label: "Social Media" },
                    { value: "Search Engine Ads", label: "Search Engine Ads" },
                    { value: "Email Campaigns", label: "Email Campaigns" },
                    { value: "Influencer Marketing", label: "Influencer Marketing" },
                    { value: "Offline Events", label: "Offline Events" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="challenges"
                label="Challenges"
                rules={[{ required: true, message: "Please describe your challenges." }]}
              >
                <Input.TextArea placeholder="What are the business challenges you're facing?" />
              </Form.Item>

              <Form.Item
                name="sales_channel"
                label="Sales Channels"
                rules={[{ required: true, message: "Please select at least one sales channel." }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select sales channels"
                  options={[
                    { value: "E-Commerce", label: "E-Commerce" },
                    { value: "Retail Store", label: "Retail Store" },
                    { value: "Social Commerce", label: "Social Commerce" },
                    { value: "Phone Orders", label: "Phone Orders" },
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
        <div className="container mt-24 mx-auto p-6">
          <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-lg">
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

            <div className="flex justify-end items-center gap-4 mt-6">
              <Button
                type="default"
                onClick={regenerate}
                className="border border-gray-300 text-black"
              >
                Regenerate
              </Button>
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
