import React, { useReducer } from 'react';
import ProjectContext from './ProjectContext';
import ProjectReducer from './ProjectReducer';
import { FORM_PROJECT, GET_PROJECTS, ADD_PROJECT, VALIDATE_FORM, ACTUAL_PROJECT, DELETE_PROJECT, ERROR_PROJECT } from '../../types';
import axiosClient from '../../config/axios';

//Definimos el state qe se va a tener y tambien van a estar
//las diferentes funciones con dispatch hacia los types.

//State inicial de la administracion del proyecto(crear, eliminar)

const ProjectState = props => {

    const initialState = {
        proyectos : [],
        form : false,
        errorForm: false,
        project: null,
        message: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(ProjectReducer, initialState)

   
    //Funciones para el CRUD

    //Funcion para mostrar el formulario
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    }

    //Obtener los proyectos
    const getProjects = async () => {
        //dispatch({
        //    type: GET_PROJECTS,
        //    payload: proyectos
        //})
        try {
            const result = await axiosClient.get('/api/projects');

            dispatch({
                type: GET_PROJECTS,
                payload: result.data.projects
            });
        } catch (error) {
            const alert = {
                msg: 'Projects NOT FOUND',
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
        }
    }

    //Agregar un nuevo proyecto
    const addProject = async project => {
        //insertamos el proyecto en el state
        //dispatch({
        //    type: ADD_PROJECT,
        //    payload: project
        //})
        try {
            const result = await axiosClient.post('/api/projects', project);
            console.log(result);
            //insertamos el proyecto en el state
            dispatch({
                type: ADD_PROJECT,
                payload: result.data
            })
        } catch (error) {
            const alert = {
                msg: 'An error was found. Project can not be added',
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
        }
    }

    //Validando el formulario-- Mostrar errores
    const error = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    }

    //Selecciona el proyecto en el sideBar
    const actualProject = projectId => {
        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectId
        })
    }
    
    //Eliminar un projecto
    const deleteProject =  async projectId => {
        //dispatch({
        //    type: DELETE_PROJECT,
        //    payload: projectId
        //})
        try {
            await axiosClient.delete(`/api/projects/${projectId}`);

            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            });

        } catch (error) {
            const alert = {
                msg: 'An error was found',
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
        }
    }


    return (
        <ProjectContext.Provider
            value={{
                proyectos: state.proyectos,
                form: state.form,
                errorForm: state.errorForm,
                project: state.project,
                message: state.message,
                showForm,
                getProjects,
                addProject,
                error,
                actualProject,
                deleteProject
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectState;