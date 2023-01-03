import React, { useEffect, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useDispatch, useSelector } from 'react-redux'
import { initialNotes, setStatePanel, statePanel } from '../../slice/diagram-builder-slice'
import { IoCloseOutline } from "react-icons/io5";

import EditorPanel from './EditorPanel'

import { ModalLayout, ModalBody, ModalHeader, ModalFooter, Button, Typography } from '@strapi/design-system';

const DiagramEditor = ({type, data}) => {
    const dispatch = useDispatch();
    const EditorNotes = useSelector(initialNotes);
    const EditorState = useSelector(statePanel);
    const [EditorData, setEditorData] = useState(false);

    const HandlePanel = () => {
        dispatch(setStatePanel({...EditorState, open: !EditorState.open}))
    }

    useEffect(() => {
        let EditData = EditorNotes.filter((val) => val.id == EditorState.id);
        setEditorData(EditData[0]);
    }, [EditorState])

    
    return (
        <>
            {
                EditorState.open &&  
                <ModalLayout onClose={HandlePanel} labelledBy="title">
                    <ModalHeader>
                    <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                        Editor
                    </Typography>
                    </ModalHeader>
                    <ModalBody>
                        <EditorPanel data={EditorData}/>
                    </ModalBody>
                    <ModalFooter startActions={<Button onClick={HandlePanel} variant="tertiary">
                        Cancel
                        </Button>} endActions={<>
                        <Button onClick={HandlePanel}>Finish</Button>
                        </>} />
                </ModalLayout>
            }
        </>
    )
}

export default DiagramEditor