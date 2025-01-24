import Item from "./item";
import BackButton from "./backbutton";
import ForwardButton from "./forwardbutton";
import { useStateContext } from "../../state/stateContext";
import { useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size/throttled";

function ContentList() {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [index, setIndex] = useState(0);
  const [maxItems, setMaxItems] = useState(3);
  const [showArrows, setShowArrows] = useState(false);
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
      if (project.index >= index && project.index < index + maxItems) {
        //if the project is within range of current index + max items count
        legalIndex.push(project.index);
      }
    });

    state.projects.forEach((project) => {
      if (
        project.index < index &&
        project.index < maxItems - (state.projects.length - index)
      ) {
        //else if we doesnt quite reach the maxitems, loop back around and get the early ones
        legalIndex.push(project.index);
      }
    });

    if (legalIndex.length === state.projects.length) {
      legalIndex.sort((a, b) => a - b);
    }

    legalIndex.forEach((index) => {
      const project = state.projects[index];
      tempItems.push(
        <Item
          key={index}
          name={project.name}
          icon={project.icon}
          index={project.index}
          selected={state.mainView === project.index}
          hidden={legalIndex.includes(index) ? false : true}
        />
      );
    });
    setItems(tempItems);
  }, [context, index, maxItems]);

  useEffect(() => {
    if (!context) {
      return;
    }
    const getRem = (rem: number) =>
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

    const itemWidth = getRem(width > 768 ? 6 : 4);
    const arrowWidth = getRem(width > 768 ? 16.5 : 10);

    const newMaxItems = Math.floor((width - arrowWidth) / itemWidth);
    const newShowArrows = newMaxItems < context?.state.projects.length;

    setMaxItems(newMaxItems > 0 ? newMaxItems : 1);
    setShowArrows(newShowArrows);
  }, [width, context]);

  //false is backwards, true is forwards
  const moveIndex = (direction: boolean) => {
    if (!context) {
      return;
    }
    const { state } = context;

    setIndex(
      !direction
        ? index + 1 >= state.projects.length
          ? 0
          : index + 1
        : index - 1 < 0
        ? state.projects.length - 1
        : index - 1
    );
  };

  return (
    <div id="contentlist">
      {showArrows ? <BackButton moveIndex={moveIndex} /> : null}
      {items}
      {showArrows ? <ForwardButton moveIndex={moveIndex} /> : null}
    </div>
  );
}

export default ContentList;
