import { getAuthUser } from "@/services/user.service";
import { getData, storeData } from "@/utils/helper";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [token, setToken] = useState(null);
  const [user,  setUser]  = useState(null);
  
  const handleRemoveToken = () =>{
    setToken(null);
    storeData("jwt", null);
  };

  const handleSetUser = async (user) => {
    const token = await getData("jwt");
    setToken(token);
    setUser(user);
  }

  const updateUser = async () => {
    const user = await getAuthUser();
    setUser(user);
  }

  const handleRemoveUser = () => {
    setUser(null);
    handleRemoveToken()
  }

 
	return (
		<AuthContext.Provider value={{ token, user, handleRemoveToken, handleSetUser, handleRemoveUser, updateUser}}>
			{children}
		</AuthContext.Provider>
	);
}
