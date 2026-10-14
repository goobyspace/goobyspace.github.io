import Item from "./item";
import { useStateContext } from "../../state/stateContext";
import { useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size/throttled";

import "./headers.scss";
import { universalTag } from "../../types";

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

    const projects = state.projects;

    const tagsSet = new Set<string>([universalTag]);
    for (let i = 0; i < projects.length; i++) {
      for (let x = 0; x < projects[i].tags.length; x++) {
        tagsSet.add(projects[i].tags[x]);
      }
    }

    const tags = Array.from(tagsSet);

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      tempItems.push(
        <Item
          key={i}
          name={tag}
          tag={tag}
          selected={state.mainView === tag}
          hidden={i < maxItems ? false : true}
        />
      );
    }

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
