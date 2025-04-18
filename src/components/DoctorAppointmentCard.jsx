import React, { useState } from 'react';
import { getAuthTokenWithExpiry } from '../services/authToken';
import { makeRequest } from '../services/makeRequest';

const DoctorAppointmentCard = ({appointment, onDelete}) => {
    const userInfo = getAuthTokenWithExpiry();
    
    const [isLoading, setIsLoading] = useState(false);

    const handleCancelAppointment = async () => {
    try {
        setIsLoading(true);
        await makeRequest(`/api/appointments/delete/${appointment.id}/`, 'DELETE', null, userInfo.access);
        onDelete(appointment.id) 
    } catch (error) {
        console.error("Error deleting appointment:", error);
    } finally {
        setIsLoading(false)
    }
  };
    

  return (
    <div className="flex items-center justify-between bg-gray-50 shadow-md rounded-lg p-0 max-w-[800px] mx-auto">
        <div className="card card-side bg-gray-50 shadow-sm w-full max-h-[200px] text-black">
            <figure>
                <img
                src={`https://avatar.iran.liara.run/public/${appointment.patient.id}`}
                alt="Movie"
                className="w-24 h-24 object-cover rounded-full ml-6 border"
                 />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Meet <span className='text-blue-500'>{appointment.patient.user.username}</span> on 
                    <span className='text-red-400'>{new Date(appointment.date_appointment).toLocaleString()}</span></h2>
                <p> Email: <span className='text-blue-600'>{appointment.patient.user.email}</span> </p>
                <p> Phone: <span className='text-blue-600'>{appointment.patient.phone}</span> </p>
                <p> Gender: <span className='text-blue-600'>{appointment.patient.gender}</span> </p>
                <button className="btn btn-active btn-error text-white w-fit ml-auto" onClick={handleCancelAppointment}>
                    Cancel Appointment 
                    { isLoading && <span className="loading loading-spinner loading-sm"></span>}
                </button>
            </div>
        </div>
    </div>
  );
};

export default DoctorAppointmentCard;
