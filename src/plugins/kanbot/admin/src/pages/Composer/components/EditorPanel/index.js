import React from 'react'
import { Box, Link, Button, HeaderLayout, Stack, Typography } from '@strapi/design-system';
import { statePanel, stateDataPanel, setStatePanel } from '../../../slice/diagram-builder-slice';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Pencil, Plus, Cross } from '@strapi/icons';
import ResponseMessageController from './controllers/ResponseMessageController';

const index = () => {
    const isShowPanel = useSelector(statePanel);
    const editorData = useSelector(stateDataPanel);
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
                        <ResponseMessageController />
                    </Box>
                </Box>
            }
        </>
    )
}

export default index