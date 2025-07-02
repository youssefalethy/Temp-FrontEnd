"use client";
import { useAuth } from "@/contexts/authContext";
import { loginAction } from "@/mutation/serverActions";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import img from "@/styles/images/logonMain.png";

export default function Products() {
  const onFinish = async (value) => {
    const token = JSON.parse(localStorage.getItem("user")).access;
    const data = await fetch("http://localhost:8000/api/add-product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify({ ...value, price: +value.price ,cost_price: +value.cost_price }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-14 h-screen">
        <div className="col-span-3 pt-28">
          <h1 className="pt-8 pb-4">Products</h1>
          <h2 className="text-primary text-center text-sm pb-8">
            PLEASE ADD YOUR BUSINESS PRODUCTS
          </h2>

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
              <Form.Item name="product_name">
                <Input placeholder=" Product Name" />
              </Form.Item>

              <Form.Item name="product_description">
                <Input placeholder=" Product Description" />
              </Form.Item>

              <div className="flex jus gap-2 w-full ">
                <Form.Item name="price" className="w-full">
                  <Input placeholder=" Price" type="number" />
                </Form.Item>

                <Form.Item name="cost_price" className="w-full">
                  <Input placeholder=" Cost Price" />
                </Form.Item>
              </div>

              <Form.Item className=" flex justify-end">
                <Button
                  className="mt-9 w-11"
                  type="primary"
                  htmlType="submit"
                  block
                >
                  save
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