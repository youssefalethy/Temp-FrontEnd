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
          href={"/slogan"}
        />
        <HomeTabCard 
          title={"Logo Creation"}
          description={"Design Stunning Logos"}
          img={img2}
          href={"/logo"}
        />
        <HomeTabCard 
          title={"Business Overview Generator"}
          description={"Essential startup insights"}
          img={img2}
          href={"/businessOverview"}
        />
        <HomeTabCard 
          title={"Brand Documentation Creation"}
          description={"Build your brand identity in minutes."}
          img={img2}
          href={"/brandDocumentation"}
        />
      </div>

    </div>
  );
}
