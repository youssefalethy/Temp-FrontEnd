import React from "react";
import HomeTabs from "./HomeTabs";
import logo from "@/styles/images/logo.png";
import Image from "next/image";

export default function page() {
  return (
    <div className="container mt-28 !mx-auto">
      <div className="flex gap-2">
        {/* <Image src={logo} alt="logo" width={195} height={328} /> */}
        <div className="pt-5 mx-auto">
          <h2 className="py-2 text-[#2E4056] font-semibold text-4xl">Welcome to Ápex</h2>
          <p className="max-w-[900px] text-[#4F5665] text-lg">
            Discover powerful business tools to boost your brand—generate unique
            names, craft catchy slogans, and design stunning logos. Engage
            effortlessly with our sleek card-style layout, each featuring a
            quick start option. Turn your ideas into reality with just one
            click!
          </p>
        </div>
      </div>
      <HomeTabs />
    </div>
  );
}
