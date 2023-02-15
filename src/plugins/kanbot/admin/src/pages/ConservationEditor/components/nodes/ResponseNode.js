import React, { useState } from 'react'
import { Box, Typography, Stack, Status, Select, Option, IconButton, Icon, Divider, Flex  } from '@strapi/design-system';
import { useDispatch } from 'react-redux';
import { removeNode } from '../../../slice/diagram-builder-slice';
import { setStatePanel, setEditorState, setEditorMessage } from '../../../slice/conservation-builder-slice';
import { TbArrowRampRight2 } from 'react-icons/tb'
import { Drag, Pencil } from '@strapi/icons';
import { Entities } from '../models/EntitiesModel';
import { Grid, GridItem } from '@strapi/design-system';

const ResponseNode = ({ node }) => {

  const { id, data } = node;

  const [entity, setEntity] = useState("");

  const dispatch = useDispatch();

  const HandleOpenUpdateNode = () => {
      dispatch(setStatePanel(true));
      dispatch(setEditorState(node));
  }
  
  const onDelete = () => {
    dispatch(removeNode(id));
  }

  const handleChangeEntity = (entity) => {
    setEntity(entity)
  }

  const hanleChangeMessage = (e) => {
    dispatch(setEditorMessage(e));
  }

  const ResposeType = ({ data }) => {
    return (
      <Stack spacing={3} padding={3} background="neutral0" marginBottom={3} hasRadius borderColor="neutral200">
          <Stack horizontal spacing={3}>
              <TbArrowRampRight2 size={18} color='#8d8d8d'/>
              <Typography variant="pi" fontWeight="semiBold">{data.title}</Typography>
          </Stack>
          <Status variant={data.color ? data.color : "alternative"} showBullet={false} className="x_node_case_item">
                <Stack horizontal spacing={3} justifyContent="space-between">
                    <Stack horizontal spacing={3} justifyContent="space-between">
                      <Icon width={`${1}rem`} height={`${1}rem`} color={`${data.color}500`} as={Drag} />
                      <Typography>{ data.title ? data.title : "Mẫu trả lời tin nhắn"}</Typography>
                    </Stack>
                    <IconButton size="S" onClick={() => { hanleChangeMessage(data) }} label="Edit" icon={<Pencil />} />
              </Stack>
          </Status>
      </Stack>
    )
  }

  return (
      <Box className="x_node_container">
        <Stack spacing={3}>
            <Stack spacing={3} className="x_node_content">
                <Stack padding={3} spacing={3} className="x_node_case">
                    <Typography variant="omega" fontWeight="semiBold">Đoạn hội thoại</Typography>
                    <ResposeType data={data.request} />
                    <Typography variant="omega" fontWeight="semiBold">Kiểu dữ liệu cần xác thực</Typography>
                    <Select value={entity} onChange={handleChangeEntity} placeholder="Lựa chọn kiểu dữ liệu xác thực">
                      { Entities.map((val) => <Option key={val.id} value={val.name}>{val.label}</Option>) }
                    </Select>
                      {
                        entity &&
                        <Grid gap={5}>
                          <GridItem col={6}>
                            <ResposeType data={data.success} />
                          </GridItem>
                          <GridItem col={6}>
                            <ResposeType data={data.error} />
                          </GridItem>
                        </Grid>
                    }
                </Stack>   
            </Stack>
          </Stack>
      </Box>
  )
}

export default ResponseNode