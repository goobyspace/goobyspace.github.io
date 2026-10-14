import React from "react";

export type Project = {
  name: string;
  description: string;
  link: string;
  icon: string;
  screenshots: string[];
  tags: string[];
  github: string;
};

export type State = {
  mainView: string;
  projects: Project[];
};

export type Action = {
  type: "SET_CONTENT" | "SET_PROJECTS";
  payload: string | Project[];
};

export type ContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const universalTag = "all";
