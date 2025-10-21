import { Project as ProjectType } from "../../../types";
import Description from "./components/description";
import Github from "./components/github";
import Icon from "./components/icon";
import Link from "./components/link";
import Screenshot from "./components/screenshot";
import Title from "./components/title";

import "./project.scss";

export default function ProjectTile({
  index,
  project,
}: {
  index: number;
  project: ProjectType;
}) {
  return (
    <div key={index} className="tile">
      <div className="info">
        <span>
          <Icon icon={project.icon} />
          <Title title={project.name} />
          <Github url={project.github} />
        </span>

        <Link link={project.link} />

        <Description description={project.description} />
      </div>
      <div className="screenshots">
        {project.screenshots.map((screenshot, idx) => (
          <Screenshot screenshot={screenshot} key={idx} />
        ))}
      </div>
    </div>
  );
}
