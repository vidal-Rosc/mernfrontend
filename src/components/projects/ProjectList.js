import React, { useContext, useEffect } from 'react';
import Project from '../projects/Project';
import ProjectContext from '../../context/projects/ProjectContext';
import AlertContext from '../../context/alerts/alertContext';
import { CSSTransition, TransitionGroup } from  'react-transition-group';


const ProjectList = () => {

    const projectsContext = useContext(ProjectContext);

    //requerimos solo los proyectos, por ende solo extraemos los proyectos
    const { proyectos, getProjects, message } = projectsContext;

    const alertContext = useContext(AlertContext);
    const {alert, displayAndHideAlert } = alertContext;

    //Para obtener los proyectos cuando carga el componente
    useEffect(() => {
        //Si hay un error
        if(message) displayAndHideAlert(message.msg, message.category);

        getProjects();
        //eslint-disable-next-line
    },[message]);
    
    //Revisamos si hay contenido en proyectos
    if(proyectos.length === 0) return <p>There's not Projects yet. Let's start one :)</p>;


    return ( 
        <ul className="list-projects">
            {alert ? ( <div className={`alert ${alert.category}`}>{alert.msg}</div>) : null}
          <TransitionGroup>
                {proyectos.map(project => (
                   <CSSTransition
                        key={project._id}
                        timeout={300}
                        classNames="project"
                   >
                        <Project
                            project ={project}
                        />
                   </CSSTransition>
                ))} 
          </TransitionGroup>
        </ul>
    );
}
 
export default ProjectList;