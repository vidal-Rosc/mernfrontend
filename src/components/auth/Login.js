import React, { useState, useContext, useEffect } from 'react';
import {Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';



const Login = (props) => {

    //Extraemos los valores del context
    const alertContext = useContext(AlertContext);
    const { alert, displayAndHideAlert} = alertContext;

    const authContext = useContext(AuthContext);
    const { userLogin, message, authenticated } = authContext;

    //En caso de que el email o password sean incorrectos
    useEffect(() => {
        if(authenticated){
            props.history.push('/projects');
        }

        if(message){
            displayAndHideAlert(message.msg, message.category);
        }

        //eslint-disable-next-line
    }, [message, authenticated, props.history]);

    //Definimos el state
    const [user, handleUser] = useState({
        email: '',
        password: ''
    });

    //Extraemos el email y password del user
    const {email, password } = user;

    const onChange = e => {
        handleUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    //Al iniciar session
    const onSubmit = e => {
        e.preventDefault();

        //Validar formulario
        if(email.trim() === '' || password.trim() === ''){
            displayAndHideAlert('All fields are required', 'alert-error');
            return;
        }

        //Enviarlo al action
        userLogin({ email, password });

    }


    return ( 
        <div className="user-form">
            { alert ? ( <div className={`alert ${alert.category}`}>{alert.msg}</div>) : null }
            <div className="container-form dark-shadow">
                <h1>*** Login ***</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="field-form">
                        <label htmlFor="email"> Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email..."
                            onChange={onChange}
                        />
                    </div>

                    <div className="field-form">
                        <label htmlFor="password"> Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="field-form">
                        <input
                            type="submit"
                            className="btn btn-primary btn-block"
                            value="Login"
                        />
                    </div>
                </form>
                <Link to={'/new-account'} className="link-account">
                        Not Register?
                </Link>
            </div>
        </div>
     );
}
 
export default Login;