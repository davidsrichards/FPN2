import React, { useEffect, useState } from 'react'

function ServerHelperFunction(fakedata, dispatch, controller) {
 const [apidatas, setapidata] = useState({apidata: [], isLoading: false, serverError: null});

 useEffect(()=>{
  (function(){
    try {
      const data = fakedata;
      setapidata((prev) => ({...prev, apidata: data, isLoading: false, serverError: null }))
      dispatch(controller(data));
    } catch (error) {
      setapidata((prev) => ({...prev, isLoading: false,serverError: null}));
      return error
    }
  })()
 },[])


 return [apidatas, setapidata]


}

export default ServerHelperFunction