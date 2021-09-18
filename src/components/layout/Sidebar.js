import React from 'react';
import NewProject from '../projects/NewProject';
import ProjectList from '../projects/ProjectList';

const Sidebar = () => {
    return ( 
        <aside>
            <h1>PROJECT <span>Tasks</span></h1>

            <NewProject />

            <div className="projects">
                <h1>Your Projects</h1>
                <ProjectList />
            </div>
        </aside>
    );
}
 
export default Sidebar;