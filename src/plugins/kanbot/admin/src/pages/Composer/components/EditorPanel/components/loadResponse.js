import React, { useState, useEffect } from 'react'
import { Stack, Button, Combobox, ComboboxOption, EmptyStateLayout, Box  }  from '@strapi/design-system';
import { findAllResponse } from '../../../../../api/Response';
import { Illo } from '../../../../../components/Illo';
import { Plus } from '@strapi/icons'
import { updateNodeData, initialNotes, stateDataPanel } from '../../../../slice/diagram-builder-slice';
import { useDispatch, useSelector } from 'react-redux';

const LoadResponse = ({ setCreateResponse }) => {

    const dispatch = useDispatch();
    const nodeState = useSelector(initialNotes);
    const stateEditor = useSelector(stateDataPanel);

    const [value, setValue] = useState(false);
    const [messages, setMessages] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const { id, data } = stateEditor;


    const HandleSetNode = (e) => {
        setValue(e);
        let index = parseInt(e);
        console.log(messages[index])
    }

    async function getResponse () {
        const response = await findAllResponse();
        if(response){
            if(!messages){
                setMessages(response);
            }
        }
    }

    useEffect( async () => {
        if(!messages){
            await getResponse ();
        }
    }, [messages])


    const Selection = ({ data }) => {
        return (
            <Combobox label="Lựa chọn mẫu câu trả lời" value={value} onChange={HandleSetNode}>
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

    return (
        <>
            <Stack spacing={3}>
                {
                    
                    
                    Array.isArray(messages) && messages.length ? 
                        Array.isArray(data.response) && data.response.length ? 
                            data.response.map((val, index) => {
                                return(
                                    <Selection key={index} data={messages}/>
                                )
                            })
                        : ""
                    : 
                    <Box background="neutral0">
                            <EmptyStateLayout 
                            icon={<Illo />} 
                            content="Bạn chưa có mẫu câu trả lời nào..." 
                            action={<Button onClick={() => {setCreateResponse(false)}} variant="secondary" startIcon={<Plus />}>
                                Tạo mới
                            </Button>} />
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