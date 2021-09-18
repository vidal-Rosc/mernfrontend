import { TASKS_PROJECT, ADD_TASK, VALIDATE_TASK, DELETE_TASK, ACTUAL_TASK, UPDATE_TASK, CLEAN_TASK } from '../../types';



const TaskReducer = (state, action) => {
    switch(action.type){
        case  TASKS_PROJECT:
            return {
                ...state,
                taskProjects: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                taskProjects: [action.payload, ...state.taskProjects], //creamos un nuevo arreglo de tareas con las nuevas
                taskError: false
            }
         case  VALIDATE_TASK:
            return {
                ...state,
                taskError: true,
            }
        case DELETE_TASK:
            return {
                ...state,
                taskProjects: state.taskProjects.filter(task => task._id !== action.payload)
            }
        case UPDATE_TASK:
            return {
                ...state,
                taskProjects: state.taskProjects.map(task => task._id === action.payload._id ? action.payload :task)
            }
        case ACTUAL_TASK:
            return {
                ...state,
                selectedTask: action.payload
            }
        case CLEAN_TASK:
            return {
                ...state,
                selectedTask: null
            }
        default:
            return state;
    }
}

export default TaskReducer;