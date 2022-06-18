import { useEffect } from 'react';
import type { NextPage } from 'next';
import { Project } from '../ts/interfaces';
import { ProjectCard } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../store/features/projects/projectSlice';
import { AppDispatch, RootState } from '../store/store';

const Home: NextPage = () => {
  const { projects } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  if (projects.length === 0) {
    return (
      <section className='section'>
        <h2 className='title'>Loading...</h2>;
      </section>
    );
  }
  return (
    <section className='section'>
      <h2 className='title'>Assistant</h2>
      <h3 className='title'>Same App with different frameworks or languages</h3>
      <div className='container'>
        {projects.map((project: Project) => {
          return <ProjectCard project={project} key={project.id} />;
        })}
      </div>
    </section>
  );
};

export default Home;
