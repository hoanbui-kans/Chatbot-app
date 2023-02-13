import React, { useState, useRef } from 'react'

import { 
    Typography,
    Button, 
    Stack, 
    Grid,
    GridItem,
    ModalLayout,
    ModalBody,
    ModalHeader
} from '@strapi/design-system';

import { ResponseTemplate, QuestionTemplate } from '../models/DiagramModel';
import { Plus, Envelop } from '@strapi/icons'
import { addNode } from '../../../slice/conservation-builder-slice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

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

    const HandleAddNoteToFlow = (template) => {
        const NewNode = template(uuidv4());
        dispatch(addNode(NewNode));
        setAddNode(false)
    }

    return (
        <div className="x_create_node">
           <Button startIcon={<Plus />}></Button> 
            <ModalLayout onClose={() => setAddNode(false)} labelledBy="title">
                <ModalHeader>
                    <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                        Thêm trường dữ liệu
                    </Typography>
                </ModalHeader>
                <ModalBody>
                    <Stack spacing={3}>
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
                                        <GridItem key={index} col={6} s={6} xs={12}>
                                            <Button 
                                                startIcon={<Envelop />} 
                                                onClick={() => HandleAddNoteToFlow(val.template)} 
                                                style={{height: 50, justifyContent: "start"}} 
                                                variant={val.color} fullWidth>
                                                    <Stack horizontal shadow="shadow" gap={3}>
                                                        <Typography>{val.name}</Typography>
                                                    </Stack>
                                            </Button>
                                        </GridItem>
                                    )
                                })
                            }
                        </Grid>
                    </Stack>
                </ModalBody>
            </ModalLayout>
        </div>
    )
}

export default index