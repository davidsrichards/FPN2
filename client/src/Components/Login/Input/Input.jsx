import "./Input.css";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useEffect, useState } from "react";
import {useFormik} from 'formik'
import {Toaster} from 'react-hot-toast'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addJwtToken } from "../../../Redux/Features/adminSlice";
import { validateInput } from "./Validate";
import Loading from "../../DashBoard/Component/Loading/Loading";



// base url
const BASE_URL="/api";

function Input() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const [isText, setIsText] = useState(false);
  const {values, handleSubmit, handleChange, handleBlur, errors, touched}= useFormik({
    initialValues: ({
      username: "",
      password: ""
    }),
    validationSchema: validateInput,

    onSubmit: async (values) =>{
      setloading(true)
      try {
        const {username, password} = values;
        const {data} = await axios.post(`${BASE_URL}/authenticate`, {username, password,}, {withCredentials: true});
        if(data){
        setNav(true)
          setloading(false)
          dispatch(addJwtToken(data.data.jwt))
          
        }
        
      } catch (error) {
        setloading(false)
        return error
        
      }
    }
    
  })

  useEffect(() =>{
    if(nav){
      navigate('/dashboard')
    }
  }, [nav])




  return (
    <div className="w-full h-screen flex items-center justify-center  bg-secondary sm:p-8 p-2 ">
      <div className="bg-[#fff] flex flex-col gap-8 sm:p-12 p-4 py-8 w-full">
        <h1 className="sign text-[1.8rem] self-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 border-b-[0.8px] border-slate-400 pb-6">
         <div>
         <input
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          id="username"
            type="text"
            className={`text-field p-2 outline-none ring-[0.6px] ring-slate-500 rounded-md w-full input ${touched.username && errors.username && 'ring-red-500'}`}
            placeholder="user name"
          />
          <div className="text-red-500">{errors.username}</div>
         </div>
          <div className="relative w-full">
            {!isText && (
              <IoMdEye
                className="absolute right-4 top-[1rem] text-[1.3rem] "
                onClick={() => setIsText(true)}
              />
            )}
            {isText && (
              <IoMdEyeOff
                className="absolute right-4 top-[1rem] text-[1.3rem]"
                onClick={() => setIsText(false)}
              />
            )}
            <div>
            <input
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            id="password"
              type={isText ? "text" : "password"} 
             
              className={`${touched.password && errors.password &&  'ring-red-500'}  text-field p-2 outline-none ring-[0.6px] ring-slate-500 rounded-md w-full`}
              placeholder="password"
            />
            <div className="text-red-500">{touched.password &&  errors.password}</div>
            </div>
          </div>
          <button type="submit" className="bg-primary uppercase p-[0.5rem] text-[#fff] rounded-md transition-all duration-300 ease-in-out hover:bg-[#28608d]">
      {loading?<Loading/>:"Sign In"}
          </button>
        </form>
        <Link className="uppercase btn underline select-none">
          forget your password?
        </Link>
      </div>
    </div>
  );
}

export default Input;
