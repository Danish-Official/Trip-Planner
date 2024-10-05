import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/globalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.name,
    };
    await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[1].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };
  useEffect(() => {
    GetPlacePhoto();
  }, [place]);
  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.name}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex flex-wrap gap-5 hover:scale-95 transition-all hover:shadow-md cursor-pointer bg-[#fefcfc]">
        <img
          src={photoUrl}
          alt={place?.name}
          className="rounded-xl w-full h-[200px] max-h-64 object-cover"
        />

        <div>
          <h2 className="font-bold text-lg text-[#364F6B]">{place?.name}</h2>
          <p className="text-sm text-[#51a8ad]">{place?.description}</p>
          <h2 className="mt-2 text-md text-[#120b0d]">
            🕖 {place?.travel_time}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
