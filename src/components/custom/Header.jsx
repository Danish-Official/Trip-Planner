import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import "../../App.css";
import { Link } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => GetUserProfile(tokenInfo),
    onError: (error) => console.log(error),
  });

  useEffect(()=>{},[])

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile information:", error);
      });
  };

  return (
    <>
      <div className="p-3 flex justify-between items-center fixed w-full px-5 z-20 shadow-lg left-0 top-0">
        <Link to="/" className="flex items-center text-white">
          <img
            src="/logo.png"
            className="sm:w-[120px] xs:w-[100px]"
            alt="Logo"
          />
        </Link>
        <div>
          {user ? (
            <div className="flex items-center gap-3 text-white">
              <Link to={"/create-trip"} className="text-white">
                <Button>
                  + Create Trip
                </Button>
              </Link>
              <Link to={"/my-trips"} className="text-white">
                <Button>
                  My Trips
                </Button>
              </Link>

              <Popover>
                <PopoverTrigger>
                  <img
                    src={user?.picture}
                    className="h-[40px] w-[40px] rounded-full"
                    alt="User"
                  />
                </PopoverTrigger>
                <PopoverContent className="outline-none border-none">
                  <Button
                      onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button
              onClick={() => setOpenDialog(true)}
            >
              Sign In
            </Button>
          )}
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
    </>
  );
}

export default Header;
