import React, { memo, useState } from 'react'
import { NodeToolbar, Handle, Position } from 'reactflow';
import { useDispatch } from 'react-redux';
import { setStatePanel, setEditorState } from '../../../slice/diagram-panelEditor-slice';
import { Box, Typography, Stack, IconButton, Status } from '@strapi/design-system';
import { Pencil} from '@strapi/icons';
import { TbArrowRampRight2 } from 'react-icons/tb'
import EntityResponse from './components/entityResponse';
import CreateButton from './components/createButton';

const DefaultNode = (node) => {
  const {id, data} = node;
  const [open, setOpen] = useState(false); 

  const dispatch = useDispatch();

  const HandleOpenUpdateNode = () => {
    dispatch(setStatePanel(true));
    dispatch(setEditorState(node));
  }

  return (
    <>
       <Box padding={4} hasRadius background="neutral0" borderColor="neutral200" className="x_node_container">
          <NodeToolbar className="x_node_toolbar" isVisible="true" position="right">
              <IconButton 
                onClick={HandleOpenUpdateNode}
                icon={<Pencil />}
              />
            </NodeToolbar>
            <Stack background="neutral0" padding={1} hasRadius spacing={4} horizontal marginBottom={2}>
                <Typography variant="omega" fontWeight="bold">
                    { data.title }
                </Typography>
            </Stack>
            <div className="x_node_content">
              <Box>
                  <Status variant={'success'} showBullet={false} className="x_node_case_item">
                      <Stack horizontal spacing={3} justifyContent="space-between">
                      <Stack horizontal spacing={3}>
                          <TbArrowRampRight2 size={16} color='#8d8d8d'/>
                          <Typography>{ data.title ? data.title : "Mẫu trả lời tin nhắn"}</Typography>
                      </Stack>
                      </Stack>
                  </Status>
              </Box>
              <Handle type="source" position={Position.Right} id={`source-${id}`}/>
            </div>
           {
            data.latest &&  <CreateButton />
           }
        </Box>
    </>
  )
}

export default memo(DefaultNode);
