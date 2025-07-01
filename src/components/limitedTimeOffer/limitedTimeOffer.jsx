"use client";
import { SaveOutlined } from "@ant-design/icons";
import { Button, Form, Select, DatePicker, Checkbox, message } from "antd";
import { useEffect, useState } from "react";

export default function LimitedTimeOffer() {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const fetchProducts = async () => {
    const token = JSON.parse(localStorage.getItem("user")).access;
    setLoadingProducts(true);
    try {
      const response = await fetch("http://localhost:8000/api/get-products/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setProducts(result?.results || []);
    } catch (error) {
      console.error("Product fetch error:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onFinish = async (values) => {
    const token = JSON.parse(localStorage.getItem("user")).access;

    const payload = {
      ...values,
      offer_time_from: values.offer_time_from?.toDate().toISOString(),
      offer_time_to: values.offer_time_to?.toDate().toISOString(),
      product_names: values.product_names || [],
    };

    try {
      const res = await fetch("http://localhost:8000/api/limitedtimeoffer/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setData(result);
      message.success("Limited time offer generated successfully!");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const onSave = async (values) => {
    const token = JSON.parse(localStorage.getItem("user")).access;
    // const payload = {
    //   selected_values: values.save_options,
    // };

    try {
      await fetch("http://localhost:8000/api/save-limited-time-offer/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      message.success("Saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="mt-5 businessNameGeneratorWrraper">
      {!data ? (
        <>
          <h1>Limited-Time Offer</h1>
          <h3 className="text-primary text-center text-[28px] py-5">
            Generate impactful marketing content quickly and <br /> easily.
          </h3>
          <Form
            name="generate"
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "70%", margin: "0 auto" }}
          >
            <div className="grid grid-cols-2 gap-6 mt-16 mb-20">
              <Form.Item name="content_keywords" label="KeyWords">
                <Select
                  options={[
                    { value: "KeyWords 1", label: "KeyWords 1" },
                    { value: "KeyWords 2", label: "KeyWords 2" },
                  ]}
                />
              </Form.Item>

              <Form.Item name="tone_of_voice" label="Tone of Voice">
                <Select
                  options={[
                    { value: "Tone of Voice 1", label: "Tone of Voice 1" },
                    { value: "Tone of Voice 2", label: "Tone of Voice 2" },
                  ]}
                />
              </Form.Item>

              <Form.Item name="content_type" label="Content Type">
                <Select
                  options={[
                    { value: "Content Type 1", label: "Content Type 1" },
                    { value: "Content Type 2", label: "Content Type 2" },
                  ]}
                />
              </Form.Item>

              <Form.Item name="product_names" label="Select Products">
                <Select
                  showSearch={false}
                  mode="multiple"
                  placeholder="Select products"
                  loading={loadingProducts}
                  options={products.map((product) => ({
                    label: product.product_name,
                    value: product.product_name,
                  }))}
                />
              </Form.Item>

              <Form.Item name="offer_time_from" label="From">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item name="offer_time_to" label="To">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item name="discount_percentage" label="Discount Percentage">
                <Select
                  options={[
                    {
                      value: "90",
                      label: "90",
                    },
                    {
                      value: "80",
                      label: "80",
                    },
                  ]}
                />
              </Form.Item>
            </div>

            <Form.Item className="flex justify-end">
              <Button type="primary" htmlType="submit" block>
                Generate
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div className="container py-16 bg-white">
          <h1 className="my-8">Your limited time offer content</h1>
          <div className="mx-auto max-w-[850px]">
            <h2 className="text-[#1B2559] text-lg font-bold">
              {data?.business?.industry}
            </h2>
            <h2 className="text-[#1B2559] mt-6">{data?.generated_content}</h2>
          </div>
          <div className="flex w-full justify-end gap-5 pe-5 mt-10">
            <Button
              className="!bg-white border !text-black"
              type="primary"
              onClick={onSave}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
