import { createContext, useState } from "react";

const authService = {
    login: (userData)=>{
        localStorage.setItem('user', JSON.stringify({
            accessToken: userData.accessToken
        }))
    },
    logout: ()=>{
        localStorage.removeItem('user')
    },
    currentUser: ()=>{
        return JSON.parse(localStorage.getItem('user'))
    }
}

export const AuthContext = createContext(authService);

export const AuthContainer = ({children})=>{
    return(
        <AuthContext.Provider value={authService}>
            {children}
        </AuthContext.Provider>
    );
}