"use client";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { useState } from "react";

export default function EnhancmentGuide() {
  const [GenData, setGenData] = useState(null);
  const [dataAdded, setdataAdded] = useState(false);
    const [loading, setLoading] = useState(false);
  console.log(Object.entries(GenData ?? {}), "GenData");

  const onFinish = async (value) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("user")).access;
    const data = await fetch("http://localhost:8000/api/businessenhacementguide/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then((data) => {
        setGenData(data?.enhancement_guide);
        setdataAdded(true);
        setLoading(false);
      })
      .catch((error) => console.error("Error:", error));
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
            name="register"
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "70%", margin: "0 auto" }}
          >
            <div className="grid grid-cols-2 gap-6 mt-16 mb-20">
              <Form.Item name="project_budget_range" label="Project Budget Range">
                <Select
                  options={[
                    { value: "1000", label: "1000" },
                    { value: "10000", label: "10k" },
                    { value: "100000", label: "100k" },
                    { value: "1000000", label: "1M" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="business_advantages" label="Business Advantages">
                <Select
                  options={[
                    { value: "Price", label: "Price" },
                    { value: "Quality", label: "Quality" },
                    { value: "Convenience", label: "Convenience" },
                    { value: "Trust & Reputation", label: "Trust & Reputation" },
                    { value: "Customer Service & Support", label: "Customer Service & Support" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="marketing_channel" label="Marketing Channels">
                <Select
                  options={[
                    { value: "Social Media", label: "Social Media" },
                    { value: "Google Ads", label: "Google Ads" },
                    { value: "Events", label: "Events" },
                    { value: "Emails", label: "Emails" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="challenges" label="Challenges">
                <Input.TextArea placeholder="Challenges" />
              </Form.Item>
              <Form.Item name="sales_channel" label="Sales Channels">
                <Select
                  options={[
                    { value: "Online Store", label: "Online Store" },
                    { value: "Physical Store", label: "Physical Store" },
                    { value: "Social Media", label: "Social Media" },
                    { value: "Phone Sales & Customer Service", label: "Phone Sales & Customer Service" },
                  ]}
                />
              </Form.Item>
            </div>
            <Form.Item className="mt- flex justify-end">
              <Button loading={loading} type="primary" htmlType="submit" block >
                Generate
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div className="container mt-24 mx-auto p-6">
          {Object.entries(GenData).map(([categoryKey, categoryValue]) => (
            <div key={categoryKey} className="bg-white shadow-2xl rounded-lg p-6 mb-6 border border-gray-200">
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
                          <li key={index} className="bg-white p-4 rounded-lg shadow-md border">
                            {item?.description && (
                              <p className="text-gray-600">
                                <strong className="text-gray-800">Description:</strong> {item.description}
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
                          <li key={key} className="bg-white p-4 rounded-lg shadow-md border">
                            <strong className="text-gray-800">{key.replace(/_/g, " ")}:</strong> {String(value)}
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
        </div>
      )}
    </div>
  );
}
