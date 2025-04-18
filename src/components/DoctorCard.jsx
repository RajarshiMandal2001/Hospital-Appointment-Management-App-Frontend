import React, { useState } from 'react';
import { getAuthTokenWithExpiry } from '../services/authToken';
import { makeRequest } from '../services/makeRequest';
import { DateSelectionModal } from './DateSelectionModal';

const DoctorCard = ({ doctor, onTabChange }) => {
  const userInfo = getAuthTokenWithExpiry();

  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateConfirm = async (date) => {
    const payload = {
      doctor: doctor.id,
      patient: userInfo.userId,
      date_appointment: date,
      date_booking: new Date(),
      reason: ""
    };

    try {
      setIsLoading(true);
      await makeRequest("/api/appointments/", 'POST', payload, userInfo.access);
      onTabChange('appointments');
    } catch (error) {
      console.error("Error booking appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-50 shadow-md rounded-lg p-6 max-w-[800px] mx-auto">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{doctor.user.username}</h2>
        <p className="text-gray-600">Email: <span  className='text-blue-500 font-semibold'> {doctor.user.email}</span></p>
        <p className="text-gray-600">Phone: <span  className='text-blue-500 font-semibold'> {doctor.phone}</span></p>
        <button className="btn btn-active btn-primary" onClick={() => setShowDatePicker(true)}>
        {/* <button className="btn btn-active btn-primary" onClick={handleBooking}> */}
          Book Appointment 
          { isLoading && <span className="loading loading-spinner loading-sm"></span>}
        </button>

        { showDatePicker &&
          <DateSelectionModal
            onConfirm={handleDateConfirm}
            onCancel={() => setShowDatePicker(false)}
          />
        }
      </div>

      <div className='flex flex-col items-center border rounded-md shadow-md bg-slate-100 p-4'>
        <img
            src={`https://avatar.iran.liara.run/public/${doctor.id}`}
            alt={`${doctor.name}'s photo`}
            className="w-24 h-24 object-cover rounded-full ml-0 border"
        />
        <p className="text-gray-600">Fees: <span className='text-green-500 font-semibold'>Rs. {doctor.fees || 0}</span></p>
        <p className="text-white bg-green-400 rounded-md px-2 py-1">{doctor.specialist}</p>
      </div>

    </div>
  );
};

export default DoctorCard;
