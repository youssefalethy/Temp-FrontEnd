"use client";
import { Button, Form, Input, Select, DatePicker } from "antd";
import { useState } from "react";

export default function BusinessOverview() {
  const [overviewData, setOverviewData] = useState(null);
  const [dataAdded, setDataAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (value) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("user")).access;

    try {
      const res = await fetch("http://localhost:8000/api/businessoverview/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...value,
          year_founded: value.year_founded?.format("YYYY-MM-DD"),
        }),
      });

      const data = await res.json();
      const { business_overview } = data;

      setOverviewData({
        mission: business_overview?.mission || data.business_overview_and_mission,
        strategy: business_overview?.strategy || data.market_strategy_and_vision,
        unique_selling_points:
          business_overview?.unique_selling_points || data.unique_selling_points,
      });

      setDataAdded(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 businessNameGeneratorWrraper">
      {!dataAdded ? (
        <>
          <h1>Business Overview</h1>
          <h3 className="text-primary text-center text-[28px] py-5">
            Get a professional overview of your business, crafted to highlight
            <br />
            your unique value proposition.
          </h3>
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "70%", margin: "0 auto" }}
          >
            <div className="grid grid-cols-2 gap-6 mt-16 mb-20">
              <Form.Item name="year_founded" label="Year Founded">
                <DatePicker
                  picker="year"
                  style={{ width: "100%" }}
                  placeholder="Select Year"
                />
              </Form.Item>

              <Form.Item name="business_advantages" label="Business Advantages">
                <Select
                  mode="multiple"
                  placeholder="Select business advantages"
                  style={{ width: "100%" }}
                  options={[
                    { value: "Ethically sourced materials", label: "Ethically sourced materials" },
                    { value: "Eco-friendly production", label: "Eco-friendly production" },
                    { value: "Timeless and versatile designs", label: "Timeless and versatile designs" },
                    { value: "Price", label: "Price" },
                    { value: "Quality", label: "Quality" },
                    { value: "Convenience", label: "Convenience" },
                    { value: "Trust & Reputation", label: "Trust & Reputation" },
                    { value: "Customer Service & Support", label: "Customer Service & Support" },
                  ]}
                />
              </Form.Item>

              <Form.Item name="business_description" label="Business Description">
                <Input.TextArea placeholder="Business Description" />
              </Form.Item>

              <Form.Item name="business_goal" label="Business Goals">
                <Input.TextArea placeholder="Business Goals" />
              </Form.Item>

              <Form.Item name="client_category" label="Client Category">
                <Select
                  style={{ width: "100%" }}
                  options={[
                    { value: "Individual Consumers", label: "Individual Consumers" },
                    { value: "Businesses & Organizations", label: "Businesses & Organizations" },
                    { value: "Government & Public Sector", label: "Government & Public Sector" },
                  ]}
                />
              </Form.Item>
            </div>

            <Form.Item className="flex justify-end">
              <Button type="primary" htmlType="submit" block loading={loading}>
                Generate
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div className="container mt-24 mx-auto p-6">
          {/* Mission */}
          <div className="bg-white shadow-2xl rounded-lg p-6 mb-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
              Mission
            </h2>
            <p className="text-gray-600">{overviewData?.mission}</p>
          </div>

          {/* Strategy */}
          <div className="bg-white shadow-2xl rounded-lg p-6 mb-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
              Strategy
            </h2>
            <ul className="space-y-4">
              {overviewData?.strategy?.map((item, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                  {typeof item === "string" ? (
                    <p className="text-gray-600">{item}</p>
                  ) : (
                    <p className="text-gray-600">
                      <strong>{item.initiative}:</strong> {item.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Unique Selling Points */}
          <div className="bg-white shadow-2xl rounded-lg p-6 mb-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
              Unique Selling Points
            </h2>
            <ul className="space-y-4">
              {overviewData?.unique_selling_points?.map((item, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                  {typeof item === "string" ? (
                    <p className="text-gray-600">{item}</p>
                  ) : (
                    <p className="text-gray-600">
                      <strong>{item.initiative}:</strong> {item.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
