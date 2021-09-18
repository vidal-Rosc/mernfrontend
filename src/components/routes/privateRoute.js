import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/authentication/authContext';

//Esto es la forma de realizar un higher-Order Component, le pasamos una copia de los props al 
//componente hijo

const PrivateRoute = ({ component: Component, ...props}) => {

    const authContext = useContext(AuthContext);
    const { authenticated, userAuthenticated, uploading } = authContext;

    //Para que al recargar la app me traiga los datos de la sesion del usuario
    useEffect( () => {
        userAuthenticated();
        //eslint-disable-next-line
    }, []);


    return (  

        //Si el usuario esta autenticado, se pasara a proyectos y si no al component de login
        <Route { ...props } render={ props => !authenticated && !uploading ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        ) } />
    );
}
 
export default PrivateRoute;
