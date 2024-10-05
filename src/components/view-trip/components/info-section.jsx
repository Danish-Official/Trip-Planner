import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/globalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    GetPlacePhoto();
  }, [trip]);
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };
  return (
    <div className="bg-[#fcf6f6] p-6 rounded-xl shadow-md">
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          trip?.userSelection.location.label
        }
        target="_blank"
      >
        <img
          src={photoUrl}
          className="h-[250px] md:h-[350px] lg:h-[450px] w-full object-cover rounded-xl mb-5"
        />
      </Link>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="my-5 flex flex-col gap-2 text-center md:text-left">
          <h2 className="font-bold text-xl md:text-2xl text-[#364F6B]">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-5">
            <h2 className="p-1 px-3 bg-[#3FC1C9] rounded-full text-white text-xs md:text-lg">
              📅 {trip.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-[#FC5185] rounded-full text-white text-xs md:text-lg">
              💰 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-[#3FC1C9] rounded-full text-white text-xs md:text-lg">
              🏖️ No. Of Traveller: {trip.userSelection?.traveler}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
