import React from 'react'
import { 
    ModalLayout, 
    ModalBody, 
    ModalHeader, 
    ModalFooter, 
    Typography,
    Button, 
    Stack, 
    Badge ,
    Box,
    Grid,
    GridItem,
    Status,
    Divider
} from '@strapi/design-system';

import { addNode } from '../../slice/diagram-builder-slice';
import { EmailTemplate } from './models/DiagramModel';
import { v4 as uuidv4 } from 'uuid';
import Envelop from '@strapi/icons/Envelop';
import { useDispatch } from "react-redux";

import { useReactFlow } from 'reactflow';


const Node = [
    {
        name: 'Email',
        icon: Envelop
    },
    {
        name: 'Email',
        icon: Envelop
    },
    {
        name: 'Email',
        icon: Envelop
    },
    {
        name: 'Email',
        icon: Envelop
    },
    {
        name: 'Email',
        icon: Envelop
    },
    {
        name: 'Email',
        icon: Envelop
    }
]
const NodeModal = ({ setOpenNode }) => {

    const dispatch = useDispatch();
    const reactFlowInstance  = useReactFlow();

    const addMoreNode = () => {
        const newNode = EmailTemplate(uuidv4());
        dispatch(addNode(newNode));
        reactFlowInstance.addNodes(newNode);
    }

    return (
        <>
            <ModalLayout onClose={() => setOpenNode(false)} labelledBy="title">
                <ModalHeader>
                    <div style={{ display: "flex", columnGap: 15, alignItems: "center"}}>
                        <Badge size="M" active>
                            Node
                        </Badge>
                        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                            Add Node
                        </Typography>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Typography variant="beta">Thêm trường dữ liệu cho đoạn hội thoại</Typography>
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
                                        <Button onClick={addMoreNode} style={{height: 65, justifyContent: "start"}} variant='tertiary' borderColor="neutral200" fullWidth>
                                                <Stack horizontal shadow="shadow" gap={3}>
                                                    <Status variant="success" size="S" showBullet={false}>
                                                        <Envelop textColor="success600"/>
                                                    </Status>
                                                    <Typography>Địa chỉ Email</Typography>
                                                </Stack>
                                        </Button>
                                    </GridItem>
                                )
                            })
                        }
                    </Grid>
                    
                </ModalBody>
            </ModalLayout>
        </>
  )
}

export default NodeModal