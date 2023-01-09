import React from 'react'
import { IconButton, Box, Typography, Stack, Button, Status, Divider  } from '@strapi/design-system';
import { Handle, Position, NodeToolbar } from 'reactflow';
import { Trash, Duplicate, Pencil} from '@strapi/icons';
import { useDispatch } from 'react-redux';
import { removeNode } from '../../../slice/diagram-builder-slice';
import EntityResponse from './components/entityResponse';
import EntityInput from './components/entityInput';
import { setStatePanel, setEditorState } from '../../../slice/diagram-panelEditor-slice';
import CreateButton from './components/createButton';
import { TbArrowRampRight2 } from 'react-icons/tb'
import { Message, Drag } from '@strapi/icons';

const ResponseNode = (node) => {
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
            <Status variant="success" size="S" showBullet={false}> <Message /></Status>
            <Typography variant="omega" fontWeight="bold">
                { data.title }
            </Typography>
        </Stack>
        <Box marginBottom={4}>
          <Divider />
        </Box>
        <Stack spacing={3}>
            {/* Entity */}
            {
              data.request && 
                <Stack padding={2} borderColor="neutral200" hasRadius spacing={3}>
                    <Stack horizontal spacing={3}>
                        <TbArrowRampRight2 size={16} color='#8d8d8d'/>
                        <Typography variant="pi" fontWeight="bold">Người dùng đề cập</Typography>
                    </Stack>
                    <Status variant={'warning'} showBullet={false} className="x_node_case_item">
                        <Stack horizontal spacing={3} justifyContent="space-between">
                          <Drag size={16} color='#8d8d8d'/>
                          <Typography variant="pi" fontWeight="bold">
                            { data.request.title ? data.request.title : "Người dùng đề cập" }
                          </Typography>
                        </Stack>  
                    </Status>
                </Stack>
            }
            {/* Response */}
            <Stack spacing={3} className="x_node_content">
                <Stack spacing={3} className="x_node_case">
                {
                    Array.isArray(data.response) 
                    && data.response.length 
                    && data.response.map((val, index) => {
                        return (
                          <Stack spacing={3} padding={2} borderColor="neutral200" hasRadius>
                            <Stack horizontal spacing={3}>
                                <TbArrowRampRight2 size={16} color='#8d8d8d'/>
                                <Typography variant="pi" fontWeight="bold">Xác thực { val.type == 'success' ? "hoàn tất" : "thất bại"}</Typography>
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
            </Stack>
        </Stack>
        <Handle type="target" position={Position.Left} id={`target-${id}`}/>
        <Handle type="source" position={Position.Right} id={`source-${id}`}/>
        {
          data.latest &&  <CreateButton />
        }
      </Box>
  )
}

export default ResponseNode