import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Bar from '../layout/Bar';
import FormTask from '../tasks/FormTask';
import TaskList from '../tasks/TaskList';
import AuthContext from '../../context/authentication/authContext';


const Projects = () => {

    //Extramos los datos del autenticado
    const authContext = useContext(AuthContext);
    const { userAuthenticated } = authContext;

    useEffect( () => {
        userAuthenticated();
        //eslint-disable-next-line
    }, []);

    return (
        <div className="container-app">
            <Sidebar />
            <div className="main-section">
                <Bar />
                <main>
                    <FormTask />
                    <div className="container-tasks">
                        <TaskList />
                    </div>
                </main>    
            </div>
        </div>
    );
}
 
export default Projects;