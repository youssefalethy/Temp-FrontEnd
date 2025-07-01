"use client";
import React, { useEffect } from "react";
import { Button, Layout, Menu, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined, HomeOutlined, MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import Image from "next/image";
import logo from "@/styles/images/logo.png";
import nav from "@/styles/images/navbar.png";

const { Header } = Layout;

const Navbar = () => {
  const param = usePathname();
  const { user } = useAuth();

  useEffect(() => { }, [param]);

  const menuItems = (
    <Menu
      style={{
        borderRadius: 16,
        padding: 8,
        minWidth: 160,
        backgroundColor: "#fff",
      }}
      items={[
        {
          key: "profile",
          icon: <UserOutlined />,
          label: <Link href="/profile">Profile Page</Link>,
        },
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: (
            <button
              onClick={() => {
                // TODO: implement logout
                console.log("Logout clicked");
              }}
              className="w-full text-left bg-transparent border-none"
            >
              Logout
            </button>
          ),
        },
      ]}
    />
  );

  return (
    <Layout>
      {param !== "/signup" && param !== "/login" && param !== "/Products" && (
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundImage: `url(${nav.src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "300px",
            padding: "0 2rem",
          }}
        >
          {/* <div
          className="flex items-center login_wrapper"
          style={{ marginLeft: "auto" }}
        >
          {!user && (
            <>
              <h4 className="text-[#424242]">Have An Account?</h4>
              <Link href={"/login"}>
                <Button className="text-white px-4 py-1 ml-2">Login</Button>
              </Link>
            </>
          )}
        </div> */}
          {param !== "/" && (
            <div className="container flex items-top mb-10 justify-between">
              <div className="cursor-pointer flex items-center gap-2">
                <MenuOutlined style={{ fontSize: "44px", color: "white" }} />
                <h2 className="text-white font-bold text-lg">Menu</h2>
              </div>

              <div className="flex items-center gap-4 rounded-full ms-auto ">
                {/* Dropdown on left */}
                <Dropdown
                  overlay={menuItems}
                  placement="bottomLeft"
                  trigger={["click"]}
                >
                  <div
                    className="bg-white text-[#333] shadow rounded-full cursor-pointer"
                    style={{
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <UserOutlined style={{ fontSize: 18 }} />
                  </div>
                </Dropdown>
                <h2 className="text-white font-bold text-lg">Brand Name</h2>
                {/* Brand Name and Logo */}
                {/* <div className="flex items-center gap-2">
              <Image src={logo} alt="logo" width={40} height={40} />
              <span className="text-white text-lg font-semibold">
                Brand Name
              </span>
            </div> */}
              </div>
            </div>
          )}
        </Header>
      )}
    </Layout>
  );
};

export default Navbar;
