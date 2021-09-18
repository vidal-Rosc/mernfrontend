import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import axiosClient from '../../config/axios';
import { TASKS_PROJECT, ADD_TASK, VALIDATE_TASK, DELETE_TASK, ACTUAL_TASK, UPDATE_TASK, CLEAN_TASK } from '../../types';



const TaskState = props => {
    const initialState = {
        taskProjects: [],
        taskError: false,
        selectedTask: null,
    }

    //Creamos el dispatch y el state
    const [state, dispatch] = useReducer( TaskReducer, initialState );

    //Obtenemos las tareas de un proyecto
    const getTasks =  async project => {
        try {

            const result = await axiosClient.get('/api/tasks', { params : { project }});
            console.log(result)

            dispatch({
                type:TASKS_PROJECT,
                payload: result.data.tasks
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Agregar una tarea al proyecto seleccionado$
    const addTask = async task => {
        try {
            await axiosClient.post('/api/tasks', task);
            dispatch({
                type: ADD_TASK,
                payload: task
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Muestra un error en caso de no pasar la validacion
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        });
    }

    //Borrar tareas por ID
    const deleteTask =  async (id, project) => {
        try {
            await axiosClient.delete(`/api/tasks/${id}`, { params: { project }});
            dispatch({
                type: DELETE_TASK,
                payload: id
            });
        } catch (error) {
            console.log(error)
        }
    }

    //Edita una tarea
    const editTask =  async task => {
        //console.log(task)
       try {
            const result = await axiosClient.put(`/api/tasks/${task._id}`, task );
            console.log(result)
            dispatch({
                type: UPDATE_TASK,
                payload: result.data.task
            });
       } catch (error) {
           console.log(error)
       }
    }

    //Seleccionar la tarea actual
    const actualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        });
    }

   
    //Elimina la tarea seleccionada
    const cleanSelectedTask = () => {
        dispatch({
            type: CLEAN_TASK,
        });
    }


    return (
        <TaskContext.Provider
            value={{
                taskProjects: state.taskProjects,
                taskError: state.taskError,
                selectedTask: state.selectedTask,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                actualTask,
                editTask,
                cleanSelectedTask,
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}
export default TaskState;