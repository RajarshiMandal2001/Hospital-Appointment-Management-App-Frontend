import React, { useEffect, useState } from "react";
import { getAuthTokenWithExpiry } from "../services/authToken";
import PatientAppointmentCard from "./PatientAppointmentCard";
import { makeRequest } from "../services/makeRequest";
import { DoctorNavbar } from "./DoctorNavbar";
import DoctorAppointmentCard from "./DoctorAppointmentCard";

function DoctorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState(null);
  const userInfo = getAuthTokenWithExpiry("token");

  const fetchAllAppointments = async () => {
    setIsLoading(true)
    try {
      const data = await makeRequest(`http://localhost:8000/api/appointments/doctor/${userInfo.userId}/`, 'GET', null, userInfo.access) 
      setAppointments(data)
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      setIsLoading(false)
    }
  };

  const handleDelete = (deletedId) => {
    setAppointments(prev => prev.filter(app => app.id !== deletedId));
  };

  useEffect(() => {
    fetchAllAppointments();
  }, []);
  

  return (
    <div className="p-5">
      <DoctorNavbar />

      <div className="gap-y-2 mt-4  max-h-[calc(100vh-120px)] overflow-y-auto">
        {appointments && appointments.map((appointment, index) => (
          <div className="mb-3" key={appointment.id}>
            <DoctorAppointmentCard key={appointment.id} appointment={appointment} onDelete={handleDelete} />
          </div>
        ))}
        { !appointments?.length && !isLoading &&
          <div className="mt-10 text-black ml-[45%]">No Appointments found</div>
        }
        { isLoading && 
          <div className="mt-10 text-black ml-[49.8%]"><span className="loading loading-spinner loading-sm"></span></div>
        }
      </div>
    </div>
  );
}

export default DoctorPage;
