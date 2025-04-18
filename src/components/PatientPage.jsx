import React, { useEffect, useState } from "react";
import { PatientNavbar } from "./PatientNavbar";
import DoctorCard from "./DoctorCard";
import { getAuthTokenWithExpiry } from "../services/authToken";
import PatientAppointmentCard from "./PatientAppointmentCard";
import { makeRequest } from "../services/makeRequest";

function PatientPage() {
  const [search, setSearch] = useState('');
  const [doctors, setDoctors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState(null);
  const [activeTab, setActiveTab] = useState("doctors");
  const userInfo = getAuthTokenWithExpiry("token");

  const fetchAllDoctors = async () => {
    setIsLoading(true)
    try {
      const data = await makeRequest("/api/doctors/", 'GET', null, userInfo.access, { name: search }) 
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      setIsLoading(false)
    }
  };

  const fetchAllAppointments = async () => {
    setIsLoading(true)
    try {
      const data = await makeRequest(`/api/appointments/${userInfo.userId}`, 'GET', null, userInfo.access) 
      setAppointments(data)
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      setIsLoading(false)
    }
  };

  const handleDateEdit = async (id, date) => {
    const payload = {
      date_appointment: date
    }    
    setIsLoading(true)
    try {
      const data = await makeRequest(`/api/appointments/update/${id}/`, 'PATCH', payload, userInfo.access) 
    } catch (error) {
      console.error("Error updating appointment:", error);
    } finally {
      setIsLoading(false)
    }
  };

  

  useEffect(()=>{
    activeTab === 'doctors' ? fetchAllDoctors() : fetchAllAppointments();
  },[activeTab])
  

  return (
    <div className="p-5">
      <PatientNavbar onTabChange={setActiveTab} activeTab={activeTab}/>

      { activeTab === 'doctors' && 
        <div className="gap-y-2 mt-4">
          <div className="flex gap-x-2 items-center mt-2 mb-2">
            <input type="text" placeholder="Search Doctor" onChange={(e) => setSearch(e.target.value)} className="input input-primary bg-white text-black ml-[39%]" />
            <button type="button" className="btn btn-primary" onClick={fetchAllDoctors}>Search</button>
          </div>

          <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
            {doctors && doctors.map((doctor, index) => (
              <div className="mb-3" key={doctor.id}>
                <DoctorCard key={doctor.id} doctor={doctor} onTabChange={setActiveTab}/>
              </div>
            ))}
            { !doctors?.length && !isLoading &&
              <div className="mt-10 text-black ml-[45%]">No doctors found</div>
            }
            { isLoading && 
              <div className="mt-10 text-black ml-[49.8%]"><span className="loading loading-spinner loading-sm"></span></div>
            }
          </div>
        </div>
      }

      { activeTab === 'appointments' && 
      <div className="max-h-[calc(100vh-120px)] overflow-y-auto">
        <div className="gap-y-2 mt-4">
          {appointments && appointments?.map((appointment, index) => (
            <div className="mb-3" key={appointment.id}>
              <PatientAppointmentCard key={appointment.id} appointment={appointment} onDateChange={handleDateEdit} isLoading={isLoading} />
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
      }
    </div>
  );
}

export default PatientPage;
