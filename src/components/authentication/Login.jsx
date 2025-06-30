"use client";
import { useAuth } from "@/contexts/authContext";
import { loginAction } from "@/mutation/serverActions";
import { Button, DatePicker, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import img from "@/styles/images/logonMain.png";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const onFinish = async (value) => {
    const data = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: 'Bearer {token}',
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/home");
      })
      .then(async () => {
        console.log(localStorage.getItem("user"));
        const token = JSON.parse(localStorage.getItem("user")).access;
        await fetch("http://localhost:8000/api/businessenhacementguide/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token} `,
          },

          body: JSON.stringify({
            project_budget_range: "string",
            business_advantages: {},
            marketing_channel: "string",
            sales_channel: "string",
            challenges: "string",
          }),
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="">
      <div className="grid grid-cols-5 gap-14 h-screen">
        <div className="col-span-3 pt-28">
          <h1 className="pt-8">Account Log In</h1>
          <h3 className="text-primary text-center text-sm pb-8">
            PLEASE LOGIN TO CONTNUE TO YOUR ACCOUNT
          </h3>
          <div className="flex">
            <Form
              name="register"
              layout="vertical"
              onFinish={onFinish}
              style={{
                width: "500px",
                margin: "0 auto",
              }}
            >
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
              <Form.Item
                name="password"
                required={false}
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Must be at least 6 characters" },
                ]}
              >
                <Input.Password placeholder=" password" />
              </Form.Item>

              {/* <Form.Item
            name="Date"
            required={false}
            rules={[
              { required: true, message: "Please enter your DATE" },            ]}
          >
            <DatePicker/>
          </Form.Item> */}

              <Form.Item className=" flex justify-center">
                <Button className="mt-9" type="primary" htmlType="submit" block>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="col-span-2 bg-[#2E4056] h-full pt-9">
          <div className="w-full max-w-[732px] h-[700px] relative">
            <Image
              src={img}
              alt="image"
              fill
              className="object-cover rounded"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
