import Navbar from '../components/Navbar';
import { useState } from 'react';
import { ScaleLoader } from "react-spinners"
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"

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
    setSubmitted(true);
    setLoading(false);
  }

  const handleSubmit = async () => {
    await postReview();
  }

  return (
    <div>
      <div className="flex flex-col min-h-screen">
      {submitted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 bg-black font-sans text-3xl">
          <div>Thank you for your review! You will be redirected to Home page shortly.</div>
          <ScaleLoader loading={true} color="white" margin={5} height={35} />
        </div>
      )}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
          <ScaleLoader loading={loading} color="white" margin={5} height={35} />
        </div>
      )}
      <Navbar />
      <div className="bg-gray-200 flex flex-grow flex-col w-screen bg-cover pt-[8vh] text-black font-sans p-[10vh]">
        <div className="mt-[10vh] text-[6vh] font-semibold">How was your experience with our services?</div>  
        <div className="text-[3vh]">Provide us a review</div>

        <div className="flex mt-[5vh]">
          <button onClick={() => setRating(1)} onMouseEnter={() => setTempRating(1)} onMouseLeave={() => setTempRating(0)} className="hover:bg-transparent pr-[1vh]"><FaStar color={`${tempRating > 0 || rating > 0 ? '#ffb900' : 'gray'}`} size={'8vh'}/></button>
          <button onClick={() => setRating(2)} onMouseEnter={() => setTempRating(2)} onMouseLeave={() => setTempRating(0)} className="hover:bg-transparent pr-[1vh]"><FaStar color={`${tempRating > 1 || rating > 1 ? '#ffb900' : 'gray'}`} size={'8vh'}/></button>
          <button onClick={() => setRating(3)} onMouseEnter={() => setTempRating(3)} onMouseLeave={() => setTempRating(0)} className="hover:bg-transparent pr-[1vh]"><FaStar color={`${tempRating > 2 || rating > 2 ? '#ffb900' : 'gray'}`} size={'8vh'}/></button>
          <button onClick={() => setRating(4)} onMouseEnter={() => setTempRating(4)} onMouseLeave={() => setTempRating(0)} className="hover:bg-transparent pr-[1vh]"><FaStar color={`${tempRating > 3 || rating > 3 ? '#ffb900' : 'gray'}`} size={'8vh'}/></button>
          <button onClick={() => setRating(5)} onMouseEnter={() => setTempRating(5)} onMouseLeave={() => setTempRating(0)} className="hover:bg-transparent pr-[1vh]"><FaStar color={`${tempRating > 4 || rating > 4 ? '#ffb900' : 'gray'}`} size={'8vh'}/></button>
        </div>

        {rating > 0 && (
          <div className="w-full">
            <textarea name="" id="" placeholder="Comments" className="bg-transparent border border-5 border-gray-500 rounded-[1vh] p-[0.75vh] mt-[5vh] text-[2vh] w-full" value={comment} onChange={(e) => setComment(e.target.value)}/>
            <button onClick={() => handleSubmit()} className="bg-black w-fit px-[4vh] py-[1vh] rounded-[1vh] mt-[4vh] text-white hover:bg-gray-500 text-[1.5vh]">Submit</button>
          </div>
        )}
        
      </div>
    </div>
    </div>
  )
}

export default Review