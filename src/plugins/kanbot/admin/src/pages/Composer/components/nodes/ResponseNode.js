import React from 'react'
import { IconButton, Box, Typography, Stack, Button, Status, Divider  } from '@strapi/design-system';
import { Handle, Position, NodeToolbar } from 'reactflow';
import { Trash, Duplicate, Pencil} from '@strapi/icons';
import { useDispatch } from 'react-redux';
import { removeNode } from '../../../slice/diagram-builder-slice';
import EntityResponse from './components/entityResponse';
import EntityInput from './components/entityInput';
import { setStatePanel, setEditorState } from '../../../slice/diagram-builder-slice';
import CreateButton from './components/createButton';
import { TbArrowRampRight2 } from 'react-icons/tb'
import Message from '@strapi/icons/Message';

const ResponseNode = (node) => {
  const { id, data } = node;
  const dispatch = useDispatch();

  const HandleOpenUpdateNode = () => {
      dispatch(setStatePanel(true));
      dispatch(setEditorState(node));
  }
  
  const onDelete = () => {
    dispatch(removeNode(id));
  }

  return (
      <Box padding={4} hasRadius background="neutral0" borderColor="neutral200" className="x_node_container">
          <NodeToolbar className="x_node_toolbar" isVisible={'true'} position={'right'}>
              <IconButton 
                onClick={HandleOpenUpdateNode}
                icon={<Pencil />}
              />
              <IconButton 
                icon={<Duplicate />}
              />
              <IconButton 
                onClick={onDelete} 
                icon={<Trash />}
              />
        </NodeToolbar>
        <Stack background="neutral0" padding={1} hasRadius spacing={4} horizontal marginBottom={2}>
            <Status variant="success" size="S" showBullet={false}> <Message /></Status>
            <Typography variant="omega" fontWeight="bold">
                { data.title }
            </Typography>
        </Stack>
        <Box marginBottom={4}>
          <Divider />
        </Box>
        <Box marginBottom={3}>
          <EntityInput />
        </Box>
        <div className="x_node_content">
            <Stack spacing={3} className="x_node_case">
              {
                  Array.isArray(data.response) && data.response.length && data.response.map((val, index) => {
                    return(
                      <Box key={index}>
                          <Status variant={data.type} showBullet={false} className="x_node_case_item">
                              <Stack horizontal spacing={3} justifyContent="space-between">
                                  <Stack horizontal spacing={3}>
                                      <TbArrowRampRight2 size={16} color='#8d8d8d'/>
                                      <Typography>{ data.title ? data.title : "Mẫu trả lời tin nhắn"}</Typography>
                                  </Stack>
                              </Stack>
                          </Status>
                      </Box>
                    )
                  })
                }
            </Stack>   
        </div>
        <Handle type="target" position={Position.Left} id={`target-${id}`}/>
        <Handle type="source" position={Position.Right} id={`source-${id}`}/>
        {
          data.latest &&  <CreateButton />
        }
      </Box>
  )
}

export default ResponseNode