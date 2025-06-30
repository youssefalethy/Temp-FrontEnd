"use client";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import { useState } from "react";

export default function SeasonalSale() {
  const onFinish = async (value) => {
    
    const token = JSON.parse(localStorage.getItem('user')).access;
    const data= await fetch('http://localhost:8000/api/seasonalsales/', {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token} `
      },
      body: JSON.stringify(value) 
  
    }
  )

  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));


  };

  return (
    <div className="mt-5 businessNameGeneratorWrraper   ">
      <h1>Limited-Time Offer</h1>
      <h3 className="text-primary text-center text-[28px] py-5 ">
      Maximize the impact of your limited-time offers with eye-catching, <br />  urgency-driven marketing content that grabs attention
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
        <Form.Item name="content_keywords" required={false} label="KeyWords">
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

          <Form.Item name="tone_of_voice" required={false} label="Tone of Voice">
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

          <Form.Item name="content_type" required={false} label="Content Type">
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

          <Form.Item name="discount_percentage" required={false} label="Discount Percentage">
            <Select
              // defaultValue="Discount Percentage"
              // onChange={handleChange}
              options={[
                {
                  value: "Discount Percentage 1",
                  label: "Discount Percentage 1",
                },
                {
                  value: "90",
                  label: "90",
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
    </div>
  );


}