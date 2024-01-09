import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getFromSecureStore, saveOnSecureStore } from '../../services/helper';

// NOTE: optimally move this into a separate file
export interface User {
  id: string;
  name: string;
  email: string;
  authToken?: string;
  temporalToken?: string,
}

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
//   const { setItem } = useLocalStorage();

  const addUser = async (user: User) => {
    setUser(user);
    await saveOnSecureStore("user", JSON.stringify(user));
  };

  const removeUser = () => {
    console.log('REMOVIN USER', user)
    setUser(null);
    saveOnSecureStore("user","")
};

  return { user, addUser, removeUser };
};