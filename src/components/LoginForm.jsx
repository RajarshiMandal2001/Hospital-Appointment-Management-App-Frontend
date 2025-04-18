import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthTokenWithExpiry } from "../services/authToken";
import { makeRequest } from "../services/makeRequest";

const LoginForm = () => {
  const navigate = useNavigate();
//   const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Patient");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  

  const handleLogin = async (e) => {
    e.preventDefault();

    if (userName && password) {
        const payload = {
            username: userName,
            password: password
        }
        setIsLoading(true);
        if ( userType === 'Patient' ){
            try {
                const data = await makeRequest("http://localhost:8000/api/patients/login/", 'POST', payload);
                if ( data.access ) {
                    setAuthTokenWithExpiry("token", data , 1000 * 60 * 60);
                    navigate("/patient");
                } else {
                  setIsError("Invalid Credentials")
                }
            } catch (error) {
              setIsError("Something went wrong")
              console.error("Error fetching patient data:", error);
            } finally {
              setIsLoading(false)
            }
        } else {
            try {
                const data = await makeRequest("http://localhost:8000/api/doctors/login/", 'POST', payload);
                if ( data.access ) {
                    setAuthTokenWithExpiry("token", data , 1000 * 60 * 60);
                    navigate("/doctor");
                } else {
                  setIsError("Invalid Credentials")
                }
            } catch (error) {
              console.error("Error fetching patient data:", error);
              setIsError("Something went wrong")
            } finally {
              setIsLoading(false)
            }
        }
     
    } else {
      alert("Please enter both email and password");
    }
  };

  const handleRegistration = () => {
    if ( userType === 'Patient' ){
        navigate("/patient/register");
    } else{
        navigate("/doctor/register");
    }
  }

  return (
    <div className="items-center justify-center h-screen flex">
        <div className="h-[55%] border p-12 shadow-md bg-gray-100 rounded-md min-w-[400px]">
            <h2 className="text-2xl font-bold mb-4 text-blue-500">Login as a {userType}</h2>
            <p className="mb-4 text-gray-400 cursor-pointer" onClick={()=> setUserType(userType === 'Patient' ? 'Doctor' : 'Patient' )}>Or, Login as a {userType === 'Patient' ? 'Doctor' : 'Patient'}</p>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-black">User Name</label>
                <input
                    type="userName"
                    className="w-full px-3 py-2 border rounded bg-white text-gray-600"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-black">Password</label>
                <input
                    type="password"
                    className="w-full px-3 py-2 border rounded bg-white text-gray-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>

                <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                Login { isLoading && <span className="loading loading-spinner loading-sm"></span> }
                </button>
                { isError && <p className="text-red-500 text-xs">{isError}</p> }
            </form>

            <p className="mt-4 text-sm text-black">
                Don't have an account?
                <span onClick={handleRegistration} className="ml-2 text-blue-600 cursor-pointer">
                Register here
                </span>
            </p>
        </div>
    </div>
  );
};

export default LoginForm;
