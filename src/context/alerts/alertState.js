import React, { useReducer } from 'react';
import AlertContext  from './alertContext';
import AlertReducer  from './alertReducer';


import {DISPLAY_ALERT, HIDE_ALERT} from '../../types/';




const AlertState = props => {

    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer( AlertReducer, initialState );


    const displayAndHideAlert = (msg, category) => {
        dispatch({
            type : DISPLAY_ALERT,
            payload: {
                msg,
                category
            }     
        });

        setTimeout( () => {
            dispatch({
                type: HIDE_ALERT,
            })
        }, 6000);
    }



    return(
        <AlertContext.Provider
            value={{
                alert: state.alert,
                displayAndHideAlert,

            }}
        >
            {props.children}
        </AlertContext.Provider>
    )

}

export default AlertState;