import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar() {
  const { showDialog, showside } = useSelector((state) => state.admissionSlice);

 
  return (
    <div
      className={`${
        showside && "md:w-56"
      } w-0 h-screen bg-primary fixed flex top-0 overflow-hidden`}
    >
      <ul className="flex w-full flex-col text-[#fff] py-x">
        <li className="uppercase p-4  addmission tracking-tighter">
          Admission System
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
