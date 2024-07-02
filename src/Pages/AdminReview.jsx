import { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../FirebaseSetup';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AdminReview = () => {
  const [reviewData, setReviewData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(0);
  const { admin } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    } else {
      getReviewData();
    }
  }, []);

  const getReviewData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "datas", "review");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setReviewData(docSnap.data().review);
        setFilteredData(docSnap.data().review);
      } else {
        console.log("Data does not exist in database!");
      }
    } catch (e) {
      console.error("Error getting document:", e);
    } finally {
      setLoading(false);
    }
  };

  const filterReviews = () => {
    let filtered = reviewData;

    if (startDate) {
      filtered = filtered.filter(review => {
        const reviewDate = new Date(review.time);
        return (
          reviewDate.getFullYear() === startDate.getFullYear() &&
          reviewDate.getMonth() === startDate.getMonth() &&
          reviewDate.getDate() === startDate.getDate()
        );
      });
    }

    if (ratingFilter > 0) {
      filtered = filtered.filter(review => review.rating === ratingFilter);
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterReviews();
  }, [startDate, ratingFilter]);

  const clearDateFilter = () => {
    setStartDate(null);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar active="adminReview"/>
      <div className="flex flex-row flex-grow bg-gray-300 p-5">
        <div className="flex-grow">
          <h1 className="text-4xl font-bold text-gray-800 text-left mb-8">View Reviews</h1>
          {loading ? (
            <div className="flex justify-center items-center flex-grow">
              <div>Loading...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">No reviews available</div>
              ) : (
                filteredData.map((review, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-2">{review.name}</h2>
                    <div className="flex items-center mb-4">
                      {Array(review.rating).fill().map((_, i) => (
                        <FaStar key={i} color="#FFD700" />
                      ))}
                      {Array(5 - review.rating).fill().map((_, i) => (
                        <FaStar key={i} color="#e4e5e9" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">{review.comment}</p>
                    <p className="text-gray-500 text-sm">Time: {review.time}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <div className="w-[65vh] p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">Filter Reviews</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full px-4 py-2 border rounded-lg "
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date"
              />
              <button
                onClick={clearDateFilter}
                className="mt-2 w-[10vh] px-4 py-2 mx-[2vh] bg-gray-500 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 rounded-lg"
              >
                Clear
              </button>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Rating</label>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(parseInt(e.target.value))}
                className="w-[46vh] px-4 py-2 border rounded-lg"
              >
                <option value={0}>All Ratings</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>{rating} Stars</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReview;
