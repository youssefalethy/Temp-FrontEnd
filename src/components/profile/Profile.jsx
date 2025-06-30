"use client";
import React from "react";
import { Button, Form, Input, Select, Upload } from "antd";
import Image from "next/image";
import logo from "@/styles/images/historyIcon.png";

export default function Profile() {
  const onFinish = async (value) => {
    console.log(value);
  };
  return (
    <div className="pt-11 container">
      <h1>Profile</h1>
      <div className="flex items-start justify-center flex-wrap gap-9 ">
        <div className="mt-14">
          <Image src={logo} alt="logo" width={100} height={134} />
          <Button className="mt-5" type="primary" htmlType="submit" block>
            History
          </Button>
        </div>
        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          style={{
            width: "60%",
            // margin: "0 auto",
          }}
        >
          <div className="flex gap-9 justify-end pb-8 ">
            <Button type="primary" htmlType="submit" block>
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-6 gap-3 items-center mt-12">
            <div className="col-span-2">
              <Form.Item name="bussniess" required={false}>
                <Input placeholder="Business Name" />
              </Form.Item>
            </div>
            <div className="col-span-4">
              <Form.Item name="Slogan" required={false}>
                <Input placeholder="Slogan" />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            name="email"
            required={false}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder=" email" />
          </Form.Item>
          <div className="grid grid-cols-6 gap-3 items-center">
            <div className="col-span-3">
              <Form.Item name="industry" required={false}>
                <Input placeholder="industry " />
              </Form.Item>
            </div>
            <div className="col-span-3">
              <Form.Item name="country" required={false}>
                <Input placeholder="country" />
              </Form.Item>
            </div>
          </div>

          <div className="flex mt-9 gap-9 justify-end">
            <Button type="primary" htmlType="submit" block>
              Change Password
            </Button>
            <Button type="primary" htmlType="submit" block>
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
