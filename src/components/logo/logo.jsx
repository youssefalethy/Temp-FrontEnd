"use client";
import { Button, Form, Input, Select } from "antd";
import { useState } from "react";

export default function Logo() {
  const [overviewData, setOverviewData] = useState(null);
  const [dataAdded, setDataAdded] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const onFinish = async (value) => {
    setLoading(true); // Set loading to true when submitting the form

    const token = JSON.parse(localStorage.getItem('user')).access;
    const data = await fetch('http://localhost:8000/api/generate-logo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token} `,
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then((data) => {
        setOverviewData(data);
        setDataAdded(true);
        console.log('Success:', data);
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => setLoading(false)); // Set loading to false once the request is completed
  };

  return (
    <div className="mt-5 businessNameGeneratorWrraper">
      {!dataAdded ? (
        <>
          <h1>Logo Creation</h1>
          <h3 className="text-primary text-center text-[28px] py-5">
            Generate professional, custom logos tailored to your business 
            <br />
            with our advanced AI technology
          </h3>
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "70%", margin: "0 auto" }}
          >
            <div className="grid grid-cols-2 gap-6 mt-16 mb-20">
              <Form.Item name="brand_name" required={false} label="">
                <Input placeholder="Business Name" />
              </Form.Item>
              <Form.Item name="slogan" required={false} label="">
                <Input placeholder="Slogan" />
              </Form.Item>
              <Form.Item name="style" required={false} label="Style Prefrences">
                <Select
                  options={[
                    { value: "Individual Consumers", label: "Individual Consumers" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="colors" required={false} label="Color">
                <Select
                  options={[
                    { value: "red", label: "red" },
                  ]}
                />
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
