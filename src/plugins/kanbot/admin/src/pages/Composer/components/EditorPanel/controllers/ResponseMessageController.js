import React, { useState } from 'react'
import { Stack, Button, ToggleCheckbox, Box }  from '@strapi/design-system';
import { Cross } from "@strapi/icons"
import { useDispatch } from 'react-redux';
import { setStatePanel } from '../../../../slice/diagram-builder-slice';
import LoadResponse from '../components/loadResponse';
import NewResponse from '../components/newResponse';

const ResponseMessageController = ({ data }) => {

    const dispatch = useDispatch();

    const HandleClosePanel = () => {
        dispatch(setStatePanel(false));
    }

    const [createResponse, setCreateResponse] = useState(false);

    return (
        <div>
            <Stack spacing={4}>
                <Box>
                    <Button onClick={HandleClosePanel} variant="tertiary" startIcon={<Cross />}>
                        Đóng
                    </Button>
                </Box>
                {
                    !createResponse && <LoadResponse setCreateResponse={setCreateResponse}/>
                }
                <NewResponse setCreateResponse={setCreateResponse}/>
            </Stack>
        </div>
    )
    }

export default ResponseMessageController