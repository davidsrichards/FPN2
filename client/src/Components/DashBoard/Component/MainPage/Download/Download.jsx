import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"


 function Download() {   
const {jwt} = useSelector(state => state.admin); 
 const {admissionId, departmentId, facultyId, programmeId, download} = useSelector(state => state.downloadSlice); 
 
    useEffect(() =>{
      
      (async function(){
        try {
          const res = await axios.get(`/api/admission/admission-bulk?admission=${admissionId}&faculty=${facultyId}&department=${departmentId}&programme=${programmeId}`, {headers: {Authorization: `Bearer ${jwt}`}})
          if(res){

            return res.data
          }}
            catch (error) {
              console.log(error)
              return error
         
         }
      })();
    })
   }


export default Download


