import { AuthContext } from '../Context/AuthContext';
import { useState, useEffect} from 'react';
import { auth } from '../FirebaseSetup';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
      name: "Not Logged In",
      email:"null@mail.com",
      phone: "000000000",
      role: "Customer",
      uid: "000000000000000000000000"
    });

    const getUser = async (email) => {
      try {
        setLoading(true);
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("Data does not exist in database!");
          return null;
        }
      } catch (e) {
        console.error("Error getting document:", e);
        return null;
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        if (firebaseUser) {
          getUser(firebaseUser.email);
        }
        else {
          setUserData(
            {
              name: "Not Signed In",
              email:"null@mail.com",
              phone: "000000000",
              role: "Customer",
              uid: "000000000000000000000000"
            }
          );
        }
        console.log(firebaseUser);
      });
      return unsubscribe;
    }, []);
      
      return <AuthContext.Provider value={{ userData, user, setUserData }}>{children}</AuthContext.Provider>;
    };