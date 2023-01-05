import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { Position } from 'reactflow';
import { DefaultTemplate } from "../Composer/components/models/DiagramModel";

const initialState = {
  nodes: [
    DefaultTemplate(uuidv4())
  ],
  edges: [],
  panelEditor: false,
  editorState: false,
};

 
const DiagramBuilderSlice = createSlice({  
    name: 'diagram',
    initialState,
    reducers: {
      // Nodes
      addNode: (state, action) => {
          const newNode = action.payload;
          if(newNode){
            const CurrentNodes = state.nodes;
            state.nodes = [...CurrentNodes, newNode];
          }
      },
      updateNode: (state, action) => {
          state.nodes = action.payload;
      },
      updateNodeData: (state, action) => {
        if(action.payload) {
          const CurrentNodes = state.nodes;
          let newNodes = [];
          CurrentNodes.map((node) => {
            if(node.id == action.payload.id){ 
              node.data = action.payload.data;
            }
            newNodes.push(node);
          });

          state.nodes = newNodes;
        }
      },
      removeNode: (state, action) => {
        if(action.payload) {
          const CurrentNodes = state.nodes;
          let newNodes = CurrentNodes.filter((node) => node.id != action.payload);
          state.nodes = newNodes;
        }
      },
      // Edges
      updateEdge: (state, action) => {
        if(action.payload){
          state.edges = action.payload;
        }
      },
      removeEdge: (state, action) => {
        if(action.payload) {
          const CurrentEdges = state.nodes;
          let newEdges = CurrentEdges.filter((edge) => edge.id != action.payload);
          state.edges = newEdges;
        }
      },
      // Builder
      setStatePanel: (state, action) => {
        state.panelEditor = action.payload
      },
      setEditorState: (state, action) => {
        state.editorState = action.payload
      }
    }
})

export const { 
  setNodes, addNode, updateNode, removeNode, onNodesChange, 
  updateEdge, updateNodeData, removeEdge,
  setStatePanel, setEditorState
} = DiagramBuilderSlice.actions;

export const initialNotes = (state) => state.diagram.nodes;
export const initialEdges = (state) => state.diagram.edges;

export const statePanel = (state) => state.diagram.panelEditor;
export const stateDataPanel = (state) => state.diagram.editorState;

export default DiagramBuilderSlice.reducer;