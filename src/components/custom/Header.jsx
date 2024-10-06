import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import "../../App.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

function Header() {
  const { user, setUser, openDialog, login, setOpenDialog } =
    useContext(AuthContext);

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
                <Button>+ Create Trip</Button>
              </Link>
              <Link to={"/my-trips"} className="text-white">
                <Button>My Trips</Button>
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
                      setUser();
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
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
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
