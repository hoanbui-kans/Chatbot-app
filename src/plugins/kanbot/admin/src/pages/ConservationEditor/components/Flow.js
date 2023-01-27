import React, { useEffect, useState } from "react";
// Node Template
import DefaultNode from "./nodes/DefaultNode";
import ResponseNode from "./nodes/ResponseNode";
import QuestionNode from "./nodes/QuestionNode";
import { Box, Stack, Button, Accordion, AccordionContent, AccordionToggle, IconButton  } from '@strapi/design-system';

import { useDispatch, useSelector } from "react-redux";
import { initialNotes } from "../../slice/conservation-builder-slice";
import { Pencil, Trash, Duplicate, Plus, ArrowDown, ArrowUp} from '@strapi/icons'
import { setEditorState, editorState, updateNode } from "../../slice/conservation-builder-slice";
import AddNodeModal from '../components/AddNodeModal'
import EditorPanel from './EditorPanel';
import { useParams } from 'react-router-dom';

import "../style.css";

const TemplateNode = ({ node }) => {
  switch(node.type){
    case 'default-template': 
      return <DefaultNode node={node}/>;
    break;
    case 'response-template': 
      return <ResponseNode node={node}/>
    break;
    case 'question-template': 
      return <QuestionNode node={node}/>;
    break;
  }
}

const Flow = () => {

    const {app_name, intent } = useParams();
    const dispatch = useDispatch();
    const defaultNodes = useSelector(initialNotes);
    const editNode = useSelector(editorState);
    const [expanded, setExpanded] = useState(true);
    const [addNode, setAddNode] = useState(false);
    const [isloading, setIsLoading] = useState(false);
      // Intent
      
    const [appInfo, setAppInfo] = useState(false);
    const [stateIntent, setStateIntent] = useState('');

    const HandleEditNode = (node) => {
      dispatch(setEditorState(node));
    }

    const HandleDeleteNode = (index) => {
      const newNode = defaultNodes.filter((val, _i) => index != _i);
      dispatch(updateNode(newNode))
    }

    const HandleSortUp = (index) => {
      const newNode = [...defaultNodes];
      const PreIndex = newNode[index - 1];
      const ChangeIndex = newNode[index];
      if(index > 1){
        newNode[index] = PreIndex;
        newNode[index - 1] = ChangeIndex;
      }
      dispatch(updateNode(newNode))
    }

    const HandleSortDown = (index) => {
      const newNode = [...defaultNodes];
      const nextIndex = newNode[index + 1];
      const ChangeIndex = newNode[index];
      if(index > 0 && index < newNode.length - 1){
        newNode[index] = nextIndex;
        newNode[index + 1] = ChangeIndex;
      }
      dispatch(updateNode(newNode))
    }

      return(
        <>
          <Box className="x_conservation_editor_board">
            <Stack className="x_conservation_editor_board" spacing={6}>
                  {
                    defaultNodes.map((val, index) => {
                      const {id, data} = val;
                      return (
                        <Box className="x_node_accordion" key={index}>
                            <Accordion key={index} expanded={true} onToggle={() => setExpanded(val.id)} id={val.id} size="S">
                              <AccordionToggle 
                                  variant="secondary" 
                                  togglePosition="left" 
                                  title={data.title }
                                  description={data.request ?  data.request.title : ""}
                                  action={
                                    <Stack horizontal spacing={1}>
                                      {
                                        val.type != 'default-template' ?
                                        <>
                                          <IconButton noBorder onClick={() => HandleSortUp(index)} label="Lên" icon={<ArrowUp />} />
                                          <IconButton noBorder onClick={() => HandleSortDown(index)} label="Xuống" icon={<ArrowDown />} />
                                          <IconButton noBorder onClick={() => HandleEditNode(val)} label="Sửa" icon={<Pencil />} />
                                          <IconButton noBorder onClick={() => HandleDeleteNode(index)} label="Xóa" icon={<Trash />} />
                                        </> : 
                                          <IconButton noBorder onClick={() => HandleEditNode(val)} label="Sửa" icon={<Pencil />} />
                                      }
                                    </Stack>
                                  } 
                                />
                              <AccordionContent background="neutral0" padding={3}>
                                  <TemplateNode node={val}/>
                              </AccordionContent>
                          </Accordion>
                        </Box>
                        )
                    })
                  }
                  <Box>
                    <Button className="x_add_node_button" onClick={() => setAddNode(true)} startIcon={<Plus />}>
                      Add node
                    </Button>
                  </Box>
              </Stack>
          </Box>
          { addNode ? <AddNodeModal setAddNode={setAddNode}/> : ""}
          { editNode ? 
              <EditorPanel
                stateEditor={editNode} 
                HandleEditNode={HandleEditNode}/> :"" }
        </>
      )
} 

export default Flow