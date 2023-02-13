import React, { useState, memo } from 'react'
import { IconButton, Input, Button, Box, Status, Typography, Stack } from '@strapi/design-system'
import { IoCloseOutline, IoDuplicateOutline, IoTrashOutline, IoMailOutline, IoFolderOpenOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { updateNodeData, removeNode } from '../../../slice/diagram-builder-slice';

import Pencil from '@strapi/icons/Pencil';
import Trash from '@strapi/icons/Trash';
import Duplicate from '@strapi/icons/Duplicate';
import ArrowRight from '@strapi/icons/ArrowRight';

import { TbArrowRampRight2 } from 'react-icons/tb';

const EmailNode = ({id, data}) => {

  const dispatch = useDispatch();
  
  const onDelete = () => {
    dispatch(removeNode(id));
  }

  return (
    <Box padding={4} hasRadius background="neutral0" className="x_node_container">
        <Stack background="neutral0" padding={1} hasRadius spacing={4} horizontal marginBottom={2}>
            <Typography variant="omega" fontWeight="bold">
                { data.title }
            </Typography>
        </Stack>
        <div className="x_node_content">
            <div className="x_node_case">
                <Status variant="danger" className="x_node_case_item">
                    <span>Fail</span>
                </Status>
                <Status variant="tertiary" showBullet={false} className="x_node_case_item">
                        <span><TbArrowRampRight2 color='#8d8d8d'/> Mẫu trả lời tin nhắn</span>
                        <Handle type="source" position={Position.Right} id="default_check" className="x_danger_port" />
                </Status>
                <Status variant="success" className="x_node_case_item">
                    <span>Success</span>
                </Status>
                <Status variant="tertiary" showBullet={false} className="x_node_case_item">
                        <span><TbArrowRampRight2 color='#8d8d8d'/> Mẫu trả lời tin nhắn</span>
                        <Handle type="source" position={Position.Right} id="default_check" className="x_success_port"/>
                </Status>
            </div>   
        </div>
        <Handle type="target" position={Position.Left} id={node.id}/>
    </Box>
  )
}

export default memo(EmailNode);