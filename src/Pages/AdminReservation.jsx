import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../FirebaseSetup';
import Navbar from '../components/Navbar';

const AdminReservation = () => {
    const { admin } = useContext(AuthContext);
    const [reservationData, setReservationData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!admin) {
        navigate("/login");
      }
      else {
        getReservationData();
      }
    }, []);
  
    const getReservationData = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "datas", "reservation");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setReservationData(docSnap.data().reservation);
        } else {
          console.log("Data does not exist in database!");
        }
      } catch (e) {
        console.error("Error getting document:", e);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar active="adminReservation"/>
      <div className="flex-grow bg-gray-300 p-5">
        <h1 className="text-4xl font-bold text-gray-800 text-left mb-8">View Reservations</h1>
        {loading ? (
          <div className="flex justify-center items-center flex-grow">
            <div>Loading...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Branch</th>
                  <th className="px-4 py-2 border">Service Type</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Time</th>
                </tr>
              </thead>
              <tbody>
                {reservationData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">No reservations available</td>
                  </tr>
                ) : (
                  reservationData.map((reservation, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">{reservation.name}</td>
                      <td className="px-4 py-2 border">{reservation.phoneNumber}</td>
                      <td className="px-4 py-2 border">{reservation.branch}</td>
                      <td className="px-4 py-2 border">{reservation.serviceType}</td>
                      <td className="px-4 py-2 border">{reservation.reservationDate}</td>
                      <td className="px-4 py-2 border">{reservation.reservationTime}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminReservation