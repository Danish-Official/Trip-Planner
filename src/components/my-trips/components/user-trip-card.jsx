import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/globalApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[2].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="relative hover:scale-95 transition-all bg-[#F5F5F5] p-4 rounded-xl shadow-lg">
        <img
          src={photoUrl ? photoUrl : '/info.jpg'}
          className="object-cover rounded-xl w-full h-[200px] sm:h-[250px] mb-4"
          alt="Trip"
        />

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#364F6B]">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-xs sm:text-sm text-[#3FC1C9]">
            {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;