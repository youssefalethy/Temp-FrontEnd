"use client";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import img from "@/styles/images/logonMain.png";

export default function Products() {
  const [addMore, setAddMore] = useState(false);
  const router = useRouter();

  const onFinish = async (value) => {
    const token = JSON.parse(localStorage.getItem("user"))?.access;

    try {
      const response = await fetch("http://localhost:8000/api/add-product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...value,
          price: +value.price,
          cost_price: +value.cost_price,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      message.success("Product added successfully!");

      if (!addMore) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to add product.");
    }
  };

  return (
    <div className="grid grid-cols-5 gap-14 h-screen">
      <div className="col-span-3 pt-28">
        <h1 className="pt-8 pb-4">Products</h1>
        <h2 className="text-primary text-center text-sm pb-8">
          PLEASE ADD YOUR BUSINESS PRODUCTS
        </h2>

        <div className="flex">
          <Form
            name="product_form"
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "500px", margin: "0 auto" }}
          >
            <Form.Item name="product_name" rules={[{ required: true, message: "Enter product name" }]}>
              <Input placeholder="Product Name" />
            </Form.Item>

            <Form.Item name="product_description">
              <Input placeholder="Product Description" />
            </Form.Item>

            <div className="flex gap-2 w-full">
              <Form.Item name="price" className="w-full" rules={[{ required: true }]}>
                <Input placeholder="Price" type="number" />
              </Form.Item>

              <Form.Item name="cost_price" className="w-full" rules={[{ required: true }]}>
                <Input placeholder="Cost Price" type="number" />
              </Form.Item>
            </div>

            <div className="flex justify-between gap-4">
              <Button
                type="default"
                onClick={() => setAddMore(true)}
                className="w-1/2"
              >
                Add Another Product
              </Button>

              <Form.Item className="w-1/2 m-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Save and Continue
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>

      <div className="col-span-2 bg-[#2E4056] h-full pt-9">
        <div className="flex items-center justify-center h-full">
          <div className="relative w-[500px] h-[500px]">
            <Image
              src={img}
              alt="Product Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
