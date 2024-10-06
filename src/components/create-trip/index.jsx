import { useContext, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { run } from "@/service/AiModal";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

function CreateTrip() {
  const { openDialog, login, setOpenDialog } = useContext(AuthContext);
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && value < 0) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      (formData?.noOfDays > 8 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      //console.log("You can not select more than 8 days");
      toast("Please fill all the details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);
    const result = await run(FINAL_PROMPT);
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "Trips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-[91.25px]">
      <h2 className="font-bold text-3xl text-[#364F6B]">
        Tell us your travel preferences ✈️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our{" "}
        <span className="text-[#FCE44D]">VoyageVista</span> will generate a
        customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium text-[#364F6B]">
            Destination you want to travel?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium text-[#364F6B]">
            How many days you want to stay?
          </h2>
          <Input
            placeholder={"Ex. 3 Days"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div className="mt-10">
          <h2 className="text-xl my-3 font-medium text-[#364F6B]">
            What is Your Budget?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer bg-[#F5F5F5] hover:border-[#FC5185]
                ${
                  formData?.budget === item.title &&
                  "shadow-lg border-[#FC5185]"
                }`}
              >
                <h2 className="text-4xl text-[#364F6B]">{item.icon}</h2>
                <h2 className="font-bold text-lg text-[#364F6B]">
                  {item.title}
                </h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl my-3 font-medium text-[#364F6B]">
            Who will you be traveling with on your adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer bg-[#F5F5F5] hover:border-[#FC5185]
                ${
                  formData?.traveler === item.people &&
                  "shadow-lg border-[#FC5185]"
                }`}
              >
                <h2 className="text-4xl text-[#364F6B]">{item.icon}</h2>
                <h2 className="font-bold text-lg text-[#364F6B]">
                  {item.title}
                </h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="my-10 justify-end flex">
          <Button disabled={loading} onClick={onGenerateTrip} className="w-28">
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              " Generate Trip"
            )}
          </Button>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogDescription>
                <div className="flex items-center justify-center mb-5">
                  <img src="/logo.png" className="w-[120px]" alt="Logo" />
                </div>
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <p>
                  Sign in to VoyageVista with Google authentication securely!
                </p>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
