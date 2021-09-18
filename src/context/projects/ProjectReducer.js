import { FORM_PROJECT, GET_PROJECTS, ADD_PROJECT, VALIDATE_FORM, ACTUAL_PROJECT, DELETE_PROJECT, ERROR_PROJECT } from '../../types';


//Contiene las funciones que van a interactuar con el state
//La nueva API de context con REDUCER, es un remplazo de redux sin necesidad de instalar nada.
//ya viene agregado en REACT

const ProjectReducer = (state, action) => {
    switch(action.type){
        case FORM_PROJECT:
            return {
                ...state,
                form: true
            }
        case GET_PROJECTS:
            //console.log(action.payload)
            return {
                ...state,
                proyectos: action.payload
            }
        case ADD_PROJECT:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                form: false,
                errorForm: false
            }
        case VALIDATE_FORM:
            return {
                ...state,
                errorForm: true
            }
        case ACTUAL_PROJECT:
            return {
                ...state,
                project: state.proyectos.filter(project => project._id === action.payload)

            }
        case DELETE_PROJECT:
            return {
                ...state,
                proyectos: state.proyectos.filter(project => project._id !== action.payload),
                //Para que al borrar elimine tb el formulario de tareas
                project: null
            }
        case ERROR_PROJECT:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}

export default ProjectReducer;