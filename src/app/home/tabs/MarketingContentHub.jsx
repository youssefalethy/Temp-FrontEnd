import React from "react";
import img from "@/styles/images/logo.png";
import img2 from "@/styles/images/logoGen.png";
import HomeTabCard from "../HomeTabCard";

export default function MarketingContentHub() {
  return (
    <div className="my-20 grid grid-cols-4 ">
      <HomeTabCard
        title={"Brand Awarness"} 
        description={"Build Strong Identity"}
        img={img2}
        href={"/brandAwarness"}
      />
      <HomeTabCard
        title={"Product launch"} 
        description={"Ensure a successful debut"}
        img={img2}
        // href={"/productLaunch"}
      />
      <HomeTabCard
        title={"Seasonal Sale"} 
        description={"Boost sales during events"}
        img={img2}
        href={"/seasonalSale"}
      />
      <HomeTabCard
        title={"Limited Time Offer"} 
        description={"Create urgency for buyers"}
        img={img2}
        href={"/limitedTimeOffer"}
      />
    </div>
  );
}

