import Item from "./item";
import { useStateContext } from "../../state/stateContext";
import { useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size/throttled";

import "./headers.scss";

function ContentList() {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [maxItems, setMaxItems] = useState(3);
  const context = useStateContext();
  const width = useWindowWidth();

  useEffect(() => {
    if (!context) {
      return;
    }
    const { state } = context;
    const tempItems: JSX.Element[] = [];

    const legalIndex: number[] = [];

    state.projects.forEach((project) => {
      if (project.index < maxItems) {
        //if the project is within range of current index + max items count
        legalIndex.push(project.index);
      }
    });

    legalIndex.forEach((index) => {
      const project = state.projects[index];
      tempItems.push(
        <Item
          key={index}
          name={project.name}
          index={project.index}
          selected={state.mainView === project.index}
          hidden={legalIndex.includes(index) ? false : true}
        />
      );
    });
    setItems(tempItems);
  }, [context, maxItems]);

  useEffect(() => {
    if (!context) {
      return;
    }
    const getRem = (rem: number) =>
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

    const itemWidth = getRem(width > 768 ? 6 : 4);

    const newMaxItems = Math.floor(width / itemWidth);

    setMaxItems(newMaxItems > 0 ? newMaxItems : 1);
  }, [width, context]);

  return <div className="contentList">{items}</div>;
}

export default ContentList;
