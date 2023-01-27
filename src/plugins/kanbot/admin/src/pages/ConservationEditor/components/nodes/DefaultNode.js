import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Box, Typography, Stack, IconButton, Status } from '@strapi/design-system';
import { Pencil, Information, Drag } from '@strapi/icons';
import { TbArrowRampRight2 } from 'react-icons/tb'
import { setEditorState } from '../../../slice/conservation-builder-slice';

const DefaultNode = ({ node }) => {

  const {id, data} = node;
  const dispatch = useDispatch();

  return (
    <>
       <Box className="x_node_container">
            <Stack spacing={4} className="x_node_content">
              {
                Array.isArray(data.response) 
                && data.response.length 
                ? data.response.map((val) => {
                    return (
                      <Stack spacing={3} padding={2} hasRadius key={val.id}>
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
                }) : ""
              }
            </Stack>
        </Box>
    </>
  )
}

export default memo(DefaultNode);
