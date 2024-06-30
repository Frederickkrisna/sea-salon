import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { auth } from "../FirebaseSetup";

const Navbar = (props) => {
    const { userData, setUserData, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = (route) => {
        navigate(route);
      }
    
    const signOut = async () => {
        await auth.signOut();
        setUserData({
          name: "Not Signed In",
          email:"null@mail.com",
          phone: "000000000",
          role: "Customer",
          uid: "000000000000000000000000"
        });
        navigate("/");
      }

    return (
      <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
          <div className="container px-4 mx-auto relative text-sm">
              <div className="flex justify-between items-center ">
                  <div className="flex items-center flex-shrink-0 w-[15vh]">
                      <button className="tracking-tight" onClick={() => handleClick("/")}>SEA Salon</button>
                  </div>
                  <div className="flex flex-grow justify-center">
                  <ul className="hidden lg:flex ml-14 space-x-5">
                      <li>
                          <button className={`rounded-full py-[0.75vh] px-[2.5vh] hover:bg-gray-200 ${props.active === 'home' && 'font-bold'}`} onClick={() => handleClick("/")}>Home</button>
                      </li>
                      <li>
                          <button className={`rounded-full py-[0.75vh] px-[2.5vh] hover:bg-gray-200 ${props.active === 'review' && 'font-bold'}`} onClick={() => handleClick("/review")}>Review</button>
                      </li>
                      <li>
                          <button className={`rounded-full py-[0.75vh] px-[2.5vh] hover:bg-gray-200 ${props.active === 'reservation' && 'font-bold'}`} onClick={() => handleClick("/reservation")}>Reservation</button>
                      </li>
                  </ul>
                  </div>

                {!user ? (
                <div className="flex flex-row items-center flex-shrink-0 w-[15vh] justify-end">
                    <div className="hover:cursor-pointer hover:bg-gray-100 tracking-tight border-[0.4vh] px-3 py-2 rounded-md border-black text-black" onClick={() => handleClick("/login")}>Login</div>
                </div>
                ) :
                (
                    <div className="flex items-center flex-shrink-0 w-[15vh] justify-end">
                      <h2 className="whitespace-nowrap mr-[3vh]">{userData.name} - {userData.role}</h2>
                    <div className="hover:cursor-pointer hover:bg-red-100 tracking-tight border-[0.4vh] px-3 py-2 rounded-md  border-red-600 text-red-600" onClick={() => signOut()}>Logout</div>
                </div>
                )}

              </div>
          </div>
      </nav>
    )
  }
  
  export default Navbar