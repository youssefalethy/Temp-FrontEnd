"use client";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import img from "@/styles/images/logonMain.png";

export default function Signup() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (value) => {
    setLoading(true);
    try {
      setLoading(true);

      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      setLoading(false);

      if (!response.ok) {
        message.error("Registration failed. Please try again.");
        return;
      }
      setLoading(false);

      const data = await response.json();
      message.success("Registration successful!");
      console.log("Success:", data);

      router.push("/Products");
      return data;

    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      message.error("An error occurred. Please try again.");
    }
  };

  const handleChange = ({ file }) => {
    if (file.status === "uploading") {
      // Optional: You can show a loading state here
      return;
    }
    if (file.status === "done" || file.status === "success") {
      // Use local preview if server URL isn't available
      const uploadedUrl =
        file.response?.url || URL.createObjectURL(file.originFileObj);
      setImageUrl(uploadedUrl);
    }
  };
  return (
    <div className="">
      <div className="grid grid-cols-5 gap-14 h-screen">
        <div className="col-span-3 pt-14">
          <div className="flex items-center gap-2 w-fit ms-auto">
            <h5>have an account?</h5>
            <Link href="/login">
              <Button
                style={{
                  backgroundColor: "white !important",
                  color: "black",
                  borderRadius: "10px !important",
                  padding: "20px !important",
                  height: "20px !important",
                }}
                className=" !bg-white"
                htmlType="submit"
                block
                loading={loading}
              >
                Login
              </Button>
            </Link>
          </div>
          <div>
            <h1>Create An Account</h1>
            <h3 className="text-primary text-center text-sm pb-8">
              PLEASE SIGN UP TO CREATE YOUR ACCOUNT
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
                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="col-span-4">
                    <Form.Item name="brand_name" required={false}>
                      <Input placeholder="Business Name" />
                    </Form.Item>
                  </div>
                  <Form.Item name="industry" required={false}>
                    <Select
                      defaultValue="industry"
                      // onChange={handleChange}
                      options={[
                        {
                          value: "Technology",
                          label: "Technology",
                        },
                        {
                          value: "Fashion",
                          label: "Fashion",
                        },
                        {
                          value: "Food & Beverage",
                          label: "Food & Beverage",
                        },
                        {
                          value: "Health & Wellness",
                          label: "Health & Wellness",
                        },
                        {
                          value: "Finance",
                          label: "Finance",
                        },
                        {
                          value: "Education",
                          label: "Education",
                        },
                        {
                          value: "Automotive",
                          label: "Automotive",
                        },
                        {
                          value: "Real Estate",
                          label: "Real Estate",
                        },
                        {
                          value: "Travel & Hospitality",
                          label: "Travel & Hospitality",
                        },
                        {
                          value: "Susatainability",
                          label: "Susatainability",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item name="country" required={false}>
                    <Select
                      defaultValue="country"
                      // onChange={handleChange}
                      options={[
                        {
                          value: "United States",
                          label: "United States",
                        },
                        {
                          value: "Canada",
                          label: "Canada",
                        },
                        {
                          value: "United Kingdom",
                          label: "United Kingdom",
                        },
                        {
                          value: "Germany",
                          label: "Germany",
                        },
                        {
                          value: "France",
                          label: "France",
                        },
                        {
                          value: "India",
                          label: "India",
                        },
                        {
                          value: "China",
                          label: "China",
                        },
                        {
                          value: "Japan",
                          label: "Japan",
                        },
                        {
                          value: "Australia",
                          label: "Australia",
                        },
                        {
                          value: "Egypt",
                          label: "Egypt",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item name="target_audience" required={false}>
                    <Select
                      defaultValue="Target Audience"
                      // onChange={handleChange}
                      options={[
                        {
                          value: "Gen Z",
                          label: "Gen Z",
                        },
                        {
                          value: "Millennials",
                          label: "Millennials",
                        },
                        {
                          value: "Professionals",
                          label: "Professionals",
                        },
                        {
                          value: "Families",
                          label: "Families",
                        },
                        {
                          value: "Entrepreneurs",
                          label: "Entrepreneurs",
                        },
                        {
                          value: "Luxury Seekers",
                          label: "Luxury Seekers",
                        },
                        {
                          value: "Budget Conscious",
                          label: "Budget Conscious",
                        },
                        {
                          value: "Global Audience",
                          label: "Global Audience",
                        },
                        {
                          value: "Local Community",
                          label: "Local Community",
                        },
                        {
                          value: "Tech Enthusiasts",
                          label: "Tech Enthusiasts",
                        },
                      ]}
                    />
                  </Form.Item>
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
                <Form.Item
                  name="confirm password"
                  required={false}
                  rules={[
                    { required: true, message: "Please enter your password" },
                    { min: 6, message: "Must be at least 6 characters" },
                  ]}
                >
                  <Input.Password placeholder="confirm password" />
                </Form.Item>
                <Form.Item valuePropName="fileList" name="img">
                  <div className="flex gap-3 items-center">
                    <Upload
                      listType="picture-card"
                      maxCount={1}
                      showUploadList={false}
                      beforeUpload={(file) => {
                        const isImage = file.type.startsWith("image/");
                        if (!isImage) {
                          alert("You can only upload image files!");
                          return Upload.LIST_IGNORE;
                        }
                        return true;
                      }}
                      onChange={handleChange} // Handle preview updates
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="Uploaded"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-[#E2E6EC] flex justify-center items-center">
                          <CloudUploadOutlined style={{ fontSize: "20px" }} />
                        </div>
                      )}
                    </Upload>
                    <h3 className="text-sm">Upload your logo from here</h3>
                  </div>
                </Form.Item>

                <Form.Item className="mt- flex justify-center">
                  <Button type="primary" htmlType="submit" block>
                    Sign up
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-[#2E4056] h-full pt-9">
          <div className="flex items-center justify-center h-full">
                                      <div className="relative w-[500px] h-[500px]">
                                        <Image
                                          src={img}
                                          alt="image"
                                          fill
                                          className="object-contain"
                                          priority
                                        />
                                      </div>
            </div>
        </div>
      </div>
    </div>
  );
}
