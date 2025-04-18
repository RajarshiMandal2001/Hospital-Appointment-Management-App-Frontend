import React, { useState } from 'react'
import { handleLogout } from '../services/authToken'
import { useNavigate } from 'react-router-dom'

export const DoctorNavbar = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


    const handleLogoutBtnClick = async () => {
        try{
            setIsLoading(true);
            const logoutSuccessful = await handleLogout();
            if (logoutSuccessful) {
                navigate('/');
                alert('Logged out successfully!');
            } else {
                alert('Logout failed!');
            }
        } catch (e) {
            console.error("Error logging out:", e)
            alert('Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    };     

  return (
    <div>
        <div className="navbar bg-primary shadow-lg rounded-md">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Doctor Dashboard</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-2 gap-x-4">
                    <p>My Appointments</p>
                </ul>
            </div>
            <div className="navbar-end">
                <button type='button' className="btn bg-red-400" onClick={handleLogoutBtnClick}>
                    Log out
                    { isLoading && <span className="loading loading-spinner loading-sm"></span>}
                </button>
            </div>
        </div>
    </div>
  )
}
