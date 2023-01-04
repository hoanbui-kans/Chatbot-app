import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { Position } from 'reactflow';

const initialState = {
  nodes: [
    {
      id: uuidv4(),
      type: 'default-template',
      // you can also pass a React component as a label
      data: { 
        title: 'Mặc định',
        value: 'demo' 
      },
      position: { x: 150, y: 125 },
      targetPosition: Position.Left,
    }
  ],
  edges: [],
  panelEditor: {
    open: false,
    state: false
  },
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
      setStatePanel:(state, action) => {
        state.panelEditor = action.payload
      }
    }
})

export const { 
  setNodes, addNode, updateNode, removeNode, onNodesChange, 
  updateEdge, updateNodeData, removeEdge,
  setStatePanel
} = DiagramBuilderSlice.actions;

export const initialNotes = (state) => state.diagram.nodes;
export const initialEdges = (state) => state.diagram.edges;
export const statePanel = (state) => state.diagram.panelEditor;
export default DiagramBuilderSlice.reducer;