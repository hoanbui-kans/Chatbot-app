import React from 'react'
import { Box } from '@strapi/design-system';
import { useDispatch, useSelector } from 'react-redux';
import ResponseMessageController from './controllers/ResponseMessageController';

import { statePanel, setStatePanel } from '../../../slice/diagram-panelEditor-slice';

const index = () => {

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
                        <ResponseMessageController />
                    </Box>
                </Box>
            }
        </>
    )
}

export default index