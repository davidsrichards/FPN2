
import { useDispatch, useSelector } from "react-redux";
import {useNavigation, Navigate} from 'react-router-dom'
import Component from "./Component/Component";
import { useEffect } from "react";
import { FetApis } from "../GlobalComponents/FetchApis";
import { addProgrammeType } from "../../Redux/Features/admissionSlice";

function DashBoard() {
  const dispatch = useDispatch()
  const {jwt} = useSelector(state => state.admin);
  const [{apidata, isLoading, serverError,}] = FetApis(jwt, '/programme-type/get-all', true, dispatch, addProgrammeType);

 

if(!jwt) return <Navigate to={"/"} relative={true} replace/>
  return (
    <div className="">
      <Component />
    </div>
  );
}

export default DashBoard;
