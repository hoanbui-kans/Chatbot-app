import React, { useEffect } from "react";

import ReactFlow, {
  Controls,
  Background,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from 'reactflow';

import CustomEdge from "./edges/ButtonEdge";

// Node Template
import DefaultNode from "./nodes/DefaultNode";
import EmailNode from "./nodes/EmailNode";
import ResponseNode from "./nodes/ResponseNode";
import QuestionNode from "./nodes/QuestionNode";

// Redux 
import { useDispatch, useSelector } from "react-redux";
import { initialNotes, initialEdges, updateNode, updateEdge } from "../../slice/diagram-builder-slice";

import AddNodeModal from "./AddNodeModal";

import 'reactflow/dist/style.css';
import "../style.css";



const proOptions = { hideAttribution: true };

const nodeTypes = {
  'default-template': DefaultNode,
  'email-template': EmailNode,
  'response-template': ResponseNode,
  'question-template': QuestionNode
}

const edgeTypes = {
  buttonEdge: CustomEdge,
};


const Flow = ({ addNode, setAddNode }) => {

      const dispatch = useDispatch();
      const defaultNodes = useSelector(initialNotes);
      const defaultEdges = useSelector(initialEdges);
      
      const reactFlowInstance  = useReactFlow();

      const onNodesChange = (changes) => {
        dispatch(updateNode(applyNodeChanges(changes, defaultNodes)));
      }

      const onEdgesChange = (changes) => {
        dispatch(updateEdge(applyEdgeChanges(changes, defaultEdges)));
      }

      const onConnect = (connection) => {
        dispatch(updateEdge(addEdge({...connection, type: 'buttonEdge'}, defaultEdges)))
      }

      useEffect(() => {
        reactFlowInstance.setNodes(defaultNodes);
      }, [defaultNodes]);


      useEffect(() => {
        reactFlowInstance.setEdges(defaultEdges);
        console.log(defaultEdges);
      }, [defaultEdges]);

      return(
        <div>
          <div style={{width: "100%", height: "80vh"}}>
              <ReactFlow 
                    className="touchdevice-flow"
                    proOptions={proOptions} 
                    attributionPosition="top-right" 
                    defaultNodes={defaultNodes} 
                    defaultEdges={defaultEdges} 
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodesDraggable={true}
                  >
                    <Controls showFitView={true} onInteractiveChange={(e) => console.log(e)}/>
                    <Background gap={10} size={.6} color="#333"/>
                    { addNode && <AddNodeModal setAddNode={setAddNode}/>}
              </ReactFlow>
          </div>
        </div>
      )
} 

export default Flow