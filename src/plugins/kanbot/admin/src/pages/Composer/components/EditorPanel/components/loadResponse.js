import React, { useState, useEffect, useCallback } from 'react'
import { Stack, Button, Combobox, ComboboxOption, EmptyStateLayout, Box, Divider }  from '@strapi/design-system';
import { findAllResponse } from '../../../../../api/Response';
import { findAllEntities } from '../../../../../api/Entity';
import { Illo } from '../../../../../components/Illo';
import { Plus } from '@strapi/icons'
import { updateNodeData, initialNotes, stateDataPanel, initialEdges } from '../../../../slice/diagram-builder-slice';
import { useDispatch, useSelector } from 'react-redux';

const LoadResponse = ({ setCreateResponse }) => {

    const dispatch = useDispatch();
    const stateEditor = useSelector(stateDataPanel);

    const [nodeData, setNodeData] = useState(stateEditor.data);
    const [value, setValue] = useState(false);
    const [messages, setMessages] = useState(false);
    const [entities, setEntities] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [stateEdges, setEdges] = useSelector(initialEdges);

    const SelectNode = ({index, data, HandleSetNode}) => {

        const ID = nodeData.response[index].id;
        const [selection, setSeletion] = useState("");

        const updateNode = (e) => {
            const _e = parseInt(e)
            const response = [...nodeData.response];
            response[index] = messages[_e];
            const newNode = { ...nodeData, response: response };
            HandleSetNode(newNode);
        };
        
        const HandleSelect = (e) => {
            setSeletion(e);
            updateNode(e);
        };
    
        return(
            <Combobox label="Lựa chọn mẫu câu trả lời" value={selection} onChange={HandleSelect}>
                {
                    data.map((val, index) => {
                        return (
                            <ComboboxOption key={index} value={index.toString()}>{val.title}</ComboboxOption>
                        )
                    })
                }
            </Combobox>
        )
    }

    const SelectEntity = ({ data }) => {
        return(
            <Combobox value="" label="Lựa chọn mẫu câu trả lời">
                {
                    Array.isArray(data) && data.length ?
                        data.map((val, index) => {
                                <ComboboxOption key={index} value={val.title}>{val.title}</ComboboxOption>
                        })
                    :""
                }
            </Combobox>
        )
    }

    const HandleSetNode = (node) => {
        setNodeData(node)
    }


    async function getResponse () {
        const response = await findAllResponse();
        if(response){
            setMessages(response);
        }
    }

    useEffect( async () => {
        if(!messages){
            await getResponse ();
        }
    }, [messages])

    async function getEntities () {
        const response = await findAllEntities();
        if(response){
            setEntities(response);
        }
    }


    useEffect( async () => {
        if(!entities){
            await getEntities();
        }
    }, [entities])

    return (
        <>
            <Stack spacing={3}>
                <Box>
                    <SelectEntity data={entities} />
                </Box>
                <Box paddingTop={3} paddingBottom={3}>
                    <Divider />
                </Box>
                {
                    Array.isArray(messages) && messages.length ? 
                        Array.isArray(nodeData.response) && nodeData.response.length ? 
                            nodeData.response.map((val, index) => {
                                    return(
                                        <SelectNode index={index} key={index} data={messages} HandleSetNode={HandleSetNode}/>
                                    )
                                })
                            : ""
                    : 
                    <Box background="neutral0">
                            <EmptyStateLayout 
                            icon={<Illo />} 
                            content="Bạn chưa có mẫu câu trả lời nào..." 
                            action={<Button onClick={() => {setCreateResponse(false)}} variant="secondary" startIcon={<Plus />}>Tạo mới</Button>} />
                    </Box>
                }
                 <Stack spacing={3} horizontal justifyContent="end">
                        <Button loading={isLoading} size="M" variant="default">
                            Lưu
                        </Button>
                </Stack>
            </Stack>
        </>
  )
}

export default LoadResponse