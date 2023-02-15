import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { DefaultTemplate } from "../ConservationEditor/components/models/DiagramModel";

const initialState = {
  nodes: [
    DefaultTemplate(uuidv4()) 
  ],
  editorState: null,
  editorMessage: null
};

const ConservationBuilder = createSlice({  
    name: 'diagram',
    initialState,
    reducers: {
      // Nodes
      addNode: (state, action) => {
          const newNode = action.payload;
          state.nodes = [...state.nodes, newNode];
      },

      updateNode: (state, action) => {
          state.nodes = action.payload;
      },

      updateNodeData: (state, action) => {
        if(action.payload) {
          const CurrentNodes = state.nodes;
          let newNodes = [];

          CurrentNodes.map((node) => {
            let NodeData = {...node}
            if(node.id == action.payload.id){ 
              NodeData.data = action.payload.data;
            }
            newNodes.push(NodeData);
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

      setEditorState: (state, action) => {
        state.editorState = action.payload
      },

      setEditorMessage: (state, action) => {
        state.editorMessage = action.payload;
      },
      
      updateEditorMessage: (state, action) => {
        if(action.payload) {
          const CurrentNodes = state.nodes;
          let newNodes = [];
          CurrentNodes.map((node) => {
            let NodeData = {...node}
            if(node.id == action.payload.id){ 
              NodeData.data = action.payload.data;
            }
            newNodes.push(NodeData);
          });

          state.nodes = newNodes;
        }
      }

    },
})

export const { 
  addNode, 
  updateNode, 
  updateNodeData,
  removeNode, 
  setEditorState,
  setEditorMessage
} = ConservationBuilder.actions;

export const initialNotes = (state) => state.conservation.nodes;
export const editorState = (state) => state.conservation.editorState;
export const editorMessage = (state) => state.conservation.editorMessage;

export default ConservationBuilder.reducer;