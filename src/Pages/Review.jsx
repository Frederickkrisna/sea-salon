import Navbar from '../components/Navbar';
import { useState } from 'react';
import { ScaleLoader } from "react-spinners"
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
      // Simulating a delay for submission
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
    <div className="min-h-screen bg-gray-200">
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-semibold">How was your experience with our services?</h1>
        <div className="text-lg mt-2">Please provide us a review.</div>

        <div className="flex items-center mt-5">
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
                  color={tempRating >= starValue || rating >= starValue ? '#ffb900' : 'gray'}
                  size={40}
                  className="cursor-pointer transition-colors duration-200"
                />
              </button>
            );
          })}
        </div>

        {rating > 0 && (
          <div className="mt-5 w-full max-w-lg">
            <textarea
              placeholder="Your comments..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
              rows={4}
            />
            <button
              onClick={handleSubmit}
              className="mt-3 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50"
            >
              {loading ? (
                <ScaleLoader color="white" height={16} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        )}

        {submitted && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white text-2xl font-semibold">
            <div>Thank you for your review! You will be redirected shortly.</div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Review;
