"use client";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import img from "@/styles/images/logonMain.png";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();

  const handleAddProduct = () => {
    form.validateFields()
      .then(values => {
        // Add current product to the products list
        const newProduct = {
          ...values,
          price: +values.price,
          cost_price: +values.cost_price
        };
        
        setProducts(prev => [...prev, newProduct]);
        form.resetFields();
        message.success("Product added to list!");
      })
      .catch(error => {
        console.log("Validation failed:", error);
      });
  };

  const handleSaveAndContinue = async () => {
    try {
      // Validate and add the current form product
      const currentProduct = await form.validateFields();
      const newProduct = {
        ...currentProduct,
        price: +currentProduct.price,
        cost_price: +currentProduct.cost_price
      };
      
      const allProducts = [...products, newProduct];
      
      if (allProducts.length === 0) {
        message.warning("Please add at least one product");
        return;
      }

      setLoading(true);
      const token = JSON.parse(localStorage.getItem("user"))?.access;

      // Send all products to the backend
      const response = await fetch("http://localhost:8000/api/add-product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ products: allProducts }),
      });

      if (!response.ok) {
        throw new Error("Failed to save products");
      }

      message.success("Products saved successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to save products.");
    } finally {
      setLoading(false);
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
            form={form}
            name="product_form"
            layout="vertical"
            style={{ width: "500px", margin: "0 auto" }}
          >
            <Form.Item 
              name="product_name" 
              rules={[{ required: true, message: "Enter product name" }]}
            >
              <Input placeholder="Product Name" />
            </Form.Item>

            <Form.Item name="product_description">
              <Input placeholder="Product Description" />
            </Form.Item>

            <div className="flex gap-2 w-full">
              <Form.Item 
                name="price" 
                className="w-full" 
                rules={[{ required: true, message: "Enter price" }]}
              >
                <Input placeholder="Price" type="number" />
              </Form.Item>

              <Form.Item 
                name="cost_price" 
                className="w-full" 
                rules={[{ required: true, message: "Enter cost price" }]}
              >
                <Input placeholder="Cost Price" type="number" />
              </Form.Item>
            </div>

            <div className="flex justify-between gap-4">
              <Button
                type="primary"
                onClick={handleAddProduct}
                className="w-1/2"
              >
                Add Product
              </Button>

              <Button
                type="primary"
                onClick={handleSaveAndContinue}
                className="w-1/2"
                loading={loading}
              >
                Save and Continue
              </Button>
            </div>
          </Form>
        </div>

        {/* Display added products */}
        {products.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold mb-3">Products to be saved:</h3>
            <ul className="border rounded-lg p-4 max-h-40 overflow-y-auto">
              {products.map((product, index) => (
                <li key={index} className="mb-2 pb-2 border-b last:border-b-0">
                  <strong>{product.product_name}</strong>
                  <div>Price: ${product.price}</div>
                  <div>Cost: ${product.cost_price}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
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