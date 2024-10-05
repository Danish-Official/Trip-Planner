import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { db } from '@/service/firebaseConfig';
import InfoSection from './components/info-section';
import Hotel from './components/hotel';
import PlacesToVisit from './components/places-to-visit';

function ViewTrip() {
    const {tripId} = useParams();
    const [trip,setTrip] = useState();

    useEffect(()=>{
        tripId&&GetTripData(); 
    },[tripId]);

    const GetTripData = async ()=>{
        const docRef=doc(db,'Trips',tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            setTrip(docSnap.data());
        }else{
            toast('No Trip Found');
        }
    }
  return (
    trip&&<div className='p-10 md:px-20 lg:px-44 xl:px-56 mt-[91.25px]'>
        <InfoSection trip={trip} />
        <Hotel trip={trip} />
        <PlacesToVisit trip={trip}/>
    </div>
  )
}

export default ViewTrip
