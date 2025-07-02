"use client";
import { Button, Form, Input, Upload, message } from "antd";
import { useState } from "react";
import cloud from "@/styles/images/cloud.png";
import Image from "next/image";

export default function MarketPlan() {
  const [overviewData, setOverviewData] = useState(null);
  const [dataAdded, setDataAdded] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [cachedFormData, setCachedFormData] = useState(null); // for regenerate

  const handleSubmission = async (values) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("user"))?.access;

    try {
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

      delete values.excel_file;

      const res1 = await fetch("http://localhost:8000/api/marketing-plan/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({...values,business_id:4}),
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

  const regenrate = async () => {
    if (cachedFormData) {
      await handleSubmission(cachedFormData);
    } else {
      message.error("No previous data to regenerate");
    }
  };

  const handleSave = async () => {
    const token = JSON.parse(localStorage.getItem("user"))?.access;
    try {
      const res = await fetch("http://localhost:8000/api/save-marketing-plan/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
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
            name="register"
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "70%", margin: "0 auto" }}
          >
            <div className="grid grid-cols-2 gap-6 mt-16 mb-16">
              <Form.Item name="business_description">
                <Input.TextArea placeholder="Business Description" />
              </Form.Item>
              <Form.Item name="goals">
                <Input.TextArea placeholder="Goals" />
              </Form.Item>
              <Form.Item name="budget">
                <Input type="number" placeholder="Budget" />
              </Form.Item>
            </div>

            <div className="cursor-pointer flex justify-center items-center gap-4 w-full mx-auto">
              <Form.Item
                name="excel_file"
                valuePropName="fileList"
                getValueFromEvent={() => fileList}
              >
                <Upload
                  beforeUpload={(file) => {
                    setFileList([file]);
                    return false;
                  }}
                  onRemove={() => setFileList([])}
                  showUploadList={{ showRemoveIcon: true }}
                  fileList={fileList}
                >
                  <div className="cursor-pointer flex justify-center items-center gap-4 w-full mx-auto">
                    <Image src={cloud} alt="cloud" width={80} height={75} />
                    <h2>Upload Your Excel File</h2>
                  </div>
                </Upload>
              </Form.Item>
            </div>

            <Form.Item className="mt-6 flex justify-end">
              <Button type="primary" htmlType="submit" block loading={loading}>
                Generate
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <>
          <div className="max-w-[940px] mx-auto py-16">
            <div className="bg-white p-3 border border-gray-200 rounded-2xl shadow-lg transform -translate-y-40">
              <h1 className="py-6">Your Marketing Plan</h1>
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
            <Button type="primary" block onClick={regenrate}>
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
