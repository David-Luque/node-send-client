import authContext from "./authContext";
import React, { useReducer } from "react";
import authReducer from "./authReducer";
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    HIDE_ALERT,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    AUTH_USER,
    SIGN_OUT
} from '../../types';
import axiosClient from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";


const AuthState = ({ children }) => {

    //defining initial state
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('NS_token') : '',
        authenticated: null,
        user: null,
        message: null
    };

    //defining reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState)

    //signup new users
    const signUser = async data => {
        try {
            const response = await axiosClient.post('/api/users', data);
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: response.data.msg
            });
        } catch (error) {
            dispatch({
                type: SIGNUP_FAILURE,
                payload: error.response.data.msg
            });
        }
        //clean alert after 3 seconds
        setTimeout(()=>{
            dispatch({
                type: HIDE_ALERT
            });
        }, 3000);
    };

    //authenticate user
    const authUser = async data => {
        try {
            const response = await axiosClient.post('/api/auth', data);
            dispatch({
                type: AUTH_SUCCESS,
                payload: response.data.token
            });

        } catch (error) {
            dispatch({
                type: AUTH_FAILURE,
                payload: error.response.data.msg
            });
        }
        //clean alert
        setTimeout(()=>{
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);
    };

    //return auth user depending of token
    const authUserLocal = async () => {
        const token = localStorage.getItem('NS_token');
        if(token) tokenAuth(token);
        try { 
            const response = await axiosClient.get('/api/auth');
            if(response.data.user) {
               dispatch({
                    type: AUTH_USER,
                    payload: response.data.user
                }); 
            }
            
        } catch (error) {
            dispatch({
                type: AUTH_FAILURE,
                payload: error.response.data.msg
            });
        }
    }; 

    //close session
    const signOut = ()=>{
        dispatch({
            type: SIGN_OUT
        });
    };

    return (
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                signUser,
                authUser,
                authUserLocal,
                signOut
            }}
        >
            {children}
        </authContext.Provider>
    )
};

export default AuthState;