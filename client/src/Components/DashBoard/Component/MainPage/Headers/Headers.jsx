import { IoSearch } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {addAdmissions, addProgrammeType, controlDialogAction } from "../../../../../Redux/Features/admissionSlice";
import { useEffect, useReducer, useState } from "react";
import ServerHelperFunction from "../../../../GlobalComponents/ServerHelperFunction";
import { fakeAdmissionYear, fakeProgrammeType } from "../Data/fake";
import { FetApis } from "../../../../GlobalComponents/FetchApis";
import { addAdmissionId } from "../../../../../Redux/Features/download";
// base url
const BAS_URL="https://test.fpn.edu.ng/api";

const reducer = (state, action) =>{
  switch(action.type){
    case "type": return {...state, selectedtType: action.payload};
    case "year": return {...state, selectedAdmission: action.payload};
  }
}
function Headers() {
  const dispatch = useDispatch();
  const [admissions, setAdmissions] = useState([])

  const {jwt} = useSelector(state => state.admin);
  const [state, dispatching] = useReducer(reducer, {selectedtType: "", selectedAdmission: ""});
  // to show the dialog filter
  const { showDialog } = useSelector((state) => state.admissionSlice);
  // admission type
  const [apidatas, setapidata] = FetApis(jwt, '/programme-type/get-all', true, dispatch, addProgrammeType);
 // admission year
 useEffect(() => {
  if(state.selectedtType){
   const findId =  apidatas.apidata.find((api) => api.name === state.selectedtType).id;
    (async function(){
      try {
        const {data} = await axios.get(`https://test.genysyx.com/api/admission/get-admissions?prog_type=${findId}`, {headers: {Authorization: `Bearer ${jwt}`}})
        setAdmissions(data ?? []);
      } catch (error) {
        return error
        
      }
  
    })()
  } else{
    setAdmissions([])
  }
}, [state.selectedtType])



// get id
useEffect(() =>{
 if(state.selectedAdmission){
 const admissonId =  admissions?.find((ad) => ad.name === state.selectedAdmission).id;
 if(admissonId){
  dispatch(addAdmissionId(admissonId))

 }
 }
}, [state.selectedAdmission])


  return (
    <div className="w-full pb-2">
      <div
        className={`flex items-center justify-between  w-full  p-4 bg-[#fff] parent rounded-md ${
          showDialog ? "dim" : "nav2"
        }`}
      >
        <div className="flex items-center  gap-4 xl:w-auto  w-full flex-wrap ">
           {/* type */}
           <select value={state.selectedtType} onChange={(e) => dispatching({type: "type", payload:e.target.value})} name="" id=""   className={`mt-1 block  text-base border-gray-500  focus:ring-indigo-500 sm:text-sm outline-none sha-dow w-[10rem] p-2 rounded-full ${showDialog && "bg-transparent"}`}>
            <option value="" disabled  hidden>{apidatas.isLoading ? "Loading...":"Programme Type"}</option>
            {apidatas.apidata?.map((ad, i) => (
              <option value={ad.name}  key={i}>{ad.name}</option>
            ))}
           </select>
          {/* year */}
           <select value={state.selectedAdmission} onChange={(e) => dispatching({type: "year", payload: e.target.value})} name="" id=""  className={`mt-1 block  text-base border-gray-500  focus:ring-indigo-500 sm:text-sm outline-none sha-dow w-[10rem] p-2 rounded-full ${
              showDialog && "bg-transparent"
            }`}>

              <option value="">Admission</option>
              {admissions?.map((op, i) => (
                <option value={op.name} key={i}>{op.name}</option>
              ))}
            
           </select>
        

          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className={`sha-dow outline-none rounded-full p-1 px-2 ${
                showDialog && "dim"
              }`}
            />
            <IoSearch className="absolute top-2 right-4 text-[1.1rem text-slate-200]" />
          </div>

          {/*  */}
        </div>
        <button
          className="flex items-center gap-2 nav p-[0.2rem] rounded-lg
            px-[0.8rem] bg-primary text-[#fff] cursor-pointer hover:bg-[#0b253b]"
          onClick={() => {
            dispatch(controlDialogAction(!showDialog));
          }}
        >
          <FaFilter className=" text-red-300" />
          <span className="text-slate-200">Filter</span>
        </button>
      </div>
    </div>
  );
}

export default Headers;



