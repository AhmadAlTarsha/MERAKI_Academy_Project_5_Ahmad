import {React ,useState,useEffect} from 'react'
//import useState from
import { useDispatch, useSelector } from "react-redux";
//import { setLogin, setLogout, setUserId,  } from "../redux/reducers/auth/index";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { GetAllRegions } from '../../Services/APIS/Regions/GetRegions';
import { register, } from '../../Services/Redux/auth';
import { setRegions } from '../../Services/Redux/regions/regions'; 

export const Register = () => {
    useEffect(() => {
        GetAllRegions()
          .then((res) => {
            console.log(res);
            dispatch(setRegions(res.regions));
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    const className = "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    const [registration, setRegistration] = useState({
        first_name: "",
        last_name: "",
        nick_name:"",
        email:"",
        password:"",

      });
   
    const dispatch = useDispatch();
    const select = useSelector((state) => {

      return {
        
        register: state.auth,
      };
    });
    const select2 = useSelector((state) => {

      return {
        
      regions:state.regions.regions
      };
    });

    const handleSubmit = (e) => {
        e.preventDefault();
      console.log("from handel"  , select2);
    dispatch(register(registration))
      
          
      };

    return (
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign up
                        </h1>
                        <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6" action="#">
                            <div>

                                <Input labelName={"First Name"} labelClassName={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"} divClassName={""} name={"First Name"} type={"name"} inputClassName={className} placeHolder={"Your Name"} onChange={(e)=>{
                                    setRegistration({
                                        first_name:e.target.value,
                                        last_name:registration.last_name,
                                        nick_name:registration.nick_name,
                                        email:registration.email,
                                        password:registration.password,
                    
                                    })
                                }} />
                            </div>
                            <div>

                                <Input labelName={"Last Name"} labelClassName={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"} divClassName={""} name={"Last Name"} type={"name"} inputClassName={className} placeHolder={"Your Family Name"} onChange={(e)=>{
                                    setRegistration({
                                        first_name:registration.first_name,
                                        last_name:e.target.value,
                                        nick_name:registration.nick_name,
                                        email:registration.email,
                                        password:registration.password,
                    
                                    })
                                }}   />
                            </div>
                            <div>

                                <Input labelName={"Nick Name"} labelClassName={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"} divClassName={""} name={"Nick Name"} type={"name"} inputClassName={className} placeHolder={"Your Name In Website"} onChange={(e)=>{
                                    setRegistration({
                                        first_name:registration.first_name,
                                        last_name:registration.last_name,
                                        nick_name:e.target.value,
                                        email:registration.email,
                                        password:registration.password,
                    
                                    })
                                }}   />
                            </div>
                            <div>
                                <label for="region" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Region</label>
                                <select onChange={(e) => {
                                    console.log(e.target.value);
                                }} name="region" id="region" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                    <option value="" disabled selected>Select Region</option>
                                    {select2?.regions.map(((regin, i) => {
                                        return < option value={(regin.id)}>{regin.region}</option>
                                    }))}

                                </select>
                            </div>
                            <div>

                                <Input labelName={"Your email"} labelClassName={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"} divClassName={""} name={"email"} type={"email"} inputClassName={className} placeHolder={"name@company.com"} onChange={(e)=>{
                                    setRegistration({
                                        first_name:registration.first_name,
                                        last_name:registration.last_name,
                                        nick_name:registration.nick_name,
                                        email:e.target.value,
                                        password:registration.password,
                    
                                    })
                                }}   />
                            </div>
                            <div>

                                <Input divClassName={""} name={"password"} type={"password"} inputClassName={className} placeHolder={"••••••••"} labelName={"Password"} labelClassName={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}  onChange={(e)=>{
                                    setRegistration({
                                        first_name:registration.first_name,
                                        last_name:registration.last_name,
                                        nick_name:registration.nick_name,
                                        email:registration.email,
                                        password:e.target.value,
                    
                                    })
                                }}  />
                            </div>
                            <div>

                                <Input divClassName={""} name={"confirm-password"} type={"password"} inputClassName={className} placeHolder={"••••••••"} labelName={"Confirm password"} labelClassName={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"} />
                            </div>

                            <div>
                                <label>user or service provider ?</label>
                                <select name="user-type" id="user-type" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                 <option value="" disabled selected>Select role</option>    
                                       {/* { roles.map(((role, i) => {
                                            return < option value={(i+ 1)}>{role}</option>
                                        }))} */}
                                </select></div>
                            <div>
                                <label
                               for="profile-image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Image</label>
                                <input onChange={(e)=>{
                                    // settest(e.target)
                                    console.log(e.target.files[0]);
                                }}  type="file" name="profile-image" id="profile-image" accept="image/*" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>


    )
}



