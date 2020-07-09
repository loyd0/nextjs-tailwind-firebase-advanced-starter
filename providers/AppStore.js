import { useState, useEffect, useContext, createContext } from "react";
import cookies from 'js-cookie';
import { authContext } from '../utils/auth/use-auth';
import Router from 'next/router';



const AppContext = createContext();


export function ProvideAppState({ children }) {

    const AppState = useAppState();

    return <AppContext.Provider value={AppState}>{children}</AppContext.Provider>;

}

export const useAppStore = () => {
    return useContext(AppContext);
};


function useAppState() {
    const initialUser = null

    const initialSettings = { fullMenu: false }

    const [user, setUser] = useState(null);

    const [settings, setSettings] = useState(initialSettings)

    const isLoggedIn = (path = "/home") => {
        // To Do: add in function to take them to the page they were on if already on the site
        const probablyAuthenticated = cookies.get('authToken')
        if (probablyAuthenticated) {
            Router.push(path)
            return true
        }
        return false
    }

    const updateUser = (updatingUser) => {
        setUser({
            ...user,
            ...updatingUser
        })
    }

    const updateSettings = (updatingSettings) => {
        setSettings({
            ...settings,
            ...updatingSettings
        })
    }

    const removeUser = () => {
        setUser(false)
    }

    const clientSide = () => {
        return typeof window !== "undefined"
    }

    useEffect(() => {

        if (!user && initialUser?.user) {




            const data = fetch(`/api/users?uid=${initialUser.user.uid}`).then(res => res.json()).then(data => {
                // extract more here
                const { email, displayName, uid, photoUrl } = initialUser.user

                const sanitisedUser = { email, displayName, uid, photoUrl }

                return setUser({ ...sanitisedUser, ...data.user })


            })


        }
        // Cleanup subscription on unmount

        return

    }, [initialUser?.user]);



    // Return the user object and auth methods

    return {

        user,
        settings,

        updateUser,
        updateSettings,

        setUser,

        removeUser,

        isLoggedIn,

        clientSide
    };

}


