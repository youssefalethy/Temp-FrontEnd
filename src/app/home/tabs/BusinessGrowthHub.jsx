import React from "react";
import img from "@/styles/images/logo.png";
import img2 from "@/styles/images/logoGen.png";
import HomeTabCard from "../HomeTabCard";

export default function BusinessGrowthHub() {
  return (
    // <div className="my-20 grid grid-cols-4 mx-auto  gap-4">

    <div className="my-20 grid grid-cols-4 mx-auto  gap-4">
      <div className="col-span-1"></div>


      <HomeTabCard
        title={"Business Enhancment Guide"}
        description={"Maximize growth strategies"}
        img={img2}
        href={"/enhancmentGuide"}
      />
      <HomeTabCard
        title={"Social Media Traffic Guide"}
        description={"Boost Online engagement"}
        img={img2}
      // href={"/trafficGuide"}
      />

    </div>
  );
}
