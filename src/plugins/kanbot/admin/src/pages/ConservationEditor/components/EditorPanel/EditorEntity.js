import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Stack, IconButton, Box, Typography }  from '@strapi/design-system';
import { Cross } from "@strapi/icons"

import LoadResponse from './components/loadResponse';
import NewResponse from './components/newResponse';

const EditorEntity = ({ stateEditor, HandleEditNode }) => {

    const [createResponse, setCreateResponse] = useState(false);
    const dispatch = useDispatch();

    const HandleClosePanel = () => {
        dispatch(setStatePanel(false));
    }

    return (
        <>
           <Box padding={3} className="x_editor_panel" background="neutral0" shadow="filterShadow" borderColor="neutral100">
                <Box padding={3}>
                    <Stack spacing={4}>
                            <Stack 
                                style={{
                                    borderBottom: '1px solid #e7e7e7',
                                    paddingBottom: 12,
                                    marginBottom: 16
                                }} 
                                horizontal 
                                justifyContent="space-between">
                                <IconButton onClick={() => { HandleEditNode(false) }} label="Đóng" icon={<Cross />} />
                            </Stack>
                            {
                                !createResponse && 
                                <LoadResponse stateEditor={stateEditor} setCreateResponse={setCreateResponse}/>
                            }
                            <NewResponse setCreateResponse={setCreateResponse}/>
                        </Stack>
                    </Box>
            </Box>
        </>
    )
}

export default EditorEntity