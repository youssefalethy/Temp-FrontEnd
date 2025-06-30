"use client";
import { Button, Form, Input, Select } from "antd";
import { useState } from "react";

export default function MarketPlan() {
  const [overviewData, setOverviewData] = useState(null);
  const [dataAdded, setDataAdded] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const onFinish = async (value) => {
    setLoading(true); // Set loading to true when submitting the form

    const token = JSON.parse(localStorage.getItem('user')).access;
    const data = await fetch('http://localhost:8000/api/businessoverview/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token} `,
      },
      body: JSON.stringify({
        year_founded: "2018-09-20",
        business_description: "Sustainable fashion brand creating eco-friendly and stylish clothing",
        business_advantages: [
          "Ethically sourced materials",
          "Eco-friendly production",
          "Timeless and versatile designs"
        ],
        client_category: "Environmentally conscious consumers aged 20-40",
        business_goal: "Increase online presence, collaborate with influencers, and open 5 flagship stores within 3 years"
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Access data from 'business_overview'
        const { business_overview } = data;
        setOverviewData({
          mission: business_overview?.mission,
          strategy: business_overview?.strategy,
          unique_selling_points: business_overview?.unique_selling_points,
        });
        setDataAdded(true);
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => setLoading(false)); // Set loading to false once the request is completed
  };

  return (
    <div className="mt-5 businessNameGeneratorWrraper">
      {!dataAdded ? (
        <>
          <h1>Marketing Plan Generator</h1>
          <h3 className="text-primary text-center text-[28px] py-5">
            Upload your sales data, unlock insights, and optimize your 
            <br />
            marketing strategy effortlessly.
          </h3>
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "70%", margin: "0 auto" }}
          >
            <div className="grid grid-cols-2 gap-6 mt-16 mb-20">
              <Form.Item name="business_description" required={false} label="">
                <Input.TextArea placeholder="Business Description" />
              </Form.Item>
              <Form.Item name="goals" required={false} label="">
                <Input.TextArea placeholder="Goals" />
              </Form.Item>
                <Form.Item name="budget" required={false} label="">
                    <Input.TextArea placeholder="Budget" />
                </Form.Item>
            </div>
            <Form.Item className="mt- flex justify-end">
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">Mission</h2>
            <p className="text-gray-600">{overviewData?.mission}</p>
          </div>

          {/* Strategy */}
          <div className="bg-white shadow-2xl rounded-lg p-6 mb-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">Strategy</h2>
            <ul className="space-y-4">
              {overviewData?.strategy?.map((item, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                  <p className="text-gray-600">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Unique Selling Points */}
          <div className="bg-white shadow-2xl rounded-lg p-6 mb-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">Unique Selling Points</h2>
            <ul className="space-y-4">
              {overviewData?.unique_selling_points?.map((item, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                  <p className="text-gray-600">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
