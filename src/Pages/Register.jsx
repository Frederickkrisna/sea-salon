import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../FirebaseSetup"
import { doc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid';
import { BeatLoader } from "react-spinners";

const Register = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
  
    const storeUserData = async () => {
      try {
        await setDoc(doc(db, "users", email),{
          uid: uuidv4(),
          name: name,
          email: email,
          phone: phoneNumber,
          password: password,
          role: "Customer"
        });
      }
      catch (error) {
        console.log(error);
      }
    }
  
    const handleSubmit = async () => {
        navigate("/");
      if (name === "" || phoneNumber === "" || password === "" || confirmPassword === "" || email === "") {
        alert("Please fill in all fields!");
        return;
      }
      if (password !== confirmPassword) {
        alert("Password and confirm password do not match!");
        return;
      }
      try {
        setLoading(true);
        await createUserWithEmailAndPassword(auth,
          email,
          password
        );
        await storeUserData();
        navigate("/");
  
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }  
      
    }

  return (
    <div className='flex flex-col min-h-screen'>
      <div className="bg-gray-300 min-h-screen py-8">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-black">Register</h1>

          {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
            <BeatLoader loading={loading} size={25} color="white" margin={5}/>
          </div>
        )}

          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 text-gray-800"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 text-gray-800"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 text-gray-800"
              />
            </div>
            <button
              onClick={() => handleSubmit()} 
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 py-2 px-4 rounded"
            >
              Register
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
