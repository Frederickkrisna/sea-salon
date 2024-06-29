import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { motion} from 'framer-motion';
import { useNavigate } from "react-router-dom"
import { ScaleLoader } from "react-spinners"
import { AuthContext } from '../Context/AuthContext';

const ReservationForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const postReservation = async () => {
    if (name === "" || phoneNumber === "" || phoneNumber === "" || serviceType === "" || dateTime === "") {
      alert("Please fill in all fields")
      return;
    }
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          navigate("/");
        }, 3000);

    } catch (e) {
      console.error("Error getting document:", e);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    await postReservation();
  }

  useEffect(() => {
    if(!user){
      alert("Please login first")
      navigate("/");
      return;
    }
  },[]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar active="reservation"/>
    <div className="bg-gray-300 flex flex-col flex-grow py-8">
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Reservation Form</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4 ">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 text-gray-800"
              />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Active Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 text-gray-800"
              />
          </div>
          <div className="mb-4">
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
              Type of Service
            </label>
            <select
              id="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 text-gray-800"
              >
              <option value="" disabled="true">Select service type</option>
              <option value="Haircuts and styling">Haircuts and styling</option>
              <option value="Manicure and pedicure">Manicure and pedicure</option>
              <option value="Facial treatments">Facial treatments</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">
              Date and Time
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 text-gray-800"
              />
          </div>
          <div 
          onClick={() => handleSubmit()}
            type="button"
            className="w-full text-center hover:cursor-pointer bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 py-2 px-4 rounded"
            >
            {loading ? (
                  <ScaleLoader color="white" height={9} />
                ) : (
                  "Submit Reservation"
                )}
          </div>
        </form>
      </motion.div>

      {submitted && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white text-2xl font-semibold">
              <div>Thank you for your reservation! You will be redirected shortly.</div>
            </div>
          )}

    </div>
    </div>
  );
};

export default ReservationForm;
