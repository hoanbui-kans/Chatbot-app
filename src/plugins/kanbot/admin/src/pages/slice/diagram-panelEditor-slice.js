import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  panelEditor: false,
  editorState: false,
};

const DiagramPanelEditorSlice = createSlice({  
    name: 'diagramEditor',
    initialState,
    reducers: {
        setStatePanel: (state, action) => {
          state.panelEditor = action.payload
        },
        setEditorState: (state, action) => {
          state.editorState = action.payload
        }
    }
})

export const { 
  setStatePanel,
  setEditorState
} = DiagramPanelEditorSlice.actions;

export const statePanel = (state) => state.diagramEditor.panelEditor;
export const stateDataPanel = (state) => state.diagramEditor.editorState;

export default DiagramPanelEditorSlice.reducer;