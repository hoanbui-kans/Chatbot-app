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
    Popover ,
    ModalLayout,
    ModalBody,
    ModalFooter,
    ModalHeader
} from '@strapi/design-system';

import { useDispatch } from "react-redux";
import { useReactFlow } from 'reactflow';
import { ResponseTemplate, QuestionTemplate } from '../models/DiagramModel';
import { Plus, Cross, Envelop } from '@strapi/icons'
import { v4 as uuidv4 } from 'uuid';
import { addNode } from '../../../slice/diagram-builder-slice';

const Node = [
    {
        name: 'Mẫu câu hỏi',
        icon: Envelop,
        color: 'success-light',
        template: QuestionTemplate
    },
    {
        name: 'Xác thực dữ liệu',
        icon: Envelop,
        color: 'success-light',
        template: ResponseTemplate
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

const index = ({ setAddNode }) => {

    const dispatch = useDispatch();
    const reactFlowInstance  = useReactFlow();

    const nodes = reactFlowInstance.getNodes();

    const addMoreNode = (template) => {
        const newNode = template(uuidv4());
        const lastNode = nodes[nodes.length - 1];
        let top = lastNode.position.y + lastNode.height;
        let right = lastNode.position.x + lastNode.width; 
        newNode.position = { x: right + 150, y: top };
        dispatch(addNode(newNode));
        reactFlowInstance.addNodes(newNode);
        setAddNode(false);
    }

    const buttonRef = useRef();

    return (
        <div className="x_create_node">
           <Button ref={buttonRef} onClick={() => setAddNode(false)} startIcon={<Plus />}></Button> 
            <ModalLayout onClose={() => setAddNode(false)} labelledBy="title">
                <ModalHeader>
                    <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                        Thêm trường dữ liệu
                    </Typography>
                </ModalHeader>
                <ModalBody>
                    <Typography fontWeight="bold">Thêm trường dữ liệu cho đoạn hội thoại</Typography>
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
                                            <Button startIcon={<Envelop />} onClick={() => addMoreNode(val.template)} style={{height: 50, justifyContent: "start"}} variant={val.color} fullWidth>
                                                    <Stack horizontal shadow="shadow" gap={3}>
                                                        <Typography>{val.name}</Typography>
                                                    </Stack>
                                            </Button>
                                        </GridItem>
                                    )
                                })
                            }
                        </Grid>
                </ModalBody>
            </ModalLayout>
        </div>
    )
}

export default index