import React, { useState, useContext, useEffect } from 'react';
import {Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';



const NewAccount = (props) => {

    //Extraemos los valores del context
    const alertContext = useContext(AlertContext);
    const { alert, displayAndHideAlert} = alertContext;

    const authContext = useContext(AuthContext);
    const { userRegistration, message, authenticated } = authContext

    //Si el usuario: se registra, se autentica o esta duplicado
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
        name: '',
        email: '',
        password: '',
        repeatedpassword: ''
    });

    //Extraemos el email y password del user
    const {name, email, password, repeatedpassword } = user;

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
        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || 
           repeatedpassword.trim() === ''){
            displayAndHideAlert('All fields are required', 'alert-error');
            return;
        }

        //Validar que el password sea minimo de 5 caracteres
        if(password.length < 6){
            displayAndHideAlert('Password must contain min 6 characters', 'alert-error');
            return;
        }

        //Validar que el password y el repeatedpassword sean lo mismo
        if(password !== repeatedpassword){
            displayAndHideAlert('Non-identical passwords', 'alert-error');
            return;
        }

        //Enviarlo al action
        userRegistration({
            name,
            email,
            password
        });

    }


    return ( 
        <div className="user-form">
            { alert ? ( <div className={`alert ${alert.category}`}>{alert.msg}</div>) : null }
            <div className="container-form dark-shadow">
                <h1>*** New Account ***</h1>

                <form
                    onSubmit={onSubmit}
                >

                    <div className="field-form">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter your name..."
                            onChange={onChange}
                        />
                    </div>
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
                        <label htmlFor="repeatedpassword">Confirm Password</label>
                        <input
                            type="password"
                            id="repeatedpassword"
                            name="repeatedpassword"
                            value={repeatedpassword}
                            onChange={onChange}
                        />
                    </div>

                    <div className="field-form">
                        <input
                            type="submit"
                            className="btn btn-primary btn-block"
                            value="Register"
                        />
                    </div>
                </form>
                <Link to={'/'} className="link-account">
                        Return to Login
                </Link>
            </div>
        </div>
     );
}
 
export default NewAccount;