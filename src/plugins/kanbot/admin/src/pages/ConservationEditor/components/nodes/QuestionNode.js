import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setStatePanel, setEditorState } from '../../../slice/diagram-panelEditor-slice';
import { removeNode } from '../../../slice/diagram-builder-slice';
import { Box, Typography, Stack, IconButton, Status } from '@strapi/design-system';
import { Pencil, Information, Drag, Trash, Duplicate } from '@strapi/icons';
import { TbArrowRampRight2 } from 'react-icons/tb'

const QuestionNode = ({ node }) => {

  const {id, data} = node;
  const [open, setOpen] = useState(false); 
  const dispatch = useDispatch();
  
  const HandleOpenUpdateNode = () => {
    dispatch(setStatePanel(true));
    dispatch(setEditorState(node));
  }

  const onDelete = () => {
    dispatch(removeNode(id));
  }

  return (
    <>
       <Box className="x_node_container">
            <Stack spacing={4} className="x_node_content">
              {
                Array.isArray(data.response) 
                && data.response.length 
                && data.response.map((val, index) => {
                    return (
                      <Stack key={index} spacing={3}>
                          <Stack spacing={2} horizontal>
                            <TbArrowRampRight2 size={16} color='#8d8d8d'/>
                            <Typography variant="pi" fontWeight="bold">Thêm phản hồi</Typography>
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
            </Stack>
        </Box>
    </>
  )
}

export default memo(QuestionNode);
