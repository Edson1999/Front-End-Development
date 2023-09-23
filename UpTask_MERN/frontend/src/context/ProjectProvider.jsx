import PropTypes from 'prop-types';
import { useState, useEffect, createContext } from 'react';
import axiosClient from '../config/axiosClient';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  return (
    <ProjectsContext.Provider value={{ projects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

ProjectsProvider.propTypes = {
  children: PropTypes.object,
};

export { ProjectsProvider };
export default ProjectsContext;
