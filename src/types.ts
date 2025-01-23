import React from "react";

export type Project = {
    name: string;
    description: string;
    link: string;
    icon: string;
    screenshot: string;
    index: number;
}

export type State = {
    mainView: number;
    projects: Array<Project>;
};

export type Action = { 
    type: 'SET_CONTENT' | 'SET_PROJECTS'; 
    payload: number | Array<Project>;
};

export type ContextType = {
    state: State;
    dispatch: React.Dispatch<Action>;
};