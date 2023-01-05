import React, { useEffect, useRef } from "react";

import { v4 as uuidv4 } from 'uuid';

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

// Redux 
import { useDispatch, useSelector } from "react-redux";
import { initialNotes, initialEdges, addNode, updateNode, updateEdge } from "../../slice/diagram-builder-slice";
import { useDrop } from 'react-dnd';
import EditorPanel from './EditorPanel';

import 'reactflow/dist/style.css';
import "../style.css";


const proOptions = { hideAttribution: true };

const nodeTypes = {
  'default-template': DefaultNode,
  'email-template': EmailNode,
  'response-template': ResponseNode
}

const edgeTypes = {
  buttonEdge: CustomEdge,
};


const Flow = () => {

      const dispatch = useDispatch();
      const defaultNodes = useSelector(initialNotes);
      const defaultEdges = useSelector(initialEdges);
      
      const reactFlowInstance  = useReactFlow();

      const accept = 'diagramComponent';

      const ref = useRef();
      const reactFlowWrapper = useRef(null);

      const [collectedProps, drop] = useDrop(() => ({
        accept,
        drop: (item, monitor) => {
          let Node = item.node;

          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

          const offset = monitor.getSourceClientOffset();
            if(offset) {
              Node = {...Node, id: uuidv4(), position: {
                x: offset.x - reactFlowBounds.left,
                y: offset.y - reactFlowBounds.top,
              }};
            }
          dispatch(addNode(Node));
        }
      }))

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
    }, [defaultEdges]);

    return(
      <div>
        <div ref={reactFlowWrapper} style={{width: "100%", height: "80vh"}}>
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
                fitView >
                  <Controls />
              <Background gap={10} size={.6} color="#333"/>
              <EditorPanel />
            </ReactFlow>
        </div>
      </div>
    )
} 

export default Flow