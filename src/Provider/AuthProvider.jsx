import { AuthContext } from '../Context/AuthContext';
import { useState, useEffect} from 'react';
import { auth } from '../FirebaseSetup';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({
      name: "Not Logged In",
      email:"null@mail.com",
      phone: "000000000",
      role: "Customer",
      uid: "000000000000000000000000"
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(firebaseUser);
        });
    
        return unsubscribe;
      }, []);
      
      return <AuthContext.Provider value={{ userData, user, setUserData }}>{children}</AuthContext.Provider>;
    };