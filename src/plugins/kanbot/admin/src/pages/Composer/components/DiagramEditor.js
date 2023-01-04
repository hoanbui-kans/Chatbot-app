import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setStatePanel, statePanel, updateNodeData } from '../../slice/diagram-builder-slice'
import { ModalLayout, ModalBody, ModalHeader, ModalFooter, Button, Typography } from '@strapi/design-system';

import ResponseMessageController from './controllers/ResponseMessageController';

const DiagramEditor = () => {

    const dispatch = useDispatch();
    const EditorState = useSelector(statePanel);

    const [EditorData, setEditorData] = useState(false);

    const HandlePanel = () => {
        dispatch(setStatePanel({...EditorState, open: !EditorState.open}))
    }

    const HandleUpdateNodeData = () => {
        dispatch(updateNodeData({ id:EditorState.id, data: EditorData}));
        dispatch(setStatePanel({...EditorState, open: !EditorState.open}))
    }

    return (
        <>
            {
                EditorState.open &&  
                <ModalLayout onClose={HandlePanel} labelledBy="title">
                    <ModalHeader>
                        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                            Chỉnh sửa câu trả lời
                        </Typography>
                    </ModalHeader>
                    <ModalBody>
                        <ResponseMessageController data={EditorState.state}/>
                    </ModalBody>
                </ModalLayout>
            }
        </>
    )
}

export default DiagramEditor