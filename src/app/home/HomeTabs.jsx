"use client";
import React from "react";
import { Tabs } from "antd";
import HomeTabCard from "./HomeTabCard";
import BrandingContentHub from "./tabs/BrandingContentHub";
import MarketingContentHub from "./tabs/MarketingContentHub";
import AnalyticsInsightHub from "./tabs/AnalyticsInsightHub";
import BusinessGrowthHub from "./tabs/BusinessGrowthHub";

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: "Branding Content Hub",
    children: <BrandingContentHub />,
  },
  {
    key: "2",
    label: "Marketing Content Hub",
    children: <MarketingContentHub />,
  },
  {
    key: "3",
    label: "Business Growth Hub",
    children: <BusinessGrowthHub />,
  },
  {
    key: "4",
    label: "Analytics Insight Hub",
    children: <AnalyticsInsightHub />,
  },
];
const HomeTabs = () => (
  <div className=" mt-20 !mx-auto">
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </div>
);
export default HomeTabs;
