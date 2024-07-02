import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../FirebaseSetup';
import Navbar from '../components/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AdminReservation = () => {
  const { admin } = useContext(AuthContext);
  const [reservationData, setReservationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [branchFilter, setBranchFilter] = useState('');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    } else {
      getReservationData();
    }
  }, []);

  const getReservationData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "datas", "reservation");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data().reservation;
        setReservationData(data);
        setFilteredData(data);
      } else {
        console.log("Data does not exist in database!");
      }
    } catch (e) {
      console.error("Error getting document:", e);
    } finally {
      setLoading(false);
    }
  };

  const filterReservations = () => {
    let filtered = reservationData;

    if (branchFilter) {
      filtered = filtered.filter(reservation => reservation.branch === branchFilter);
    }

    if (serviceTypeFilter) {
      filtered = filtered.filter(reservation => reservation.serviceType === serviceTypeFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter(reservation => {
        const reservationDate = new Date(reservation.reservationDate);
        return reservationDate.toDateString() === dateFilter.toDateString();
      });
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterReservations();
  }, [branchFilter, serviceTypeFilter, dateFilter]);

  const clearFilters = () => {
    setBranchFilter('');
    setServiceTypeFilter('');
    setDateFilter(null);
    setFilteredData(reservationData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar active="adminReservation"/>
      <div className="flex-grow bg-gray-300 p-5">
        <h1 className="text-4xl font-bold text-gray-800 text-left mb-8">View Reservations</h1>
        <div className="mb-8">
          <div className="flex space-x-4">
            <div className="flex flex-col">
              <label className="block text-gray-700 mb-2">Branch</label>
              <select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">All Branches</option>
                <option value="Deket rumah fred">Deket rumah fred</option>
                <option value="Disitu">Disitu</option>
                <option value="Disana">Disana</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 mb-2">Service Type</label>
              <select
                value={serviceTypeFilter}
                onChange={(e) => setServiceTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">All Service Types</option>
                <option value="Haircuts and styling">Haircuts and styling</option>
                <option value="Manicure and pedicure">Manicure and pedicure</option>
                <option value="Facial treatment">Facial treatment</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 mb-2">Date</label>
              <DatePicker
                selected={dateFilter}
                onChange={(date) => setDateFilter(date)}
                className="w-full px-4 py-2 border rounded-lg"
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-500 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
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
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">No reservations available</td>
                  </tr>
                ) : (
                  filteredData.map((reservation, index) => (
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

export default AdminReservation;
