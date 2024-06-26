import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findManyEntity } from "../../api/Entity";
import { findManyResponse } from "../../api/Response";

const initialState = {
    panelEditor: false,
    editorState: false,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    entities: false,
    responses: false,
};

export const fetchData = createAsyncThunk(
  'diagramEditor/fetchData',
  async (app_id) => {
    const entities = await findManyEntity(app_id);
    const responses = await findManyResponse(app_id);
    return {
      entities: entities ? entities : false,
      responses: responses ? responses : false
    }
  }
)

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
    },
    extraReducers: (builder) => {
      builder.addCase(fetchData.pending, (state, action) => {
        // Add user to the state array
        state.loading = 'pending';
      }),
      builder.addCase(fetchData.fulfilled, (state, action) => {
        // Add user to the state array
        state.loading = 'idle';
        state.entities = action.payload.entities
        state.responses = action.payload.responses
      })
    },
})

export const { 
  setStatePanel,
  setEditorState
} = DiagramPanelEditorSlice.actions;

export const statePanel = (state) => state.diagramEditor.panelEditor;
export const stateDataPanel = (state) => state.diagramEditor.editorState;
export const entityOptions = (state) => state.diagramEditor.entities;
export const responseOptions = (state) => state.diagramEditor.responses;
export const stateLoading = (state) => state.diagramEditor.loading;

export default DiagramPanelEditorSlice.reducer;