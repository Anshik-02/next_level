"use client";
import React from "react";
import BasicTimeClock from "../clock";
import MoneyGraph from "../moneyGraph";
import TopLeftBentoCard from "../statsBento";
import PlayerActivityHeatmap from "../heatMap";

const BentoGrid = () => {
  return (
    <div className="w-full flex justify-center items-center md:mt-20 mt-10  px-4 md:px-10">
      <div id="box-container" className="border-2 p-2 border-gray-500 rounded-2xl">
        <div className="box box1"><TopLeftBentoCard/></div>
        <div className="box box2 bg-[url(/assets/clock_bg.png)] bg-cover"><BasicTimeClock/></div>
        <div className="box box3"><MoneyGraph/></div>
        <div className="box box4 bg-[url(/assets/grid44.png)] bg-cover"></div>
        <div className="box box5  bg-[url(/assets/pccc.jpeg)] bg-cover"></div>
        <div className="box box6 ">
          <div><PlayerActivityHeatmap/></div></div>
      </div>
    </div>
  );
};

export default BentoGrid;
