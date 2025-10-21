import { State, Action } from "../types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CONTENT":
      if (typeof action.payload === "string") {
        return { ...state, mainView: action.payload };
      }
      return state;
    case "SET_PROJECTS":
      if (Array.isArray(action.payload)) {
        return { ...state, projects: action.payload };
      }
      return state;
    default:
      return state;
  }
};
