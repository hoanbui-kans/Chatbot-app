import React, { memo, useState } from 'react'
import { NodeToolbar } from 'reactflow';
import { useDispatch } from 'react-redux';
import { setStatePanel, setEditorState } from '../../../slice/diagram-builder-slice';
import { Box, Typography, Stack, IconButton } from '@strapi/design-system';
import { Pencil} from '@strapi/icons';

import EntityResponse from './components/entityResponse';

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
              {
                  Array.isArray(data.response) && data.response.length && data.response.map((val, index) => {
                    return(
                      <EntityResponse key={index} data={val}/>
                    )
                  })
              }
            </div>
        </Box>
    </>
  )
}

export default memo(DefaultNode);
