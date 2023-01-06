import { configureStore } from "@reduxjs/toolkit";
import DiagramReducer from './slice/diagram-builder-slice';
import DiagramEditorReducer from './slice/diagram-panelEditor-slice';

export const store = configureStore({
    reducer: {
        diagram: DiagramReducer,
        diagramEditor: DiagramEditorReducer
    },
});