import React, { memo, useState } from 'react'
import { NodeToolbar, Handle, Position } from 'reactflow';
import { useDispatch } from 'react-redux';
import { setStatePanel, setEditorState } from '../../../slice/diagram-panelEditor-slice';
import { Box, Typography, Stack, IconButton, Status } from '@strapi/design-system';
import { Pencil, Information, Drag } from '@strapi/icons';
import { TbArrowRampRight2 } from 'react-icons/tb'
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
                <Status variant="primary" size="S" showBullet={false}> <Information /></Status>
                <Typography variant="omega" fontWeight="bold">
                    { data.title }
                </Typography>
            </Stack>
            <Stack spacing={4} className="x_node_content">
              {
                Array.isArray(data.response) 
                && data.response.length 
                && data.response.map((val, index) => {
                    return (
                      <Stack spacing={3} padding={2} borderColor="neutral200" hasRadius>
                          <Stack spacing={2} horizontal>
                            <TbArrowRampRight2 size={16} color='#8d8d8d'/>
                            <Typography variant="pi" fontWeight="bold">
                              Xác thực { val.type == 'success' ? "hoàn tất" : "thất bại"}</Typography>
                          </Stack>
                          <Status variant={val.type ? val.type : "secondary"} showBullet={false} className="x_node_case_item">
                              <Stack horizontal spacing={3} justifyContent="space-between">
                                <Drag size={16} color='#8d8d8d'/>
                                <Typography>{ val.title ? val.title : "Mẫu trả lời tin nhắn"}</Typography>
                              </Stack>
                          </Status>
                      </Stack>
                  )
                })
              }
              <Handle type="source" position={Position.Right} id={`source-${id}`}/>
            </Stack>
           {
            data.latest &&  <CreateButton />
           }
        </Box>
    </>
  )
}

export default memo(DefaultNode);
