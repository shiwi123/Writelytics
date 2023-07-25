import React, { useContext } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
function Login() {
 
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [redirect,setRedirect]=useState(false);

    const {setUserInfo} = useContext(UserContext);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username,password }),
        credentials:'include',
    };
    async function login(ev){
           ev.preventDefault();
           const response = await fetch("http://localhost:4000/login",requestOptions);

           console.log(response);
           if(response.ok){
                  response.json().then(userInfo=>{
                    setUserInfo(userInfo);
                    setRedirect(true);
                  })
                  
           }
           else{
                alert('wrong credentials');
           }

           
          
    }

    if(redirect){

        return <Navigate to={"/"}/>
    }
    return (
     
      <form className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12" onSubmit={login}>
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
              </div>
              <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                  <div className="max-w-md mx-auto">
                     
                      <div className="divide-y divide-gray-200">
                          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                              <div className="relative">
  
                                  {/* username input */}
                                  <input autocomplete="off" id="username" name="username" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Username"  value={username} onChange={(e)=>setUsername(e.target.value)}/>
                                  <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">username</label>
                              </div>
                              <div className="relative">
  
                                  {/* password input */}
                                  <input autocomplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                                  <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                              </div>
                              <div className="relative">
                                  <button className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </form>
    )
}

export default Login;
