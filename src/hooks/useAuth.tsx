import { useEffect, useContext } from "react";
import { useUser, User } from "./useUser";
import { getFromSecureStore, saveOnSecureStore } from '../services/helper';
import { AuthContext } from "../context/AuthContext";


export const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        (async function anyNameFunction() {
            const user = await getFromSecureStore("user");
            if (user) {
                setUser(JSON.parse(user));
            }
        })();
    }, []);

    const login = (user: User) => {
        // console.log('user in useAuth login:', user)
        setUser(user);
    };

    const logout = () => {
        console.log('REMOVIN USER', user)
        setUser(null);
        saveOnSecureStore("user","")
    };


    return { user, login, logout };
};