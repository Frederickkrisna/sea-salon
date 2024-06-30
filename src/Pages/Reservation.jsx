import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { motion} from 'framer-motion';
import { useNavigate } from "react-router-dom"
import { PulseLoader } from "react-spinners"
import { AuthContext } from '../Context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../FirebaseSetup';

const ReservationForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [reservationTime, setreservationTime] = useState('');
  const [reservationDate, setreservationDate] = useState('');
  const [branch, setBranch] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const getReservationData = async () => {
    try {
      const docRef = doc(db, "datas", "reservation");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("Data does not exist in database!");
        return null;
      }
    } catch (e) {
      console.error("Error getting document:", e);
      return null;
    }
  };

  const postReservation = async () => {
    try {
      setLoading(true);
      const reservationData = await getReservationData();
      if (reservationData) {
        const currentReservation = Array.isArray(reservationData.reservation) ? reservationData.reservation : [];
        const newReservation = { 
          time: new Date().toLocaleString(),
          reservationTime: reservationTime,
          reservationDate: reservationDate,
          serviceType: serviceType,
          branch: branch,
          phoneNumber: phoneNumber,
          name: name 
        };
        const newReservationData = {
          reservation: [...currentReservation, newReservation]
        };
        await updateDoc(doc(db, "datas", "reservation"), {
          reservation: newReservationData.reservation,
        });
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          navigate("/");
        }, 3000);
      } else {
        console.log("Data does not exist in database!");
      }
    } catch (e) {
      console.error("Error getting document:", e);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    if (name === "" || phoneNumber === "" || branch === "" | serviceType === "" | reservationDate === "" || reservationTime === "") {

      alert("Please fill in all fields!");
      return;
    }
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
    <div className="bg-gray-300 flex flex-col flex-grow py-5">
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-3 text-center text-black">Reservation Form</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-3">
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
          <div className="mb-3">
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
          <div className="mb-3">
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
              Branch Location
            </label>
            <select
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 text-gray-800"
              >
              <option value="" disabled="true">Select branch location</option>
              <option value="Deket rumah fred">Deket rumah fred</option>
              <option value="Disitu">Disitu</option>
              <option value="Disana">Disana</option>
            </select>
          </div>
          <div className="mb-3">
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
          <div className="mb-3">
            <label htmlFor="reservationDate" className="block text-sm font-medium text-gray-700">
              Reservation Date
            </label>
            <input
              type="date"
              id="reservationDate"
              value={reservationDate}
              onChange={(e) => setreservationDate(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 text-gray-800"
              />
          </div>
          <div className="mb-3">
            <label htmlFor="reservationTime" className="block text-sm font-medium text-gray-700">
              Reservation Time
            </label>
            <input
              type="time"
              id="reservationTime"
              value={reservationTime}
              onChange={(e) => setreservationTime(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 text-gray-800"
              />
          </div>
          <div 
          onClick={() => handleSubmit()}
            type="button"
            className="w-full text-center hover:cursor-pointer bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 py-2 px-4 rounded"
            >
              Submit Reservation
          </div>
        </form>
      </motion.div>

      {submitted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 text-white text-2xl font-semibold space-y-5">
              <div>Thank you for your reservation! You will be redirected shortly.</div>
              <PulseLoader loading={submitted} color="white" />
            </div>
      )}

    </div>
    </div>
  );
};

export default ReservationForm;
