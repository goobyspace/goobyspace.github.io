import Blob from "../../../blob/blob.tsx";
import type { Project } from "../../projects.ts";
import classes from "./icon.module.scss";

function Icon({ project, selected, tag, onSelect }: {
    project: Project;
    selected: boolean;
    tag?: string;
    onSelect: (project: string) => void;
}) {
    const params = new URLSearchParams();
    if (tag) params.set("tag", tag);
    params.set("project", project.id);

    return (
        <a
            className={classes.project}
            aria-current={selected ? "page" : undefined}
            href={`#${params}`}
            onClick={event => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                onSelect(project.id);
            }}
        >
            <Blob className={classes.projectIcon}>
                {project.icon
                    ? <img src={`${import.meta.env.BASE_URL}${project.icon}`} alt="" />
                    : <span>{project.name.charAt(0)}</span>}
            </Blob>
            <span>{project.name}</span>
        </a>
    );
}

export default Icon;
