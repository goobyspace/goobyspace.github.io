import data from "../../assets/projects.json";

const projects = data.map(project => ({
    ...project,
    id: project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}));

export type Project = typeof projects[number];

export default projects;
