import React from "react";
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";

export default function HomeTabCard({ img, title, description,href }) {
  return (
    <div className="max-w-[300px] overflow-hidden shadow-md rounded-md bg-white">
      {img && (
        <Image
          src={img}
          alt="image"
          width={300}
          height={171}
          className="h-[174px]"
        />
      )}
      <div className="p-4">
        <h2 className="text-[#3B3F5C] pb-3 text-[20px] font-medium">{title}</h2>
        <p className="text-[#3B3F5C]">{description}</p>
        <div className="flex justify-center pb-2">
          <Link href={href??"/"}>
            <Button className="mt-9 " type="primary" htmlType="submit" block>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
