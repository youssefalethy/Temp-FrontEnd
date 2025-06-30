"use client";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import { useState } from "react";

export default function page() {
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const onFinish = async (value) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("user")).access;
    const data = await fetch("http://localhost:8000/api/brandname/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data?.generated_name);
        setLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="mt-5 businessNameGeneratorWrraper">
      {!name ? (
        <>
          <h1>Brand Name Generator</h1>
          <h3 className="text-primary text-center text-[28px] py-5 ">
            Our advanced tool analyzes your brand’s  essence and industry to
            provide creative,<br /> unique, and professional name
          </h3>
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            style={{
              width: "70%",
              margin: "0 auto",
            }}
          >
            <div className="grid grid-cols-2 gap-6 mt-16 mb-20">
              <Form.Item name="KeyWords" required={false} label="KeyWords">
                <Select
                  // defaultValue="KeyWords"
                  // onChange={handleChange}
                  options={[
                    {
                      value: "Excellence",
                      label: "Excellence",
                    },
                    {
                      value: "Precision",
                      label: "Precision",
                    },
                    {
                      value: "Unity",
                      label: "Unity",
                    },
                    {
                      value: "Passion",
                      label: "Passion",
                    },
                    {
                      value: "Impact",
                      label: "Impact",
                    },
                    {
                      value: "Revolution",
                      label: "Revolution",
                    },
                    {
                      value: "Pioneer",
                      label: "Pioneer",
                    },
                    {
                      value: "Dynamic",
                      label: "Dynamic",
                    },
                    {
                      value: "Elevate",
                      label: "Elevate",
                    },
                    {
                      value: "Unstoppable",
                      label: "Unstoppable",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="Name Style"
                required={false}
                label="Name Style"
              >
                <Select
                  // defaultValue="Emotional Tone"
                  // onChange={handleChange}
                  options={[
                    {
                      value: "Compound Words",
                      label: "Compound Words (e.g., SnapChat)",
                    },
                  ]}
                />
              </Form.Item>
         
            </div>

            <Form.Item className="mt- flex justify-end">
              <Button loading={loading} type="primary" htmlType="submit" block>
                Generate
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div className="container mt-[100px] py-16 bg-white">
          <div className="text-center py-16 shadow-2xl ">
            <h1>Your Brand Name</h1>
            <h1 className="my-9  text-4xl">{name?.replaceAll("*", "")}</h1>
            <div className="flex w-full justify-end gap-5 pe-5 ">
              <Button type="primary" block>
                ReGenerate
              </Button>
              <Button className="!bg-white border !text-black " type="primary">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
