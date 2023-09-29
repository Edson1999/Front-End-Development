import PropTypes from 'prop-types';
import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../config/axiosClient';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [formTaskModal, setFormTaskModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient('/projects', config);
        setProjects(data);
      } catch (error) {
        throw new Error(error);
      }
    };
    getProjects();
  }, []);

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const submitProject = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }

    return;
  };

  const editProject = async (project) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.put(
        `/projects/${project.id}`,
        project,
        config
      );

      const updatedProjects = projects.map((stateProject) =>
        stateProject._id === data._id ? data : stateProject
      );
      setProjects(updatedProjects);

      setAlert({
        msg: `El proyecto: ${project.name} se actualizó correctamente`,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 3000);
    } catch (error) {
      throw new Error(error);
    }
  };

  const newProject = async (project) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post('/projects', project, config);
      setProjects([...projects, data]);

      setAlert({
        msg: `El proyecto: ${project.name} se creo correctamente`,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 3000);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient(`/projects/${id}`, config);
      setProject(data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const deteleProject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.delete(`/projects/${id}`, config);

      const updatedProjects = projects.filter(
        (stateProject) => stateProject._id !== id
      );
      setProjects(updatedProjects);

      setAlert({
        msg: data.msg,
        error: false,
      });
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleTaskModal = () => {
    setFormTaskModal(!formTaskModal);
  };

  const submitTask = async (task) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post('/tasks', task, config);

      //Add task to state
      const updatedProject = { ...project };
      updatedProject.tasks = [...project.tasks, data];

      setProject(updatedProject);
      setAlert({});
      setFormTaskModal(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        showAlert,
        alert,
        submitProject,
        getProject,
        project,
        loading,
        deteleProject,
        formTaskModal,
        handleTaskModal,
        submitTask,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

ProjectsProvider.propTypes = {
  children: PropTypes.object,
};

export { ProjectsProvider };
export default ProjectsContext;
