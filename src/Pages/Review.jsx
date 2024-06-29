import Navbar from '../components/Navbar';
import { useState } from 'react';
import { ScaleLoader } from "react-spinners"
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const Review = () => {
  const [tempRating, setTempRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const navigate = useNavigate();
  
  const postReview = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        navigate("/");
      }, 3000);
    } catch (e) {
      console.error("Error posting review:", e);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    await postReview();
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className="min-h-screen bg-gray-300">
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
                {loading ? (
                  <ScaleLoader color="white" height={16} />
                ) : (
                  "Submit"
                )}
              </button>
            </motion.div>
          )}

          {submitted && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white text-2xl font-semibold">
              <div>Thank you for your review! You will be redirected shortly.</div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Review;
