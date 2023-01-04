import React, { memo, useState } from 'react'
import { Handle, Position, NodeToolbar } from 'reactflow';
import { useDispatch } from 'react-redux';
import { updateNodeData, removeNode, statePanel, setStatePanel } from '../../../slice/diagram-builder-slice';
import { IoRocketOutline, IoPencil } from "react-icons/io5";

import Pencil from '@strapi/icons/Pencil';
import { 
  IconButton, 
  Button,
  Box, 
  Typography,
  Status,
  Stack,
} from '@strapi/design-system';

import { TbArrowRampRight2 } from 'react-icons/tb'

const DefaultNode = (node) => {

  const {id, data} = node
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const HandleOpenUpdateNode = () => {
    dispatch(setStatePanel({
      open: true,
      state: node
    }))
  }

  return (
    <>
       <Box padding={4} hasRadius background="neutral0" borderColor="neutral200" className="x_node_container">
          <NodeToolbar className="x_node_toolbar" isVisible="true" position="right">

            </NodeToolbar>
            <Stack background="neutral0" padding={1} hasRadius spacing={4} horizontal marginBottom={2}>
                <Typography variant="omega" fontWeight="bold">
                    { data.title }
                </Typography>
            </Stack>
            <div className="x_node_content">
                <div className="x_node_case">
                    <Status fullWidth variant="success" className="x_node_case_item" onClick={() => setOpen(!open)}>
                        <span>Kiểm tra dữ liệu</span>
                    </Status>
                    <Status variant="tertiary" showBullet={false} className="x_node_case_item" onClick={HandleOpenUpdateNode}>
                          <span><TbArrowRampRight2 color='#8d8d8d'/> Mẫu trả lời tin nhắn</span>
                          <Handle type="source" position={Position.Right} id="default_check" />
                    </Status>
                </div>   
            </div>
        </Box>
    </>
  )
}

export default memo(DefaultNode);
