export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole travels in exploration",
    icon: "🧳",
    people: "1",
  },
  {
    id: 2,
    title: "Friends",
    desc: "A group of friends travels together",
    icon: "🥂",
    people: "2-10",
  },
  {
    id: 3,
    title: "Family",
    desc: "A family travels together",
    icon: "👪",
    people: "2-6",
  },
  {
    id: 4,
    title: "Couples",
    desc: "A couple travels together",
    icon: "❤",
    people: "2",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Budget friendly option",
    icon: "🛺",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "A balanced budget option",
    icon: "🚕",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "A high end budget option",
    icon: "🚗",
  },
];

export const AI_PROMPT =
  "Generate a travel plan for the location: {location}, for {totalDays} days, for {traveler} traveler(s) with a budget of {budget}. Please provide a list of hotels, it should be an array of objects and the objects fields should be name, address, description, price (guess the price by comparing nearby hotels if not available and also add local currency symbol infront of value), rating. Additionally, suggest an itinerary list with details for each place, it should be an array of objects and the object fields should be day, places which is an array of objects with fields best_time_to_visit, description, image_url, name, ticket_pricing, travel_time and it should be organized into a day-by-day plan for the {totalDays} days, all in JSON format.";
