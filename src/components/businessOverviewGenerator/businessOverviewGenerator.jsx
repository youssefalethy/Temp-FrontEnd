"use client";
import { Button, Form, Input, Select, message } from "antd";
import { useRef, useState } from "react";

export default function BusinessOverview() {
  const [form] = Form.useForm();
  const [overviewData, setOverviewData] = useState(null);
  const [dataAdded, setDataAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false); // for save btn
  const lastFormValuesRef = useRef(null); // for ReGenerate

  const onFinish = async (value) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("user"))?.access;

    lastFormValuesRef.current = value; // store values for ReGenerate

    try {
      const res = await fetch("http://localhost:8000/api/businessoverview/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...value,
          business_advantages: [value.business_advantages],
          year_founded: `${value.year_founded}-12-12`,
        }),
      });

      const data = await res.json();
      const { business_overview } = data;

      setOverviewData({
        mission: business_overview?.mission,
        strategy: business_overview?.strategy,
        unique_selling_points: business_overview?.unique_selling_points,
      });

      setDataAdded(true);
      message.success("Overview generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to generate overview.");
    } finally {
      setLoading(false);
    }
  };

  const regenrate = () => {
    if (lastFormValuesRef.current) {
      onFinish(lastFormValuesRef.current);
    } else {
      message.warning("No previous data to regenerate.");
    }
  };

  const handleSaveOverview = async () => {
    setSaving(true);
    const token = JSON.parse(localStorage.getItem("user"))?.access;

    try {
      const res = await fetch(
        "http://localhost:8000/api/save-business-overview/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        message.error(err?.detail || "Failed to save overview.");
        return;
      }

      const result = await res.json();
      message.success("Business overview saved successfully!");
      console.log("Saved:", result);
    } catch (error) {
      console.error("Save Error:", error);
      message.error("Error while saving.");
    } finally {
      setSaving(false);
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
            form={form}
            name="register"
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "70%", margin: "0 auto" }}
          >
            <div className="grid grid-cols-2 gap-6 mt-16 mb-20">
              <Form.Item name="year_founded" label="Year Founded">
                <Select
                  options={[
                    { value: "2018", label: "2018" },
                    { value: "2019", label: "2019" },
                    { value: "2020", label: "2020" },
                    { value: "2021", label: "2021" },
                    { value: "2022", label: "2022" },
                  ]}
                />
              </Form.Item>

              <Form.Item name="business_advantages" label="Business Advantages">
                <Select
                  options={[
                    { value: "Price", label: "Price" },
                    { value: "Quality", label: "Quality" },
                    { value: "Convenience", label: "Convenience" },
                    {
                      value: "Trust & Reputation",
                      label: "Trust & Reputation",
                    },
                    {
                      value: "Customer Service & Support",
                      label: "Customer Service & Support",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="business_description"
                label="Business Description"
              >
                <Input.TextArea placeholder="Business Description" />
              </Form.Item>

              <Form.Item name="business_goal" label="Business Goals">
                <Input.TextArea placeholder="Business Goals" />
              </Form.Item>

              <Form.Item name="client_category" label="Client Category">
                <Select
                  options={[
                    {
                      value: "Individual Consumers",
                      label: "Individual Consumers",
                    },
                    {
                      value: "Businesses & Organizations",
                      label: "Businesses & Organizations",
                    },
                    {
                      value: "Government & Public Sector",
                      label: "Government & Public Sector",
                    },
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
        <div className="max-w-[940px] mx-auto py-16">
          <div className="bg-white p-3 border border-gray-200 rounded-2xl shadow-lg transform -translate-y-40">
            {/* Mission */}
            <h1>Your Business Overview</h1>

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
                    <p className="text-gray-600">{item}</p>
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
                    <p className="text-gray-600">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex w-full justify-end gap-5 pe-5 mt-10">
              <Button
                type="primary"
                block
                onClick={regenrate}
                loading={loading}
                className="!w-fit"
              >
                ReGenerate
              </Button>
              <Button
                className="!bg-white border !text-black !w-fit"
                type="primary"
                onClick={handleSaveOverview}
                loading={saving}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
