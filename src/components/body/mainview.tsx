import { useStateContext } from "../../state/stateContext";
import { useEffect, useState } from "react";
import { Project, universalTag } from "../../types";

import "./content.scss";
import ProjectTile from "./project/project";

function MainView() {
  const [mobile, setMobile] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      name: "",
      description: "",
      link: "",
      icon: "",
      screenshots: [],
      tags: [],
      github: "",
    },
  ]);

  const context = useStateContext();

  useEffect(() => {
    if (!context) {
      return;
    }
    const { state } = context;
    const newProjects: Project[] = [];

    state.projects.forEach((project) => {
      if (
        project.tags.includes(state.mainView) ||
        state.mainView === universalTag
      ) {
        newProjects.push(project);
      }
    });

    setProjects([...newProjects]);
  }, [context]);

  useEffect(() => {
    const resize = () => {
      //((max-width: 768px) or (max-aspect-ratio: 3/4))
      if (
        window.innerWidth <= 768 ||
        window.innerWidth / window.innerHeight <= 0.75
      ) {
        setMobile(true);
      } else setMobile(false);
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div id="mainview">
      {mobile ? (
        <div className="tile-container">
          {projects.map((project, index) => (
            <ProjectTile project={project} index={index} key={index} />
          ))}
        </div>
      ) : (
        [
          <div className="tile-container" key="tile-1">
            {projects.map(
              (project, index) =>
                index % 2 === 0 && (
                  <ProjectTile project={project} index={index} key={index} />
                )
            )}
          </div>,
          <div className="tile-container" key="tile-2">
            {projects.map(
              (project, index) =>
                index % 2 !== 0 && (
                  <ProjectTile project={project} index={index} key={index} />
                )
            )}
          </div>,
        ]
      )}
    </div>
  );
}

export default MainView;
