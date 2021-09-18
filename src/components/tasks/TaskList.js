import React, { Fragment, useContext } from 'react';
import Task from './Task';
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/taskContext';
import { CSSTransition, TransitionGroup } from  'react-transition-group';

const TaskList = () => {
    //State para los proyectos
    const projectsContext = useContext(ProjectContext);
    const { project, deleteProject } = projectsContext;

    //State para las tareas, obteniendo las tareas
    const tasksContext = useContext(TaskContext);
    const { taskProjects } = tasksContext;

    //Si no hay proyecto seleccionado
    if(!project) return <h2>*** Select a Project ***</h2>;

    //Array destructuring para obtener la posicion [0] del proyecto
    const [actualProject] = project;


    //Elimina el projecto
    const deleteProjectxId = () => {
        deleteProject(actualProject._id);
    }

    return ( 
        <Fragment>
            <h2> *** {actualProject.name} *** </h2>

            <ul className="tasks-list">
                {taskProjects.length === 0
                ? (<li className="task"><p>There's not Tasks</p></li>)
                :
                    <TransitionGroup>
                        { taskProjects.map(task => (
                            <CSSTransition
                                key={task.id}
                                timeout={400}
                                classNames="task"
                            >
                                <Task
                                    task={task}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-primary btn-delete"
                onClick={deleteProjectxId}
            >Delete Project &times;</button>
        </Fragment>
    );
}
 
export default TaskList;