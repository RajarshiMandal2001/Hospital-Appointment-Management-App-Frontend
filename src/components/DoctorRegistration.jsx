import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../services/makeRequest";


const DoctorRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    fees: "",
    specialist: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setIsLoading(true)
      const response = await makeRequest("http://localhost:8000/api/doctors/register/",'POST', formData);
      setMessage("Doctor registered successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("Registration failed.");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="items-center justify-center h-screen flex">
        <div className=" border p-12 shadow-md bg-gray-100 rounded-md w-[600px] max-h-[calc(100vh-120px)] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-blue-500">Doctor Registration</h2>

            <form onSubmit={handleSubmit} className="space-y-2">
                <label className="block text-sm font-medium text-black">Name</label>
                <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-2 border rounded text-gray-400 bg-white"
                value={formData.name}
                onChange={handleChange}
                required
                />

                <label className="block text-sm font-medium text-black">User Name</label>
                <input
                type="text"
                name="username"
                placeholder="User Name"
                className="w-full p-2 border rounded text-gray-400 bg-white"
                value={formData.username}
                onChange={handleChange}
                required
                />

                <label className="block text-sm font-medium text-black mt-4">Email</label>
                <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded text-gray-400 bg-white"
                value={formData.email}
                onChange={handleChange}
                required
                />

                <label className="block text-sm font-medium text-black mt-2">Phone No.</label>
                <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="w-full p-2 border rounded text-gray-400 bg-white"
                value={formData.phone}
                onChange={handleChange}
                required
                />

                <label className="block text-sm font-medium text-black mt-2">Consultation Fees</label>
                <input
                type="number"
                name="fees"
                placeholder="eg: 1500"
                className="w-full p-2 border rounded text-gray-400 bg-white"
                value={formData.fees}
                onChange={handleChange}
                required
                />

                <label className="block text-sm font-medium text-black mt-2">Specialization in</label>
                <select
                  name="specialist"
                  className="w-full p-2 border rounded text-gray-700 bg-white"
                  value={formData.specialist}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select specialization
                  </option>
                  <option value="T1">T1</option>
                  <option value="T2">T2</option>
                  <option value="T3">T3</option>
                </select>

                <label className="block text-sm font-medium text-black">Password</label>
                <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border rounded text-gray-400 bg-white"
                value={formData.password}
                onChange={handleChange}
                required
                />

                <div className=" flex mt-5 justify-between items-center pt-4">
                    <button
                    type="submit"
                    className="w-[20%] bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                    Register { isLoading && <span className="loading loading-spinner loading-sm"></span> }
                    </button>
                    <button
                    type="button"
                    onClick={()=> navigate('/')}
                    className="w-[20%] btn btn-outline btn-secondary"
                    >
                    Go Back
                    </button>
                </div>
            </form>

            {message && <p className="mt-4 text-center text-sm">{message}</p>}
        </div>
    </div>
  );
};

export default DoctorRegistration;
