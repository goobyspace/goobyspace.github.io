import React from "react";

export type Tile = {
  name: string;
  description: string;
  link: string;
  icon: string;
  screenshots: string[];
};

export type Article = string;

export type Project = {
  name: string;
  type: "tiles" | "article" | string;
  content: Tile[] | Article;
  index: number;
};

export type State = {
  mainView: number;
  projects: Project[];
};

export type Action = {
  type: "SET_CONTENT" | "SET_PROJECTS";
  payload: number | Project[];
};

export type ContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
