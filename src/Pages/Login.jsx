import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FirebaseSetup";
import { BeatLoader } from "react-spinners";
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext';

const Login = () => {
  const { setUserData, setAdmin} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signIn = async () => {
    if (email === "" || password === "") {
      alert("Please fill in all required fields!");
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      const userData = await getUser();
      if (userData.role === "Admin") {
        setAdmin(true);
      }
      setUserData(userData);
      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const docRef = doc(db, "users", email);
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

  return (
    <div className='flex flex-col min-h-screen'>
      <div className="bg-gray-300 flex flex-col flex-grow py-8">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-5 mt-10 text-center text-black">Login</h1>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
              <BeatLoader loading={loading} size={25} color="white" margin={5}/>
            </div>
          )}

          <form onSubmit={signIn} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
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

            <div className="flex pt-3 pb-3">
            <div className="pr-2 text-sm">Don't have an account? </div>
            <div type="button" onClick={() => navigate("/register")} className="text-black text-sm underline hover:cursor-pointer">
              Register here
            </div>
          </div>

            <div
              onClick={() => signIn()}
              className="w-full text-center hover:cursor-pointer bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 py-2 px-4 rounded"
            >
              Login
            </div>
            <div
              onClick={() => navigate("/")}
              type="button"
              className="w-full mt-2 text-center hover:cursor-pointer border-[0.3vh] bg-white text-black hover:bg-gray-200 focus:outline focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 py-2 px-4 rounded"
            >
              Cancel
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
