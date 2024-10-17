import { RiMenuUnfold4Line } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { ImSwitch } from "react-icons/im";

import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { controlSideAction } from "../../../../../Redux/Features/admissionSlice";
function NavigationBar() {
  const dispatch = useDispatch();
  const { showDialog, showside } = useSelector((state) => state.admissionSlice);
  return (
    <nav
      className={`fixed top-0 w-full bg-[#fff] h-[3rem] flex items-center z-10 sha-dow ${
        showDialog && "dim"
      }`}
    >
      <div className="absolute left-6 cursor-pointer md:block hidden hover:bg-gray-200 p-2 rounded-full">
        <FiMenu
          className=" hover:scale-125"
          onClick={() => dispatch(controlSideAction(!showside))}
        />
      </div>
      <div className="p-4 md:hidden block text-shade addmission">
        Admission System
      </div>
      <Link
        to={"/"}
        className={`absolute ${
          showside && "md:right-64"
        } right-6 text-primary text-[1.1rem]  cursor-pointer`}
      >
        <ImSwitch className=" hover:scale-125" />
      </Link>
    </nav>
  );
}

export default NavigationBar;
