import React, { useState } from 'react'
import { Textarea, Flex, Box, Typography, Stack, Button, TextInput } from '@strapi/design-system';
import { createResponse } from '../../../../../api/Response';
import {
    Pencil,
    Plus,
    Trash,
} from "@strapi/icons"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HandleEditMessage = ({ index, messages, updateMessages, deleteMessages }) => {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(messages.message);

    const HandleDelete = () => {
        let confirm = window.confirm("Bạn có muốn xóa?");
        if(index == 0){
            return alert('Không thể xóa');
        }
        if(confirm){
            deleteMessages(index)
        }
    }

    const HandleUpdate = () => {
        if(!value){ 
            return toast.success("Wow so easy!");
        }
        updateMessages(index, value);
        setEdit(false)
    }

    return(
        <Box padding={3} hasRadius background="neutral100" borderColor={ !messages.message ? "danger500" : "neutral100" } marginBottom={6}>
            <Stack spacing={3}>
                <Typography>Nội dung tin nhắn</Typography>
                {
                    edit ? 
                    <Textarea background="neutral0" rows={3} placeholder="Nhập để chỉnh sửa nội dung" name="content" onChange={e => setValue(e.target.value)}>
                        {value}
                    </Textarea>
                    :   
                    <Box background="neutral0" padding={4} hasRadius borderColor="neutral200">
                        <Typography variant="pi">{messages.message ? messages.message : "Nội dung tin nhắn"}</Typography>
                    </Box>
                }
                <Flex justifyContent="end" gap={1} marginBottom={3}>
                    <Button variant="danger-light" onClick={HandleDelete} label="Trash" startIcon={<Trash />}>Xóa</Button>
                    {
                        !edit ?  
                          <Button variant={"tertiary"} size="S" onClick={() => setEdit(true)} startIcon={<Pencil />}>Sửa</Button>
                        : <Button variant={"success-light"} size="S" onClick={HandleUpdate} startIcon={<Plus />}>Lưu</Button>
                    }
                </Flex>
            </Stack>
        </Box>
    )
}


const MessagesController = ({ appInfo, goBack }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [messages, setMessages] = useState([{
        message: ""
    }]);

    const HandleCreateMessage = async () => {
        const data = {
            kanbot_witais: appInfo.id,
            title: title,
                type: [
                    {
                        "__component": "kanbot.message",
                        "messages": messages
                    }
                ]
        }
        setIsLoading(true);
        const response = await createResponse(data);
        if(response){
            toast.success("Thành công!")
        } else {
            toast.warning("Xin vui lòng thử lại sau!")
        }
        setIsLoading(false);
    }

    const HandlePushMessages = () => {
        setMessages([...messages, {
            message: ""
        }])
    }

    const HandleUpdateMessages = (index, value) => {
        let NewData = [];
        messages.map((val, _i) => {
            if(index == _i){
                NewData.push({
                    message: value
                })
            } else {
                NewData.push(val)
            }
        })
        setMessages(NewData);
    }

    const HandleDeleteMessages = (index) => {
        let NewData = [];
        messages.map((val, _i) => {
            if(index != _i){
                NewData.push(val)
            }
        })
        setMessages(NewData);
    }

    return(
        <>
            <ToastContainer 
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="light" 
            />
            <Stack spacing={6}>
                <Box>
                    <TextInput 
                        placeholder="Nhập tiêu đề..." 
                        label="Tiêu đề" 
                        name="title" 
                        onChange={e => setTitle(e.target.value)} 
                        value={title}/>
                </Box>
                    {
                        Array.isArray(messages) && messages.length && messages.map((val, index) => {
                            return (
                                <HandleEditMessage 
                                    key={index} 
                                    index={index}
                                    messages={val} 
                                    setMessages={setMessages}
                                    updateMessages={HandleUpdateMessages}
                                    deleteMessages={HandleDeleteMessages}
                                />
                            )
                        })
                    }
                <Box>
                    <Button variant="secondary" onClick={HandlePushMessages}>+ Thêm biến thể</Button>
                </Box>
                <Stack horizontal justifyContent="space-between">
                    <Button size="M" onClick={goBack} variant="tertiary">
                        Trở lại
                    </Button>
                    <Button size="M" loading={isLoading} onClick={HandleCreateMessage} variant="primary">
                        Lưu
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}

export default MessagesController;