import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axiosClient from '../../config/axios';
import authToken from '../../config/authToken';
import {SUCCESFUL_REGISTRATION, 
    UNSUCCESFUL_REGISTRATION, 
    GET_USER,
    SUCCESFUL_LOGIN,
    UNSUCCESFUL_LOGIN,
    LOG_OUT} from '../../types/';


const AuthState = props => {

    const initialState = {
        //Iniciamos el state con un token y lo almacenamos en localstorage
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        uploading: true // Para no ver la pagina del login
    }

    const [state, dispatch] = useReducer( AuthReducer, initialState );

    //Para registrar un usuario
    const userRegistration = async data => {
        try {
            const response = await axiosClient.post('/api/users', data);
            //console.log(response.data);
            dispatch({
                type : SUCCESFUL_REGISTRATION,
                payload : response.data        
            })

            //Obtenemos el usuario logado
            userAuthenticated();
        } catch (error) {
            //console.log(error.response.data.msg);
            const alert = {
                msg : error.response.data.msg,
                category : 'alert-error'
            }
            dispatch({
                type : UNSUCCESFUL_REGISTRATION,
                payload : alert
            })
        }

    }

    //Retorna el usuario autenticado
    const userAuthenticated =  async () => {
        const token = localStorage.getItem('token');
        if(token){
            //Enviamos el token al header
            authToken(token);

        }
        try {
            const response = await axiosClient.get('/api/auth');
            //console.log(response)
            dispatch({
                type : GET_USER,
                payload : response.data.user
            })
            
        } catch (error) {
            console.log(error.response)
            dispatch({
                type : UNSUCCESFUL_LOGIN
            });    
        }
    }

    //Para iniciar sesion
    const userLogin = async data => {

        try {
            const response = await axiosClient.post('/api/auth', data);
            console.log(response);
            dispatch({
                type : SUCCESFUL_LOGIN,
                payload : response.data
            });
            
            //Obtenemos el usuario logado
            userAuthenticated();
        } catch (error) {
            console.log(error.response.data.msg)
            const alert = {
                msg : error.response.data.msg,
                category : 'alert-error'
            }
            dispatch({
                type : UNSUCCESFUL_LOGIN,
                payload : alert
            });
            
        }
    }

    //Para cerrar sesion
    const userLogout = () => {
        dispatch({
            type : LOG_OUT
        });
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                uploading: state.uploading,
                userRegistration,
                userLogin,
                userAuthenticated,
                userLogout
                
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState;