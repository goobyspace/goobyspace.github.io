import type { Project } from "../projects.ts";
import Icon from "./icon/icon.tsx";
import classes from "./footer.module.scss";

function Footer({ projects, selected, tag, onSelect }: {
    projects: Project[];
    selected: Project | undefined;
    tag?: string;
    onSelect: (project: string) => void;
}) {
    return (
        <footer className={classes.footer}>
            <nav className={classes.pages} tabIndex={0}>
                {projects.map(project => (
                    <Icon
                        key={project.id}
                        project={project}
                        selected={project.id === selected?.id}
                        tag={tag}
                        onSelect={onSelect}
                    />
                ))}
            </nav>
        </footer>
    );
}

export default Footer;
