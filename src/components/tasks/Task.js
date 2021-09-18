import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/taskContext';



const Task = ({task}) => {

    //Para obtener el proyecto actual
    const projectsContext = useContext(ProjectContext);
    const { project } = projectsContext;

    //Obtenemos la funcion para eliminar las tareas
    const tasksContext = useContext(TaskContext);
    const { deleteTask, getTasks, editTask, actualTask } = tasksContext;

    const [actualProject] = project;

    //Al eliminar una tarea
    const delTask = id => {
        deleteTask(id, actualProject._id); //Pasamos el id al backend.
        getTasks(actualProject.id);
    }

    //Para modificar el status de las tareas 
    const changeTaskStatus = task => {
    
        task.status ? task.status= false : task.status = true;   //** if(task.status){
        editTask(task)                                         //     task.status= false;
    }                                                            //** }else{
    // ********************************************************  //     task.status= true; 

    //Editar la tarea seleccionada
    const selectTask = task => {
        actualTask(task)
    }
    

    return ( 
        <li className="task shadow">
            <p>{task.name}</p>

            <div className="status">
                {task.status 
                ?(
                    <button
                        type="button"
                        className="completed"
                        onClick={() => changeTaskStatus(task)}
                    >Done!</button>
                )
                :(
                    <button
                        type="button"
                        className="incompleted"
                        onClick={() => changeTaskStatus(task)}
                    >Not Yet!</button>
                )
                }
            </div>

            <div className="actions">

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => selectTask(task)}
                >Edit</button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => delTask(task._id)}
                >Delete</button>

            </div>

        </li>
    );
}
 
export default Task;