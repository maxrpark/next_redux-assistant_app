import type { NextPage } from "next";
import { Project } from "../ts/interfaces";
import { ProjectCard } from "../components";
import { GetServerSideProps } from "next";

interface Props {
    projects: Project[];
}

const Home: NextPage<Props> = ({ projects }) => {
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
            <h3 className='title'>
                Same App with different frameworks or languages
            </h3>
            <div className='container'>
                {projects.map((project: Project) => {
                    return <ProjectCard project={project} key={project.id} />;
                })}
            </div>
        </section>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const url = "https://assitant-app.netlify.app/api/projects-api";

    const response = await fetch(url);
    const projects = await response.json();

    return {
        props: {
            projects,
        },
    };
};

export default Home;
