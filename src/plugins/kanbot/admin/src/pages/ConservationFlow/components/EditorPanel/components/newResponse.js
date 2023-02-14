import React, { useState, useEffect } from 'react'
import { Typography, Stack, Button, Grid, GridItem, Box }  from '@strapi/design-system';

import MessagesController from '../templates/messagesController';
import ChoicesController from '../templates/choicesController';
import TemplateController from '../templates/templateController';

import { Message, Puzzle, PicturePlus} from '@strapi/icons'

const NewResponse = ({ setCreateResponse }) => {

    const [type, setType] = useState(false);

    useEffect(() => {
        setCreateResponse(type)
    },[type])

    switch (type) {
        case 'messages':
            return(
                <>
                    <MessagesController goBack={() => setType(false)}/>
                </>
            )
            break;

        case 'choices':
            return(
                <>
                    <ChoicesController goBack={() => setType(false)}/>
                </>
            )
            break;    

        case 'templates':
            return(
                <>
                    <TemplateController goBack={() => setType(false)}/>
                </>
            )
            break;      

        default:
            break;
    }

    return (
        <>
            <Stack spacing={6}>
                <Box>
                    <Typography fontWeight="bold">Tạo mẫu câu trả lời</Typography>
                </Box>
                <Box>
                    <Grid gap={3}>
                        <GridItem col={4}>
                            <Button 
                                style={{height: 110}} 
                                fullWidth size="L" 
                                variant="success-light" 
                                onClick={() => setType("messages")}>
                                <Stack spacing={2}>
                                        <span style={{height: 32, width:32, borderRadius: '50%'}} background="neutral200">
                                            <Message style={{ width: 28, height: 28}}/>
                                        </span>
                                        <Typography>Tin nhắn</Typography>
                                </Stack>
                            </Button>
                        </GridItem>
                        <GridItem col={4}>
                            <Button 
                                style={{height: 110}} 
                                fullWidth 
                                size="L" 
                                variant="secondary"  
                                onClick={() => type("choices")}>
                                <Stack spacing={2}>
                                        <span style={{height: 32, width:32, borderRadius: '50%'}} background="neutral200">
                                            <Puzzle style={{ width: 28, height: 28}}/>
                                        </span>
                                        <Typography>Câu trả lời nhanh</Typography>
                                </Stack>
                            </Button>
                        </GridItem>
                        <GridItem col={4}>
                            <Button 
                                style={{height: 110}} 
                                fullWidth size="L" 
                                variant="danger-light"
                                onClick={() => setType("templates")}>
                                    <Stack spacing={2}>
                                            <span style={{height: 32, width:32, borderRadius: '50%'}} background="neutral200">
                                                <PicturePlus style={{ width: 28, height: 28}}/>
                                            </span>
                                            <Typography>Mẫu</Typography>
                                    </Stack>
                            </Button>
                        </GridItem>
                    </Grid>
                </Box>
            </Stack>
        </>
  )
}

export default NewResponse