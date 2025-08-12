import { useStateContext } from "../../state/stateContext";
import { useEffect, useState } from "react";
import { Project, Tile } from "../../types";
import Screenshot from "./screenshot";
import Icon from "./icon";
import Description from "./description";
import Title from "./title";
import Link from "./link";

function MainView() {
  const [project, setProject] = useState<Project>({
    name: "",
    type: "tiles",
    content: [],
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
      {(project.content as Tile[]).map((tile, index) => (
        <div key={index} className="tile">
          <div className="info">
            <span>
              <Icon icon={tile.icon} />
              <Title title={tile.name} />
            </span>

            <Link link={tile.link} />

            <Description description={tile.description} />
          </div>
          <div className="screenshots">
            {tile.screenshots.map((screenshot, idx) => (
              <Screenshot screenshot={screenshot} key={idx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainView;
