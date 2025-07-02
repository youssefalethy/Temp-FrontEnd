"use client";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { useState } from "react";

export default function BusinessAwarness() {
  const [savedValues, setSavedValues] = useState();
  const [data, setData] = useState();

  const regenrate = async () => {
    const token = JSON.parse(localStorage.getItem("user"))?.access;
    const data = await fetch("http://localhost:8000/api/brandawareness/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify(savedValues),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        message.success("Brand Awarness Regenerated successfully!");
      })
      .catch((error) => console.error("Error:", error));
  };

  const onFinish = async (value) => {
    const token = JSON.parse(localStorage.getItem("user")).access;
    const data = await fetch("http://localhost:8000/api/brandawareness/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setSavedValues(value);
        message.success("Brand Awarness generated successfully!");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="mt-5 businessNameGeneratorWrraper ">
      {!data ? (
        <>
          <h1>Brand Awarness</h1>
          <h3 className="text-primary text-center text-[28px] py-5 ">
            Generate impactful marketing content quickly and <br /> easily.
          </h3>
          <Form
            name="register"
            layout="veqrtical"
            onFinish={onFinish}
            style={{
              width: "70%",
              margin: "0 auto",
            }}
          >
            <div className="grid grid-cols-2 gap-6 mt-16 mb-20">
              <Form.Item
                name="content_keywords"
                required={false}
                label="KeyWords"
              >
                <Select
                  // defaultValue="KeyWords"
                  // onChange={handleChange}
                  options={[
                    {
                      value: "KeyWords 1",
                      label: "KeyWords 1",
                    },
                    {
                      value: "KeyWords 2",
                      label: "KeyWords 2 ",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="tone_of_voice"
                required={false}
                label="Tone of Voice"
              >
                <Select
                  // defaultValue="Tone of Voice"
                  // onChange={handleChange}
                  options={[
                    {
                      value: "Tone of Voice 1",
                      label: "Tone of Voice 1",
                    },
                    {
                      value: "Tone of Voice 2",
                      label: "Tone of Voice 2 ",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="content_type"
                required={false}
                label="Content Type"
              >
                <Select
                  // defaultValue="Content Type"
                  // onChange={handleChange}
                  options={[
                    {
                      value: "Content Type 1",
                      label: "Content Type 1",
                    },
                    {
                      value: "Content Type 2",
                      label: "Content Type 2 ",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item className="mt- flex justify-end">
                <Button type="primary" htmlType="submit" block>
                  Generate
                </Button>
              </Form.Item>
            </div>
          </Form>
        </>
      ) : (
        <div className="container py-16 bg-white">
          <h1 className="my-8">Your brand awareness content</h1>
          <div className="mx-auto max-w-[850px]">
            <h2 className="text-[#1B2559] text-lg font-bold">
              {data?.business?.industry}
            </h2>
            <h2 className="text-[#1B2559] mt-6">{data?.generated_content}</h2>
          </div>
          <div className="flex w-full justify-end gap-5 pe-5 mt-10">
            <Button type="primary" block onClick={regenrate}>
              ReGenerate
            </Button>
            <Button
              className="!bg-white border !text-black"
              type="primary"
              // onClick={handleSaveSlogan}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
