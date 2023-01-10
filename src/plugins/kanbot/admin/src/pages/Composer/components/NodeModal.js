import React, { useState, useEffect } from 'react'
import { 
    ModalLayout, 
    ModalBody, 
    ModalHeader, 
    ModalFooter,
    Button,
    Typography,
    TextInput, 
    Box,
    Select, 
    Option,
    Stack,
    EmptyStateLayout
} from '@strapi/design-system';

import { Plus } from '@strapi/icons'
import { Illo } from '../../../components/Illo';
import { findManyIntent } from '../../../api/Intent';

const NodeModal = ({ title, HandleSaveTitle, HandleShowIntent }) => {

    const [content, setContent] = useState(title);
    const [intents, setIntents] = useState([]);
    const [intent, setIntent] = useState("");

    async function getIntents () {
        const response = await findManyIntent();
        if(response){
            setIntents(response);
        }
    }

    useEffect( async() => {
        if(!intents.length){
            await getIntents();
        }
    }, [])

    function HandleSetIntent () {
        HandleShowIntent(true);
        HandleSaveTitle(content);
    }

    return (
        <>
            <ModalLayout onClose={() => HandleSaveTitle(content)} labelledBy="title">
                <ModalHeader>
                    <div style={{ display: "flex", columnGap: 15, alignItems: "center"}}>
                        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                            Chỉnh sửa hội thoại
                        </Typography>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Stack spacing={4}>
                        <Box>
                            <TextInput 
                                placeholder="Nhập tiêu đề Bot" 
                                label="Nhập tiêu đề bot" 
                                name="bottitle" 
                                onChange={e => setContent(e.target.value)} value={content} />
                        </Box>
                        {
                            Array.isArray(intents) && !intents.length ? 
                                <Box>
                                    <Select 
                                        placeholder="Nhập tiêu đề Bot" 
                                        label="Nhập mục tiêu" 
                                        name="intent" 
                                        value={intent}
                                        onChange={setIntent}>
                                            {
                                                intents.map((val) => {
                                                    return(
                                                        <Option key={val.id} value={val.id.toString()}>{val.title}</Option>
                                                    )
                                                })   
                                            }
                                        </Select>
                                    </Box>
                                : 
                                <Box background="neutral0">
                                    <EmptyStateLayout 
                                        icon={<Illo />} 
                                        content="Bạn chưa có mục tiêu nào..." 
                                        action={
                                        <Button onClick={HandleSetIntent} variant="secondary" startIcon={<Plus />}>Tạo mới</Button>} />
                                </Box>
                        }
                    </Stack>
                </ModalBody>
                <ModalFooter 
                    endActions={<>
                    <Button onClick={() => HandleSaveTitle(content)}>Lưu</Button>
                  </>} />
            </ModalLayout>
        </>
  )
}

export default NodeModal