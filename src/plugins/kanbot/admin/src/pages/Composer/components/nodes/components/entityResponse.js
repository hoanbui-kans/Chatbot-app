import React from 'react'
import { Box, Typography,Status,Stack, IconButton } from '@strapi/design-system';
import { Handle, Position } from 'reactflow';
import { Pencil } from '@strapi/icons'
import { TbArrowRampRight2 } from 'react-icons/tb'

const EntityResponse = ({ data }) => {
    return (
        <>
            <Box>
                <Status variant={data.type} showBullet={false} className="x_node_case_item">
                    <Stack horizontal spacing={3} justifyContent="space-between">
                    <Stack horizontal spacing={3}>
                        <TbArrowRampRight2 size={16} color='#8d8d8d'/>
                        <Typography>{ data.title ? data.title : "Mẫu trả lời tin nhắn"}</Typography>
                    </Stack>
                    </Stack>
                    <Handle type="source" position={Position.Bottom} id="default_check"/>
                </Status>
            </Box>
        </>
    )
}

export default EntityResponse