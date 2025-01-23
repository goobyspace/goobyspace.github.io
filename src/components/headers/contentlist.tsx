import Item from "./item";
import { useStateContext } from "../../state/stateContext";
import { useEffect, useState } from "react";

function ContentList() {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const context = useStateContext();

  useEffect(() => {
    if (!context) {
      return;
    }
    const { state } = context;
    const tempItems: JSX.Element[] = [];
    state.projects.forEach((project, index) => {
      tempItems.push(
        <Item
          key={index}
          name={project.name}
          icon={project.icon}
          index={project.index}
        />
      );
    });
    setItems(tempItems);
  }, [context]);

  return <div id="contentlist">{items}</div>;
}

export default ContentList;
