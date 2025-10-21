import MainView from "./body/mainview.tsx";
import ContentList from "./headers/contentlist.tsx";
import StateContext from "../state/stateContext.ts";
import { reducer } from "../state/reducers.ts";
import React, { useEffect } from "react";
import Blob from "./background/blob.tsx";
import { universalTag } from "../types.ts";

function App() {
  const initialState = {
    mainView: universalTag,
    projects: [],
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    import("./../assets/projects.json").then((res) => {
      const projects = res.default.map((project, index) => {
        return { ...project, index };
      });

      dispatch({
        type: "SET_PROJECTS",
        payload: projects,
      });
    });
  }, []);

  return (
    <div id="container">
      <Blob />
      <StateContext.Provider value={{ state, dispatch }}>
        <div id="contentblocker" />
        <ContentList />
        <MainView />
      </StateContext.Provider>
    </div>
  );
}

export default App;
