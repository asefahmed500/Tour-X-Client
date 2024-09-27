import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
export const AuthContext = createContext();
const auth = getAuth(app)
const AuthProviders = ({ children }) => {
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(true);
    const googleprovider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const googlesignin = () => {
        setloading(true);
        return signInWithPopup(auth, googleprovider)
    }


    const createuser = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signinuser = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateuserprofile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, PhotoUrl: photo
        })
    }

    const logout = () => {
        setloading(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
           
            setuser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt' , userInfo)
                .then(res => {
                    if(res.data.token) {
                        localStorage.setItem('access-token', res.data.token)
                        setloading(false)

                    }
                })


            }
            else{
                localStorage.removeItem('access-token');
                setloading(false)
            }
            console.log("curentuser", currentUser);


        });
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])




    const authinfo = {
        user,
        loading,
        googlesignin,
        createuser,
        signinuser,
        updateuserprofile,
        logout

    }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProviders;