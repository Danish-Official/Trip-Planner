import HotelCardItem from "./hotel-card-item";

function Hotel({ trip }) {

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {trip?.tripData?.hotels?.map((item, index) => (
          <HotelCardItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotel;
