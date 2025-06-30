import React from "react";
import img from "@/styles/images/logo.png";
import img2 from "@/styles/images/logoGen.png";

import HomeTabCard from "../HomeTabCard";

export default function BrandingContentHub() {
  return (
    <div>
      <div className="my-20 grid grid-cols-4 ">
        <HomeTabCard 
          title={"Business Name Generator"} 
          description={"Unique business name ideas"}
          img={img2}
          href={"/businessNameGenerator"}
        />
        <HomeTabCard
          title={"Slogan Generator"}
          description={"Create catchy slogans"}
          img={img2}
          // href={"/sloganGenerator"}
        />
        <HomeTabCard 
          title={"Logo Creation"}
          description={"Design Stunning Logos"}
          img={img2}
          // href={"/logoCreation"}
        />
        <HomeTabCard 
          title={"Business Overview Generator"}
          description={"Essential startup insights"}
          img={img2}
          href={"/businessOverview"}
        />
      </div>

    </div>
  );
}
