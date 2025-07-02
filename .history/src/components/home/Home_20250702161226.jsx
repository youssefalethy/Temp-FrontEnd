import React from "react";
import Image from "next/image";
import logo from "@/styles/images/logoBig.png";
import logoSm from "@/styles/images/smLogo.png";
import landing from "@/styles/images/landing.png";
import landing2 from "@/styles/images/landing2.png";
import purbleHeart from "@/styles/images/purbleHeart.png";
import orangeHeart from "@/styles/images/orangeHeart.png";
import brandContent from "@/styles/images/brandContent.png";
import Icon2 from "@/styles/images/Icon2.png";
import icon3 from "@/styles/images/Icon3.png";
import icon4 from "@/styles/images/Icon4.png";
import { Button } from "antd";
import Link from "next/link";
import treeLink from "@/styles/images/treeLink.png";

export default function WelcomePage() {
  return (
    <>
      <div
        className=" bg-no-repeat bg-cover  h-screen "
        style={{ backgroundImage: `url(${landing.src})` }}
      >
        <div className="container flex justify-between items-center w-full">
          <Image
            src={logoSm}
            alt="logo"
            width={100}
            height={103}
            className="object-contain"
            quality={100}
            priority
          />
          <div className="flex gap-8 items-center text-white">
            <Link href={"/"}>home</Link>
            <Link href={"/"}>About us</Link>
            <Link href={"/"}>services</Link>
            <Link href={"/"}>
              <Button
                style={{
                  backgroundColor: "white !important",
                  color: "black",
                  borderRadius: "10px !important",
                  marginLeft: "10px",
                }}
                className=" !bg-white"
                htmlType="submit"
                block
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
        <div className="line h-[1px] w-full bg-white " />
        <div className="flex flex-col items-center justify-center h-screen">
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
            gain deep insights, and build a strong brand identity. Whether
            you're launching or scaling, APEX provides smart strategies and
            expert guidance to drive success
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

        <div className="grid sm:grid-cols-2 gap-9 mt-7  mb-16 auto-rows-fr">
          {[
            {
              title: "Branding Content Hub",
              desc: "Build a strong and unique brand identity with AI-driven insights and creative strategies.",
              logo: brandContent,
              href: "/",
            },
            {
              title: "Marketing Content Hub",
              desc: "Automate and optimize your marketing campaigns to engage the right audience effectively.",
              logo: Icon2,
              href: "/",
            },
            {
              title: "Analytics Insight Hub",
              desc: "Gain deep data-driven insights to make smarter business decisions and boost performance.",
              logo: icon3,
              href: "/",
            },
            {
              title: "Business Growth Hub",
              desc: "Get strategies and expert guidance to scale and grow your business successfully.",
              logo: icon4,
              href: "/",
            },
          ].map((item, i) => (
            <Link
              key={i}
              href={item?.href}
              className="bg-[#2E4056] rounded-md p-6 h-full flex flex-col max-w-[280px] relative "
            >
              <div className="absolute p-2 flex items-center justify-center border-[3px] border-[#2E4056]  top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full w-[60px] h-[60px] bg-white ">
                <Image
                  src={item?.logo}
                  alt="logo"
                  width={50}
                  height={50}
                  className="object-contain"
                  quality={100}
                  priority
                />
              </div>
              <h2 className="text-white font-bold text-lg text-center my-2">
                {item?.title}
              </h2>
              <p className="text-white text-xs">{item?.desc}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="container py-14 grid grid-cols-3 gap-9 mt-7 w-full  bg-[#F7F7F7] ">
        <div>
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={103}
            className="object-contain"
            quality={100}
            priority
          />
          <p className="mt-3 ">
            We growing up your business to the <br /> international scale.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <Link href={"/"}>home</Link>
          <Link href={"/"}>About us</Link>
          <Link href={"/"}>services</Link>
        </div>
        <div className="flex items-center">
          <Image
            src={treeLink}
            alt="logo"
            width={300}
            height={103}
            className="object-cover "
            quality={100}
            priority
          />
        </div>
        <div className="col-span-1"></div>
        <h2 className="text-center text-sm">
          © 2025 Ápex. All Rights Reserved.
        </h2>
        <div className="col-span-1"></div>
      </div>
    </>
  );
}
