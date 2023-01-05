import React from 'react'
import { IconButton, Box, Typography, Stack } from '@strapi/design-system';
import { Handle, Position, NodeToolbar } from 'reactflow';
import { Trash, Duplicate, Pencil} from '@strapi/icons';
import { useDispatch } from 'react-redux';
import { removeNode } from '../../../slice/diagram-builder-slice';
import EntityResponse from './components/entityResponse';
import EntityInput from './components/entityInput';
import { setStatePanel } from '../../../slice/diagram-builder-slice';
const ResponseNode = ({ id, data }) => {

  const dispatch = useDispatch();

  const HandleOpenUpdateNode = () => {
      dispatch(setStatePanel(true))
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
            <Typography variant="omega" fontWeight="bold">
                { data.title }
            </Typography>
        </Stack>
        <Box>
          <EntityInput />
        </Box>
        <div className="x_node_content">
            <div className="x_node_case">
              {
                  Array.isArray(data.response) && data.response.length && data.response.map((val, index) => {
                    return(
                      <EntityResponse key={index} data={val}/>
                    )
                  })
                }
            </div>   
        </div>
        <Handle type="target" id="email_input" position={Position.Left} />
      </Box>
  )
}

export default ResponseNode