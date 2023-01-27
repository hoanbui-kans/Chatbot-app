import React, { useState, useEffect, memo } from 'react'
import { Stack, Button, Select, Option, EmptyStateLayout, Box, Divider, Loader  }  from '@strapi/design-system';
import { Illo } from '../../../../../components/Illo';
import { Plus } from '@strapi/icons'
import { stateDataPanel, entityOptions, responseOptions, fetchData, stateLoading, setStatePanel } from '../../../../slice/diagram-panelEditor-slice';
import { updateNodeData } from '../../../../slice/diagram-builder-slice';
import { useDispatch, useSelector } from 'react-redux';

const SelectResponse = ({ index, data, updateResponse, current }) => {

    const [selection, setSeletion] = useState(current ? current.toString() : "");

    const HandleUpdateResponse = (e) => {
        const selectValue = data.find((val) => val.id == e);
        setSeletion(e);
        updateResponse(index, {
            id: e,
            title: selectValue.title
        });
    }
    return(
        <Select label="Lựa chọn mẫu câu trả lời" placeholder="" value={selection} onChange={HandleUpdateResponse}>
            {
                data.map((val, index) => {
                    return (
                        <Option key={index} value={val.id.toString()}>{val.title}</Option>
                    )
                })
            }
        </Select>
    )
}

const SelectEntity = ({ updateEntity, data, current }) => {

    const [value, setValue] = useState(current ? current.toString() : ""); 

    const HandleUpdateData = (e) => {
        const selectValue = data.find((val) => val.id == e);
        setValue(e);
        updateEntity(selectValue);
    }

    return(
        <>  
            <Box>
                <Select value={value} onChange={HandleUpdateData} label="Lựa chọn nội dung xác thực" placeholder="">
                    {
                        data.map(( val, index) => {
                            return(<Option key={index} value={val.id.toString()}>{val.title}</Option>)
                        })
                    }
                </Select>
            </Box>
            <Box paddingTop={3} paddingBottom={3}>
                <Divider />
            </Box>
        </>
    )
}

const index = ({ entities, responses, setCreateResponse }) => {
    console.log('entities', entities);
    const dispatch = useDispatch();
    const loading = useSelector(stateLoading);
    const stateEditor = useSelector(stateDataPanel);
    const [isLoading, setIsLoading] = useState(false)
    
    const [updateState, setUpdateState] = useState(stateEditor.data);

    useEffect(() => {
        setUpdateState(stateEditor.data)
    }, [stateEditor])

    const HandleUpdateEntity = (e) => {
        setUpdateState({ 
            ...updateState, 
            request: {
                id: e.id,
                title: e.title
        }})
    }

    const handleupdateResponse = (_i, e) => {
        const Response = [];
        updateState.response.map((val) => {
            if(index == _i){
                Response.push({
                    ...val,
                    id: e.id,
                    title: e.title
                })
            } else {
                Response.push(val)
            }
        });
        setUpdateState({...updateState, response: Response})
    }

    const HandleUpdateNodeData = () => {
        setIsLoading(true);
        setTimeout(() => {
            dispatch(updateNodeData({ 
                id: stateEditor.id,
                data: updateState
            }));
            dispatch(setStatePanel(false))
            setIsLoading(false);
        }, 400);
    }

    return (
        <>
        {
            loading == 'pending' ? 
                <Box padding={5} style={{ display: 'flex', justifyContent: 'center'}}>
                    <Loader>Loading content...</Loader>
                </Box>
            :   <Stack spacing={4}>
                    {
                        Array.isArray(entities) 
                        && entities.length 
                        && updateState.request 
                        && <SelectEntity updateEntity={HandleUpdateEntity} data={entities} current={updateState.request.id}/>
                    }
                    {
                        Array.isArray(responses) && responses.length ? 
                            Array.isArray(updateState.response) && updateState.response.length ? 
                            updateState.response.map((val, index) => {
                                        return(
                                            <SelectResponse 
                                                index={index} 
                                                updateResponse={handleupdateResponse} 
                                                key={index} 
                                                data={responses}
                                                current={val.id}
                                            />
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
                        <Button loading={isLoading} size="M" variant="default" onClick={HandleUpdateNodeData}>
                            Lưu
                        </Button>
                    </Stack>
                </Stack>    
        }
        </>
  )
}

export default index