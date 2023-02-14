import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { statePanel, setStatePanel, stateDataPanel } from '../../../slice/diagram-panelEditor-slice';

import { Stack, IconButton, Box, Typography }  from '@strapi/design-system';
import { Cross } from "@strapi/icons"

import LoadResponse from './components/loadResponse';
import NewResponse from './components/newResponse';

const EditorEntity = ({ entities, responses }) => {

    const [createResponse, setCreateResponse] = useState(false);
    const editorData = useSelector(stateDataPanel);
    const isShowPanel = useSelector(statePanel);
    const dispatch = useDispatch();

    const HandleClosePanel = () => {
        dispatch(setStatePanel(false));
    }

    return (
        <>
            {
            isShowPanel && 
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
                                <Typography variant="beta" fontWeight="bold">
                                    { editorData.data.title }
                                </Typography>
                                <IconButton onClick={HandleClosePanel} label="Đóng" icon={<Cross />} />
                            </Stack>
                            {
                                !createResponse && 
                                <LoadResponse 
                                    entities={entities}
                                    responses={responses}
                                    setCreateResponse={setCreateResponse}
                                />
                            }
                            <NewResponse setCreateResponse={setCreateResponse}/>
                        </Stack>
                    </Box>
                </Box>
            }
        </>
    )
}

export default EditorEntity