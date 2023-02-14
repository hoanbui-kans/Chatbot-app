import React from 'react'
import { Box, Typography,Status,Stack, IconButton } from '@strapi/design-system';
import { Handle, Position } from 'reactflow';
import { TbArrowRampRight2 } from 'react-icons/tb'

const EntityInput = ({data}) => {
    return (
        <Box>
            <Box variant='' showBullet={false} className="x_node_case_item">
                <Stack horizontal spacing={3}>
                    <TbArrowRampRight2 size={16} color='#8d8d8d'/>
                    <Typography>Người dùng đề cập</Typography>
                </Stack>
            </Box>
        </Box>
  )
}

export default EntityInput