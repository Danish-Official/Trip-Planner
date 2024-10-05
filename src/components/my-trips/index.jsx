import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCard from "./components/user-trip-card";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }
    const q = query(
      collection(db, "Trips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      setUserTrips((preVal) => [...preVal, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-[100px] w-full min-h-[96vh] mb-5">
    <h2 className="font-bold text-3xl">My Trips</h2>
    {userTrips.length > 0 ? (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {userTrips.map((trip) => (
          <UserTripCard trip={trip} key={trip.id}/>
        ))}
      </div>
    ) : (
      <h1>No trips ☹️</h1>
    )}
  </div>
  );
}

export default MyTrips;
