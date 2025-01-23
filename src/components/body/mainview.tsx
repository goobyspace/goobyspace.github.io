import { useStateContext } from "../../state/stateContext";
import { useEffect, useState } from "react";
import { Project } from "../../types";

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
  return <div id="mainview">{project.name}</div>;
}

export default MainView;
