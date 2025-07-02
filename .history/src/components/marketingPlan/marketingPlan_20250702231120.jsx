"use client";
import { Button, Form, Input, Upload, message } from "antd";
import { useState } from "react";
import cloud from "@/styles/images/cloud.png";
import Image from "next/image";

export default function MarketPlan() {
  const [dataAdded, setDataAdded] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [cachedFormData, setCachedFormData] = useState(null);

  const token = JSON.parse(localStorage.getItem("user"))?.access;

  const getBusinessId = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/get-business-id/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch business ID");
      }

      const result = await res.json();
      return result.business_id;
    } catch (error) {
      console.error("Business ID fetch error:", error);
      message.error("Could not retrieve business ID.");
      return null;
    }
  };

  const handleSubmission = async (values) => {
    setLoading(true);
    try {
      const businessId = await getBusinessId();
      if (!businessId) {
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("sales_excel", fileList[0]);

      const res2 = await fetch("http://localhost:8000/api/sales-extract/", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result2 = await res2.json();
      if (!res2.ok) {
        message.error(result2?.detail || "File upload failed");
        setLoading(false);
        return;
      }

      const payload = {
        business: businessId,
        business_description: values.business_description,
        goals: values.goals,
        budget: values.budget,
      };

      const res1 = await fetch("http://localhost:8000/api/marketing-plan/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result1 = await res1.json();
      if (!res1.ok) {
        message.error(result1?.detail || "Form submission failed");
        setLoading(false);
        return;
      }

      setDataAdded(result1);
      message.success("Marketing Plan generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    setCachedFormData(values);
    await handleSubmission(values);
  };

  const regenerate = async () => {
    if (cachedFormData) {
      await handleSubmission(cachedFormData);
    } else {
      message.error("No previous data to regenerate");
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/save-marketing-plan/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataAdded), // send actual plan
      });

      if (!res.ok) {
        const result = await res.json();
        message.error(result?.detail || "Failed to save plan");
        return;
      }

      message.success("Marketing plan saved successfully!");
    } catch (error) {
      console.error("Error saving plan:", error);
      message.error("Something went wrong while saving!");
    }
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
            name="marketing_plan_form"
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "70%", margin: "0 auto" }}
          >
            <div className="grid grid-cols-2 gap-6 mt-16 mb-10">
              <Form.Item
                name="business_description"
                label="Business Description"
                rules={[{ required: true, message: "Please describe your business." }]}
              >
                <Input.TextArea rows={4} placeholder="Describe your business" />
              </Form.Item>

              <Form.Item
                name="goals"
                label="Goals"
                rules={[{ required: true, message: "Please enter your goals." }]}
              >
                <Input.TextArea rows={4} placeholder="What are your marketing goals?" />
              </Form.Item>

              <Form.Item
                name="budget"
                label="Budget"
                rules={[{ required: true, message: "Please enter your budget." }]}
              >
                <Input type="number" placeholder="Enter marketing budget" />
              </Form.Item>
            </div>

            <div className="flex justify-center items-center pt-4">
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
                Generate Marketing Plan
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <>
          <div className="max-w-[940px] mx-auto py-16">
            <div className="bg-white p-3 border border-gray-200 rounded-2xl shadow-lg transform -translate-y-40">
              <h1 className="py-6 text-center text-2xl font-bold text-[#1B2559]">Your Marketing Plan</h1>
              {Object.entries(dataAdded?.generated_plan || {}).map(
                ([sectionKey, sectionValue]) => (
                  <div
                    key={sectionKey}
                    className="bg-white shadow-2xl mb-4 rounded-lg p-6 border border-gray-200"
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
                      {sectionKey?.replaceAll("_", " ")}
                    </h2>

                    {Array.isArray(sectionValue) ? (
                      <ul className="space-y-2">
                        {sectionValue.map((item, idx) => (
                          <li
                            key={idx}
                            className="bg-gray-50 p-3 rounded-lg shadow-sm text-gray-600"
                          >
                            {item ?? "—"}
                          </li>
                        ))}
                      </ul>
                    ) : typeof sectionValue === "object" &&
                      sectionValue !== null ? (
                      Object.entries(sectionValue).map(
                        ([subKey, subItems], i) => (
                          <div key={i} className="mb-4">
                            <h3 className="font-semibold text-gray-700 mb-2 capitalize">
                              {subKey?.replaceAll("_", " ")}
                            </h3>
                            <ul className="space-y-2 pl-4">
                              {(Array.isArray(subItems)
                                ? subItems
                                : [subItems]
                              ).map((item, idx) => (
                                <li
                                  key={idx}
                                  className="bg-gray-50 p-2 rounded shadow-sm text-gray-600"
                                >
                                  {item ?? "—"}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-gray-600">{sectionValue ?? "—"}</p>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex w-full justify-end gap-5 pe-5 transform -translate-y-40 mb-3">
            <Button type="primary" onClick={regenerate}>
              ReGenerate
            </Button>
            <Button
              className="!bg-white border !text-black"
              type="primary"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
