import React, { useState, useRef } from 'react'

import { 
    Typography,
    Button, 
    Stack, 
    IconButton ,
    Box,
    Grid,
    GridItem,
    Divider,
    Popover 
} from '@strapi/design-system';

import { useDispatch } from "react-redux";
import { useReactFlow } from 'reactflow';
import Envelop from '@strapi/icons/Envelop';
import { ResponseTemplate } from '../../models/DiagramModel';
import { Plus, Cross } from '@strapi/icons'
import { v4 as uuidv4 } from 'uuid';
import { addNode } from '../../../../slice/diagram-builder-slice';

const Node = [
    {
        name: 'Xác thực dữ liệu',
        icon: Envelop,
        color: 'success-light'
    },
    {
        name: 'Hành động',
        icon: Envelop,
        color: 'danger-light'
    },
    {
        name: 'Đợi',
        icon: Envelop,
        color: 'secondary'
    },
    {
        name: 'Hành động',
        icon: Envelop,
        color: 'danger-light'
    }
]

const CreateButton = () => {

    const [showPicker, setShowPicker] = useState(false);

    const dispatch = useDispatch();
    const reactFlowInstance  = useReactFlow();

    const nodes = reactFlowInstance.getNodes();


    const addMoreNode = () => {
        const newNode = ResponseTemplate(uuidv4());
        const lastNode = nodes[nodes.length - 1];
        let top = lastNode.position.y + lastNode.height;
        let right = lastNode.position.x + lastNode.width; 
        newNode.position = { x: right + 150, y: top };
        dispatch(addNode(newNode));
        reactFlowInstance.addNodes(newNode);
    }

    const [visible, setVisible] = useState(false);
    const buttonRef = useRef();

    return (
        <div className="x_create_node">
           <Button ref={buttonRef} onClick={() => setVisible(s => !s)} startIcon={<Plus />}>Thêm trường dữ liệu</Button> 
            {
                visible && 
                    <Popover centered source={buttonRef} spacing={16}>
                        <Box background="neutral0" padding={3} className="x_picker_box">
                        <Stack horizontal justifyContent="space-between">
                            <Typography fontWeight="bold">Thêm trường dữ liệu cho đoạn hội thoại</Typography>
                            <IconButton onClick={() => setVisible(s => !s)} label="Đóng" icon={<Cross/>} />
                        </Stack>
                        <Box paddingTop={4} paddingBottom={6}>
                            <Divider />
                        </Box>
                        <Grid 
                            gap={{
                                desktop: 5,
                                tablet: 2,
                                mobile: 1
                            }}>
                            {
                                Node.map((val, index) => {
                                    return (
                                        <GridItem col={6} s={6} xs={12}>
                                            <Button startIcon={<Envelop />} onClick={addMoreNode} style={{height: 50, justifyContent: "start"}} variant={val.color} fullWidth>
                                                    <Stack horizontal shadow="shadow" gap={3}>
                                                        <Typography>{val.name}</Typography>
                                                    </Stack>
                                            </Button>
                                        </GridItem>
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                </Popover>
            }
        </div>
    )
}

export default CreateButton