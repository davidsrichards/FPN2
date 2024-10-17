
import GlobalSelect from "./GlobalSelect";
import { addDepartment, addFaculty, controlDialogAction } from "../../../../../../Redux/Features/admissionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import ServerHelperFunction from "../../../../../GlobalComponents/ServerHelperFunction";
import { fakeFaculties } from "../../Data/fake";
import { FetApis } from "../../../../../GlobalComponents/FetchApis";
import axios from "axios";
import {FilterHelperFunction } from "./HelperFunction/HelperFunction";
import { addDepartmentId, addFacultyId, addprogrammeId, handleDownload } from "../../../../../../Redux/Features/download";



function Filter() {
  const {jwt} = useSelector(state => state.admin);
  const dispatch = useDispatch()
  const [values, setValues] = useState({faculty: "", department: "", progType: "", admission: ""});
  const [department, setdepartment] = useState({data: [], isloading: false, serverError: null});
  const [admissions, setadmission] = useState({data: [], isloading: false, serverError: null});
  const [programmes, setprogrammes] = useState({progammetypes: [], admissions: [], isloading: false, serverError: null})
  
  // dialog
  const { showDialog } = useSelector((state) => state.admissionSlice);
 /*  const [{apidata, isLoading, serverError}] = ServerHelperFunction(fakeFaculties, dispatch, addFaculty); */
 const [apidatas, setapidata] = FetApis(jwt, "/faculty/all", true, dispatch, addFaculty);



 // handle department
 useEffect(() =>{
  if(values.faculty){
   const facultyId =  apidatas.apidata?.find((data) => data.name === values.faculty).id;  
      (async function(){
         await FilterHelperFunction(jwt, `/api/department/all/${facultyId}`, department, setdepartment);
      })()
  }
 }, [values.faculty])

 // programme types

useEffect(() =>{
  (async function(){
    try {
      const {data} = await axios.get(`/api/programme-type/get-all`, {headers: {Authorization: `Bearer ${jwt}`}});
      data && setprogrammes((p) => ({...p, progammetypes: data}));
    } catch (error) {
      console.log(error)
      
    }
  })()
})

// handle admissions

useEffect(() =>{
  if(values.progType){
    (async function(){
      const findId =  programmes.progammetypes?.find((prog) => prog.name === values.progType).id;
      await FilterHelperFunction(jwt, `/api/programme/all/${findId}`, admissions, setadmission);
     })()
  }
}, [values.progType])




// handle faculty change
const handleFacultyChange = (e) =>{
  setValues((p) => ({...p, faculty: e.target.value}))
}

// handle department change
const handleDepartmentChange = (e) =>{
  setValues((p)=> ({...p, department: e.target.value}))
}

// handle programetype change
const handleProgTypeChange = (e) =>{
  setValues((p) => ({...p, progType: e.target.value}))
}

// handle admission change
const handleAdmissionChange = (e) =>{
  setValues((p) => ({...p, admission: e.target.value}));
}

// resetbutton

const reset = () =>{
setprogrammes({})
}

// downloaded files




const valid = values.faculty && values.department && values.admission;
useEffect(() =>{
 if(values.faculty && values.department && values.admission){
  const findFacId = apidatas?.apidata?.find((data) => data.name === values.faculty).id;
  const findDepId = department?.data?.find((data) => data.name === values.department).id
  const findProgId = admissions?.data?.find((data) => data.name === values.admission).id;
  if(findFacId && findDepId && findProgId){
    dispatch(addFacultyId(findFacId))
    dispatch(addDepartmentId(findDepId))
    dispatch(addprogrammeId(findProgId))
  }
 }
}, [valid])




  return (
    <div
      className="bg-white p-4 rounded-md  flex flex-col gap-4  z-10 sha-dow filter  h-full items-center justify-center"
      role="dialog"
    >
      <h1 className="font-semibold addmission pb-4 self-start">
        Apply Filter
      </h1>
      <div className="grid grid-cols-2 gap-4 w-full justify-items-center">
      <GlobalSelect action={apidatas.isLoading?'Loading...':'Faculty'} options={apidatas?.apidata} state={values.faculty} handlechange={handleFacultyChange}/>
 <GlobalSelect action={department.isloading ?'Loading...':"Department"} options={department?.data} state={values.department} handlechange={handleDepartmentChange}/>
        <GlobalSelect action={"Programme Type"} options={programmes?.progammetypes}  state={values.progType} handlechange={handleProgTypeChange}/>
        <GlobalSelect action={admissions.isloading?"Loading...":"Programme"} options={admissions.data} state={values.admission} handlechange={handleAdmissionChange}/>
      </div>

      <div className="flex items-center justify-around uppercase leading-[50px] text-[13px]  w-full border-">
        <button
          className="text-red-400"
          onClick={() => dispatch(controlDialogAction(!showDialog))}
        >
          Cancel
        </button>
        <button className="text-yellow-400" onClick={reset}>Reset</button>
        <button className="text-blue-400">View</button>
        <button className="text-red-400">Download</button>
      </div>
    </div>
  );
}

export default Filter;
