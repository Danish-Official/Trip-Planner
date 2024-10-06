import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { createContext } from "react";
import { useEffect, useState } from "react";

export const AuthContext = createContext();

function UserAuth({children}) {
  const [user, setUser] = useState();
  
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => GetUserProfile(tokenInfo),
    onError: (error) => console.log(error),
  });

  useEffect(() => {}, []);

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
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile information:", error);
      });
  };
  return (
    <AuthContext.Provider value={{user, setUser, openDialog, login, setOpenDialog}}>
        {children}
    </AuthContext.Provider>
  );
}

export default UserAuth;
