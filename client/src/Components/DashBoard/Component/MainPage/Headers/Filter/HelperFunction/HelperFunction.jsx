import axios from "axios";
import { useState } from "react"

export const FilterHelperFunction = async(jwt, url, alldatas, setalldata, move) =>{   
    setalldata((p) => ({...p, isloading: true}))
    const handleRequest = async() =>{

try {
    const {data} = await axios.get(`${url}`, {headers: {Authorization: `Bearer ${jwt}`}});
    if(data){
        setalldata((p) => ({...p, data: data}))
        setalldata((p) => ({...p, isloading: false}))
        setalldata((p) => ({...p, serverError: null}))
    }
} catch (error) {
    setalldata((p) => ({...p, isloading: false}))
    setalldata((p) => ({...p, serverError: error}))
    return error
}
    }
    handleRequest();

}


// reset all

export const resetAll = () =>{
    const [state, setstate] = useState()
    return setstate({});
}

