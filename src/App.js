import React from 'react';
import { BrowserRouter as Router, Switch, Route } from  'react-router-dom';
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';
import ProjectState from './context/projects/ProjectState';
import TaskState from './context/tasks/taskState';
import AlertState  from './context/alerts/alertState';
import AuthState from './context/authentication/authState';
import authToken from './config/authToken'; 
import PrivateRoute from './components/routes/privateRoute';

//Esto lo hacemos por si cse recargue la app, no se pierdan los datos de sesion
//Revisamos si tenemos un token
const token = localStorage.getItem('token');
if (token) authToken(token);

function App() {
  //Todo lo que va dentro el Switch es el contenido de CADA UNA de las paginas
  //Todo lo que va fuera del switch se vera EN TODAS las paginas

  console.log(process.env.REACT_APP_BACKEND_URL)
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/new-account" component={NewAccount} />
                <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
        </TaskState>
    </ProjectState>
  );
}

export default App;
