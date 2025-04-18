import React, { useState } from 'react'
import { handleLogout } from '../services/authToken'
import { useNavigate } from 'react-router-dom'

export const PatientNavbar = ({ onTabChange, activeTab }) => {
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
                <a className="btn btn-ghost text-xl">Patient Dashboard</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-2 gap-x-4">
                <button onClick={() => onTabChange("doctors")}> <span className={activeTab === 'doctors' ? 'font-bold' : ''}>Doctors</span> </button>
                <button onClick={() => onTabChange("appointments")}><span className={activeTab === 'appointments' ? 'font-bold' : ''}>My Appointments</span></button>
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
