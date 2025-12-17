import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import AuthHandler from './components/auth/AuthHandler';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import InitializationHandler from './components/InitializationHandler';
import Layout from './components/Layout';
import ProjectBoard from './components/projects/ProjectBoard';
import ProjectView from './components/projects/ProjectView';
import ProtectedRoute from './components/ProtectedRoute';
import TaskView from './components/tasks/TaskView';

function App() {

  return (
    <AuthHandler> {/*provides acces to token and handles token auth*/}
      <Routes>
        <Route path="/login" element={<Login />} /> {/* login page where user gets redirected if not authorized */}
        <Route path="/register" element={<Register />} />
        <Route element={
          <ProtectedRoute>
            <InitializationHandler>
              <Layout>
                <Outlet /> {/* child components, all child components are nested inside of ProtectedRoute => SocketProvider => Layout*/}
              </Layout>
            </InitializationHandler>
          </ProtectedRoute>
        }>
          {/*here are child components to be rendered inside of outlet */}
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<ProjectBoard />} />
          <Route path="/projects/:projectId" element={<ProjectView />} />
          <Route path="/projects/:projectId/tasks/:taskId" element={<TaskView />} />
        </Route>
      </Routes>
    </AuthHandler>
  );
}


export default App
