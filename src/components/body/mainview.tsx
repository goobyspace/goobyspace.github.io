import { useStateContext } from "../../state/stateContext";
import { useEffect, useState } from "react";
import { Project } from "../../types";
import Screenshot from "./screenshot";
import Icon from "./icon";
import Description from "./description";
import Title from "./title";
import Link from "./link";

function MainView() {
  const [project, setProject] = useState<Project>({
    name: "",
    description: "",
    link: "",
    icon: "",
    screenshot: "",
    index: 0,
  });
  const context = useStateContext();

  useEffect(() => {
    if (!context) {
      return;
    }
    const { state } = context;
    state.projects.forEach((project) => {
      if (project.index === state.mainView) {
        setProject(project);
      }
    });
  }, [context]);
  return (
    <div id="mainview">
      <Screenshot screenshot={project.screenshot} />
      <div id="info">
        <span>
          <Icon icon={project.icon} />
          <Title title={project.name} />
        </span>

        <Link link={project.link} />

        <Description description={project.description} />
      </div>
    </div>
  );
}

export default MainView;
