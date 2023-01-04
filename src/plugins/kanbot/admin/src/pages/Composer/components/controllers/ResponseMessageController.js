import React, { useState, useEffect } from 'react'
import {Typography, Stack, Button, Grid, GridItem}  from '@strapi/design-system';

import Message from '@strapi/icons/Message';
import PicturePlus from '@strapi/icons/PicturePlus';
import Puzzle from '@strapi/icons/Puzzle';

import MessagesController from './messagesController';
import ChoicesController from './choicesController';
import TemplateController from './templateController';

const ResponseMessageController = ({ data }) => {

    const [value, setValue] = useState({
        type: "",
        data: data
    });

    const HandleSetData = (data) => {
        setValue({ ...value, data: data})
    }

    switch (value.type) {
        case 'messages':
            return(
                <>
                    <MessagesController setData={HandleSetData}/>
                </>
            )
            break;

        case 'choices':
            return(
                <>
                    <ChoicesController setData={HandleSetData}/>
                </>
            )
            break;    

        case 'templates':
            return(
                <>
                    <TemplateController setData={HandleSetData}/>
                </>
            )
            break;      

        default:
            break;
    }

    return (
        <div>
            <Grid gap={3}>
                <GridItem col={4}>
                    <Button 
                        style={{height: 140}} 
                        fullWidth size="L" 
                        variant="success-light" 
                        onClick={() => setValue({
                            type: "messages",
                            data: ""
                        })}>
                            <Stack spacing={3}>
                                    <span style={{height: 50, width:50, borderRadius: '50%'}} background="neutral200">
                                        <Message style={{ width: 50, height: 50}}/>
                                    </span>
                                    <Typography>Tin nhắn</Typography>
                            </Stack>
                    </Button>
                    </GridItem>
                    <GridItem col={4}>
                    <Button 
                        style={{height: 140}} 
                        fullWidth 
                        size="L" 
                        variant="secondary"  
                        onClick={() => setValue({
                            type: "choices",
                            data: ""
                        })}>
                            <Stack spacing={3}>
                                    <span style={{height: 50, width:50, borderRadius: '50%'}} background="neutral200">
                                        <Puzzle style={{ width: 50, height: 50}}/>
                                    </span>
                                    <Typography>Câu trả lời nhanh</Typography>
                            </Stack>
                    </Button>
                    </GridItem>
                    <GridItem col={4}>
                    <Button 
                        style={{height: 140}} 
                        fullWidth size="L" 
                        variant="danger-light"
                        onClick={() => setValue({
                            type: "templates",
                            data: ""
                        })}>
                            <Stack spacing={3}>
                                    <span style={{height: 50, width:50, borderRadius: '50%'}} background="neutral200">
                                        <PicturePlus style={{ width: 50, height: 50}}/>
                                    </span>
                                    <Typography>Mẫu</Typography>
                            </Stack>
                    </Button>
                </GridItem>
            </Grid>
        </div>
    )
    }

export default ResponseMessageController