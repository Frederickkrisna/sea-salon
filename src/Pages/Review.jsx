import Navbar from '../components/Navbar';
import { useState, useContext, useEffect } from 'react';
import { PulseLoader } from "react-spinners"
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { AuthContext } from '../Context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../FirebaseSetup';

const Review = () => {
  const [tempRating, setTempRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user, userData } = useContext(AuthContext);

  const navigate = useNavigate();

  const getReviewData = async () => {
    try {
      const docRef = doc(db, "datas", "review");
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

  const postReview = async () => {
    try {
      setLoading(true);
      const reviewData = await getReviewData();
      if (reviewData) {
        const currentReviews = Array.isArray(reviewData.review) ? reviewData.review : [];
        const newReview = { 
          time: new Date().toLocaleString(), 
          rating: rating, 
          comment: comment, 
          name: userData.name 
        };
        const newReviewData = {
          review: [...currentReviews, newReview]
        };
        await updateDoc(doc(db, "datas", "review"), {
          review: newReviewData.review,
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
    await postReview();
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
      <Navbar active="review"/>
      <div className="flex flex-col flex-grow bg-gray-300">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="flex flex-col items-center justify-center py-10">
          <h1 className="text-4xl font-bold text-gray-800">We'd love to hear about your experience!</h1>
          <p className="text-lg mt-2 text-gray-600">Your feedback helps us improve our services.</p>

          <div className="flex items-center mt-5 space-x-2">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <button
                  key={starValue}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setTempRating(starValue)}
                  onMouseLeave={() => setTempRating(0)}
                  className="focus:outline-none"
                >
                  <FaStar
                    color={tempRating >= starValue || rating >= starValue ? '#FFD700' : 'gray'}
                    size={50}
                    className="cursor-pointer transition-colors duration-200"
                  />
                </button>
              );
            })}
          </div>

          {rating > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="mt-8 w-full max-w-lg">
              {rating < 3 ? (
                <h2 className="text-xl mb-2 ">What disappointed you?</h2>
              ) : (
                <h2 className="text-xl mb-2 ">What did you enjoy?</h2>
              )}

              <textarea
                placeholder="Your comments..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                rows={4}
              />
              <button
                onClick={handleSubmit}
                className="mt-4 w-full px-4 py-2 bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 rounded-lg"
              >
                  Submit
              </button>
            </motion.div>
          )}

          {submitted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 text-white text-2xl font-semibold space-y-5">
              <div>Thank you for your review! You will be redirected shortly.</div>
              <PulseLoader loading={submitted} color="white" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Review;
