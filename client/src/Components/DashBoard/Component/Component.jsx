import { useSelector } from "react-redux";
import MainPage from "./MainPage/MainPage";
import NavigationBar from "./MainPage/NavigationBar/NavigationBar";
import Sidebar from "./Sidebar/Sidebar";
import Filter from "./MainPage/Headers/Filter/Filter";
import Scroller from "./Scroller/Scroller";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

function Component() {
  const { showDialog, showside } = useSelector((state) => state.admissionSlice);

  useEffect(() => {
    if (showDialog) {
      document.body.classList.add("dim");
    } else {
      document.body.classList.remove("dim");
    }
  }, [showDialog]);

  return (
    <div className={`${showDialog && "dim"}`}>
      <Sidebar />
      <div className={`flex-1 ${showside && "md:ml-56"} `}>
        <NavigationBar />
        <Outlet/>
      </div>
      <Scroller />
    </div>
  );
}

export default Component;
