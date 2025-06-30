"use client";
import { useAuth } from "@/contexts/authContext";
import { loginAction } from "@/mutation/serverActions";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const router = useRouter();
  const { login } = useAuth();

  const onFinish = async (value) => {
    
    const token = JSON.parse(localStorage.getItem('user')).access;
      const data= await fetch('http://localhost:8000/api/changepassword/', {
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
    
    
    // const res = await loginAction(value);
    // if (res) {
    //   login(res?.data?.email);
    //   router.push("/dashboard");
    // } else {
    //   message.error("please check your email or password");
    // }
  };

  return (
    <div className="mt-20">
      <h1 className="pt-8 pb-20">Change Password</h1>

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
            name="old_password"
            required={false}
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder=" Enter Old Password" />
          </Form.Item>
          <Form.Item
            name="new_password"
            required={false}
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder=" Enter New Password" />
          </Form.Item>

          <Form.Item className=" flex justify-end">
            <Button className="mt-9 w-11" type="primary" htmlType="submit" block>
              save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
