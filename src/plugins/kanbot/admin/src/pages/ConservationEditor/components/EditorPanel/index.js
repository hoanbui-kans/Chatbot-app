import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Stack, IconButton, Box }  from '@strapi/design-system';
import { Cross, ArrowRight } from "@strapi/icons"

import UpdateResponse from './components/UpdateResponse';

import { editorMessage, setEditorMessage } from '../../../slice/conservation-builder-slice';

const EditorEntity = ({ HandleEditNode }) => {

    const [createResponse, setCreateResponse] = useState(false);
    
    const dispatch = useDispatch();

    const HandleClosePanel = () => {
        dispatch(setStatePanel(false));
    }

    const EditorState = useSelector(editorMessage);

    return (
        <>
            {
                EditorState && 
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
                                         <IconButton onClick={() => { dispatch(setEditorMessage(false)) }} label="Đóng" icon={<ArrowRight />} />
                                         <IconButton onClick={() => { dispatch(setEditorMessage(false)) }} label="Đóng" icon={<Cross />} />
                                 </Stack>
                                 <UpdateResponse 
                                     editorMessage={EditorState} 
                                     setEditorMessage={setEditorMessage}
                                 />
                             </Stack>
                         </Box>
                 </Box>
            }
        </>
    )
}

export default EditorEntity