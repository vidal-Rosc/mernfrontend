import React, { Fragment, useState, useContext } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';


const NewProject = () => {

    //De esta forma, podemos consumir el form:false dentro de este componente
    //sin necesidad de pasarlo por props. De esta forma en projectsContext todas las 
    //funciones y el state que definamos en el state del proyecto vamos a poder accederlos
    //unicamente implementando la linea de abajo e importando el context que se quiera usar.

    //State para el formulario
    const projectsContext = useContext(ProjectContext);
    const {form, showForm, addProject, error, errorForm } = projectsContext;

    //state para el proyecto
    const [project, handleProject] = useState({
        name: '',
    });

    //Extraemos el nombre del proyecto
    const { name } = project;

    //Lee  el contenido de los input
    const onChange = e => {
        handleProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    //Cuando el usuario da click
    const onSubmit = e => {
        e.preventDefault();

        //Validamos el Proyecto
        if (name === ''){
            error();
            return;
        }

        //Agregamos el proyecto al state
        addProject(project);

        //Reiniciamos el form
        handleProject({
            name: ''
        })
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-primary btn-block-small"
                onClick={() => showForm()}
            >New Project</button>

            {
                form ?
                    (
                        <form
                        className="new-project-form"
                        onSubmit={onSubmit}
                        >
                            <input
                                type="text"
                                className="input-text"
                                name="name"
                                placeholder="Project name..."
                                value={name}
                                onChange={onChange}
                            />
        
                            <input
                                type="submit"
                                className="btn btn-block btn-primary"
                                name="name"
                                value="Add Project"
                            />  
                        </form>
                    )
                    : null
            }
            {errorForm ? <p className="message error">Project name is required</p> :null}
        </Fragment>
    );
}
 
export default NewProject;