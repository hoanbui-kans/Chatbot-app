import { configureStore } from "@reduxjs/toolkit";
import DiagramReducer from './slice/diagram-builder-slice';

export const store = configureStore({
    reducer: {
        diagram: DiagramReducer
    },
});