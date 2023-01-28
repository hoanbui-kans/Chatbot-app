import React from 'react'
import { Box, Typography, Stack, Status  } from '@strapi/design-system';
import { useDispatch } from 'react-redux';
import { removeNode } from '../../../slice/diagram-builder-slice';
import { setStatePanel, setEditorState } from '../../../slice/diagram-panelEditor-slice';
import { TbArrowRampRight2 } from 'react-icons/tb'
import { Drag } from '@strapi/icons';

const ResponseNode = ({node}) => {
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
      <Box className="x_node_container">
        <Stack spacing={3}>
            <Stack spacing={3} className="x_node_content">
                <Stack spacing={1} className="x_node_case">
                {
                    Array.isArray(data.response) 
                    && data.response.length 
                    ? data.response.map((val, index) => {
                        return (
                          <Stack key={index} spacing={3}>
                            <Stack horizontal spacing={3}>
                                <TbArrowRampRight2 size={16} color='#8d8d8d'/>
                                <Typography variant="pi" fontWeight="bold">{ val.type == 'success' ? "Hỏi người dùng" : "Xác thực thất bại"}</Typography>
                            </Stack>
                            <Status variant={val.type ? val.type : "alternative"} showBullet={false} className="x_node_case_item">
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
            </Stack>
        </Stack>
      </Box>
  )
}

export default ResponseNode