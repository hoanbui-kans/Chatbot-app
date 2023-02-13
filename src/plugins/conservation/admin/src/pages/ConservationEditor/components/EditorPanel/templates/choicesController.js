import React, { useState } from 'react'
import {Box, Textarea, Button, Grid, GridItem, TextInput, Typography, Stack }  from '@strapi/design-system';
import PicturePlus from '@strapi/icons/PicturePlus';

const EditorChoice = ({data}) => {
    const [stateData, setStateData] = useState(data);
    return(
        <Box marginBottom={4} borderColor="neutral200" hasRadius padding={3}>
            <Box marginBottom={3}>
                <TextInput 
                    placeholder="This is a content placeholder" 
                    label="Content" 
                    name="content" 
                    error={stateData.title.length > 5 ? 'Content is too long' : undefined} 
                    onChange={e => setStateData({...stateData, title: e.target.value})} 
                    value={stateData.title} />
            </Box>
            <Box padding={3} borderColor="neutral200" hasRadius>
                <Stack spacing={3}>
                    <PicturePlus />
                    <Typography>Hình ảnh</Typography>
                </Stack>
            </Box>
        </Box>
    )
}


const ChoicesController = () => {
    const contentType = [
        'text',
        'user_email',
        'user_phone_number'
    ];
    
    const selectionType = {
        type: "",
        title: "",
        image: ""
    }

    const [message, setMessage] = useState();
    
    const [selection, setSelection] = useState([selectionType]);

    const HandleAddSelection = () => {
        setSelection([...selection, selectionType])
    }

    return (
        <>
            <Box marginBottom={4}>
                <Textarea 
                    placeholder="This is a content placeholder" 
                    label="Content" 
                    name="content" 
                    onChange={e => setMessage(e.target.value)}>
                    { message }
                </Textarea>
            </Box>
            {
                selection.map((val, index) => {
                    return (
                        <EditorChoice key={index} data={val} />
                    )
                })
            }
            <Box>
                <Button onClick={HandleAddSelection} style={{float: "right"}} variant="secondary">+ Add selection</Button>
            </Box>
        </>
  )
}

export default ChoicesController