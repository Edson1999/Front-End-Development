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
        console.log(error);
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
    console.log(project);

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
      console.log(error);
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
      console.log(error);
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
