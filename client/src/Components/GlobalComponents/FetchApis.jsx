import axios from "axios";
import { useEffect, useState } from "react"

export const FetApis = (jwt, url, move, dispatch=null, action=null) =>{
    const [apidatas, setapidata] = useState({apidata: [], isLoading: false, serverError: null});
    useEffect(() =>{
        (async()=>{
            setapidata((p) => ({...p,isLoading: true}));
            setapidata((p) => ({...p, serverError: null}));
            try {
                const {data} = await axios.get(`/api${url}`, {headers: {Authorization: `Bearer ${jwt}`}});
                data && setapidata((p) => ({...p, apidata: data}));
                data && setapidata((p) => ({...p, isLoading: false}));
                data && setapidata((p) => ({...p, serverError: null}));
               dispatch && action &&  dispatch(action(data));
            } catch (error) {
                setapidata((p) => ({...p, serverError: error}));
                setapidata((p) => ({...p, isLoading: false}));
                return error
            }
        })()
    }, [move])
    return [apidatas, setapidata];
}