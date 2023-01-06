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
          const PrevNode =  state.nodes[state.nodes.length - 1];
          const newNode = action.payload;
          state.nodes = [...state.nodes, newNode];
          const newEdge = { id: `${PrevNode.id}-${PrevNode.id}`, source: `${PrevNode.id}`, target: `${newNode.id}` };
          state.edges = [...state.edges, newEdge];
      },

      updateNode: (state, action) => {
          let NewNode = [];
          const StateNode = [...action.payload];
          if(StateNode){
            StateNode.map((val, index) => {
              let CurrentNodes = { ...val };
              if(index == StateNode.length - 1){
                CurrentNodes = { ...CurrentNodes, data: { ...CurrentNodes.data, latest: true}};
              } else {
                CurrentNodes = { ...CurrentNodes, data: { ...CurrentNodes.data, latest: false}};
              }
              NewNode.push(CurrentNodes);
            })
          }
          state.nodes = NewNode;
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
          const NewNode = CurrentNodes.filter((node, index) => node.id != action.payload);
          state.nodes = NewNode;
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
          const CurrentEdges = state.edges;
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
    },
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