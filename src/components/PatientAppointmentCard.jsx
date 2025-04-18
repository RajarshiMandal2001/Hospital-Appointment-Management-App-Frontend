import React, { useState } from 'react';

const PatientAppointmentCard = ({appointment, onDateChange, isLoading}) => {

    const [editedDate, setEditedDate] = useState(
        new Date(appointment.date_appointment).toISOString().slice(0, 16)
      );
    
      const handleDateSubmit = () => {
        if (editedDate) {
          onDateChange(appointment.id, new Date(editedDate));
        }
      };

  return (
    <div className="flex items-center justify-between bg-gray-50 shadow-md rounded-lg p-0 max-w-[800px] mx-auto">
        <div className="card card-side bg-gray-50 shadow-sm w-full max-h-[200px] text-black">
            <figure>
                <img
                src={`https://avatar.iran.liara.run/public/${appointment.doctor.id}`}
                alt="Movie"
                className="w-24 h-24 object-cover rounded-full ml-6 border"
                 />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Meet <span className='text-blue-500'>{appointment.doctor.user.username}</span> on 
                    {editedDate && 
                    <div className='flex gap-x-2'>
                        <input
                        type="datetime-local"
                        value={editedDate}
                        onChange={(e) => setEditedDate(e.target.value)}
                        className="input input-bordered input-sm text-red-400 border bg-gray-300 border-gray-500"
                        />
                        <button
                            onClick={handleDateSubmit}
                            className="btn btn-primary btn-sm"
                        >
                            Edit
                            {/* { isLoading && <span className="loading loading-spinner loading-sm"></span>} */}
                        </button>
                    </div>
                }
                </h2>
                <p className='text-blue-600'>{appointment.doctor.user.email}</p>
                <p className='text-blue-600'>{appointment.doctor.phone}</p>
                <p className='bg-green-400 px-2 rounded-md w-fit'>{appointment.doctor.specialist}</p>
            </div>
        </div>
    </div>
  );
};

export default PatientAppointmentCard;
