import React, { useState, useEffect, useContext, createContext } from "react";
import cookie from 'js-cookie';

import "firebase/auth";
import firebase from '../initFirebase';
import Router from 'next/router';



export const authContext = createContext();



// Provider component that wraps your app and makes auth object ...

// ... available to any child component that calls useAuth().

export function ProvideAuth({ children }) {

    const auth = useProvideAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;

}



// Hook for child components to get the auth object ...

// ... and re-render when it changes.

export const useAuth = () => {

    return useContext(authContext);

};



// Provider hook that creates auth object and handles state

function useProvideAuth() {

    const [user, setUser] = useState(null);



    // Wrap any Firebase methods we want to use making sure ...

    // ... to save the user to state.

    const signin = (email, password) => {

        return firebase

            .auth()

            .signInWithEmailAndPassword(email, password)

            .then(response => {
                
                setUser(response.user);
                return response.user;

            });

    };


    const signup = (email, password) => {

        return firebase

            .auth()

            .createUserWithEmailAndPassword(email, password)

            .then(response => {

                setUser(response.user);

                return response.user;

            });

    };



    const signOut = () => {

        return firebase

            .auth()

            .signOut()

            .then(() => {
                setUser(false);
                Router.push("/")
            });

    };



    const sendPasswordResetEmail = email => {

        return firebase

            .auth()

            .sendPasswordResetEmail(email)

            .then(() => {

                return true;

            });

    };



    const confirmPasswordReset = (code, password) => {

        return firebase

            .auth()

            .confirmPasswordReset(code, password)

            .then(() => {

                return true;

            });

    };

  


    // Subscribe to user on mount

    // Because this sets state in the callback it will cause any ...

    // ... component that utilizes this hook to re-render with the ...

    // ... latest auth object.

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async user => {

            if (user) {
                console.log('calling user')
                const token = await user.getIdToken();
                // Check setting of token and how long it needs to be
                cookie.set("authToken", token, { expires: 1, sameSite: 'lax' });
                setUser(user);
            } else {
                cookie.remove("authToken");
                setUser(false);
            }

        });



        // Cleanup subscription on unmount

        return () => unsubscribe();

    }, []);



    // Return the user object and auth methods

    return {

        user,

        signin,

        signup,

        signOut,

        setUser,

        sendPasswordResetEmail,

        confirmPasswordReset

    };

}