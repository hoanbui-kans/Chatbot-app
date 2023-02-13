import { configureStore } from "@reduxjs/toolkit";
import DiagramReducer from './slice/diagram-builder-slice';
import DiagramEditorReducer from './slice/diagram-panelEditor-slice';

import ConservationrReducer from './slice/conservation-builder-slice';

export const store = configureStore({
    reducer: {
        diagram: DiagramReducer,
        diagramEditor: DiagramEditorReducer,
        conservation: ConservationrReducer,
    },
});