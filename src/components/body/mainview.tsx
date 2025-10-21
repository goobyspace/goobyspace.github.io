import { useStateContext } from "../../state/stateContext";
import { useEffect, useState } from "react";
import { Project } from "../../types";
import Screenshot from "./screenshot";
import Icon from "./icon";
import Description from "./description";
import Title from "./title";
import Link from "./link";
import ScreenshotGallery from "./screenshotgallery";

import "./content.scss";

function MainView() {
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
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const [screenshots, setScreenshots] = useState<string[]>([]);

  const context = useStateContext();

  useEffect(() => {
    if (!context) {
      return;
    }
    const { state } = context;
    const newProjects: Project[] = [];

    state.projects.forEach((project) => {
      if (project.tags.includes(state.mainView)) {
        newProjects.push(project);
      }
    });

    setProjects([...newProjects]);
  }, [context]);

  return (
    <div id="mainview">
      <ScreenshotGallery screenshots={screenshots} index={screenshotIndex} />
      {projects.map((project, index) => (
        <div key={index} className="tile">
          <div className="info">
            <span>
              <Icon icon={project.icon} />
              <Title title={project.name} />
            </span>

            <Link link={project.link} />

            <Description description={project.description} />
          </div>
          <div className="screenshots">
            {project.screenshots.map((screenshot, idx) => (
              <Screenshot
                screenshot={screenshot}
                key={idx}
                onClick={() => {
                  setScreenshotIndex(idx);
                  setScreenshots(project.screenshots);
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainView;
