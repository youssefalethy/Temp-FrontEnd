import React from "react";
import Image from "next/image";
import logo from "@/styles/images/logoBig.png";
import landing from "@/styles/images/landing.png";
import landing2 from "@/styles/images/landing2.png";
import purbleHeart from "@/styles/images/purbleHeart.png";
import orangeHeart from "@/styles/images/orangeHeart.png";

import { Button } from "antd";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <>
      <div
        className="pt-8 bg-no-repeat bg-cover flex flex-col items-center justify-center h-screen "
        style={{ backgroundImage: `url(${landing.src})` }}
      >
        <h1 className="text-4xl !text-white  text-center pt-14 ">
          Welcome to Ápex!
        </h1>
        <p className="text-6xl !text-white font-bold pt-8 text-center ">
          AI-Powered Marketing, Branding & <br /> Business Growth
        </p>
        {/* <Link href="/signup">
          <Button className="mt-11" type="primary" htmlType="submit" block>
            Get started
          </Button>
        </Link> */}
        <div className="line  h-[2px] w-[600px] mt-4 mx-auto bg-white my-10"></div>
        <p className="text-center w-[900px] text-white ">
          Ápex is your AI-powered partner for helping you automate campaigns,
          gain deep insights, and build a strong brand identity. Whether you're
          launching or scaling, APEX provides smart strategies and expert
          guidance to drive success
        </p>
        {/* <div className="flex gap-24 mt-12">
          <div>
            <Image src={purbleHeart} alt="heart" width={48} height={48} />
            <p className="pt-10 text-[#333333]">Branding Tools </p>
          </div>
          <div>
            <Image src={orangeHeart} alt="heart" width={48} height={48} />
            <p className="pt-10 text-[#333333]">Marketing Tools </p>
          </div>
        </div> */}
        <div className="flex gap-10 items-center justify-center">
          <Link href="/signup">
            <Button
              style={{
                backgroundColor: "white !important",
                color: "black",
                borderRadius: "10px !important",
              }}
              className="mt-11 !bg-white"
              htmlType="submit"
              block
            >
              Sign up
            </Button>
          </Link>
          <Link href="/login">
            <Button
              style={{
                backgroundColor: "white !important",
                color: "black",
                borderRadius: "10px !important",
              }}
              className="mt-11 !bg-white"
              htmlType="submit"
              block
            >
              Sign in
            </Button>
          </Link>
        </div>
        {/* <div className="col-span-2">
        <Image
          src={logo}
          alt="logo"
          width={500}
          height={50}
          className="object-contain"
          quality={100}
          priority
        />
      </div> */}
      </div>
      <div className="container grid grid-cols-2  mt-24">
        <div className="w-[500px] ">
          <Image
            src={landing2}
            alt="logo"
            width={500}
            height={50}
            className="object-contain"
            quality={100}
            priority
          />
        </div>
        <div>
          <h5 className="text-[#2E4056] font-bold text-center">About Ápex</h5>
          <p className="text-[#2E4056] mt-5 text-5xl font-bold">
            Introduction to APEX <br /> Your Digital Growth Partner
          </p>
          <p className="mt-10 text-[#2E4056]">
            pAt APEX, we blend AI, branding, and data-driven strategies to fuel
            your business success. From marketing automation to deep analytics
            and expert guidance, we empower brands to stand out, grow faster,
            and make smarter decisions. Lets build the future together!
          </p>
        </div>
      </div>
      <div className="container grid grid-cols-2 gap-12 my-24">
        <div>
          <p className="text-[#2E4056] mt-5 text-5xl font-bold leading-snug">
            Services We Can Offer You!
          </p>
          <p className="mt-10 text-[#2E4056] text-lg leading-relaxed">
            At APEX, we provide AI-powered solutions to elevate your business.
            From automated marketing and brand strategy to data-driven analytics
            and expert growth consulting, we help you scale smarter and faster.
            Let's turn your vision into success!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mt-7  mb-16 auto-rows-fr">
          {[
            {
              title: "Branding Content Hub",
              desc: "Build a strong and unique brand identity with AI-driven insights and creative strategies.",
            },
            {
              title: "Marketing Content Hub",
              desc: "Automate and optimize your marketing campaigns to engage the right audience effectively.",
            },
            {
              title: "Analytics Insight Hub",
              desc: "Gain deep data-driven insights to make smarter business decisions and boost performance.",
            },
            {
              title: "Business Growth Hub",
              desc: "Get strategies and expert guidance to scale and grow your business successfully.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#2E4056] rounded-md p-6 h-full flex flex-col max-w-[280px]"
            >
              <h2 className="text-white font-bold text-lg text-center mb-2">
                {item?.title}
              </h2>
              <p className="text-white text-xs">{item?.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
