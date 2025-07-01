import React from "react";
import img from "@/styles/images/logo.png";
import img2 from "@/styles/images/logoGen.png";
import HomeTabCard from "../HomeTabCard";

export default function AnalyticsInsightHub() {
  return (
    <div className="my-20 flex items-center justify-center flex-wrap gap-4">
      <HomeTabCard
        title={"SWOT Analysis Tool"}
        description={"identify key business factors"}
        img={img2}
        href={"/swot"}
      />
      <HomeTabCard
        title={"Marketing Plan Generator"}
        description={"Create effective strategies"}
        img={img2}
        href={"/marketingPlan"}
      />
      <HomeTabCard
        title={"Dashboard"}
        description={"Track Performance easily"}
        img={img2}
        href={"/dashboard"}
      />

    </div>
  );
}
