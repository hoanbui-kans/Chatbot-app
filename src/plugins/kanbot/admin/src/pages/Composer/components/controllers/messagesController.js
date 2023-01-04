import React, { useState, useEffect } from 'react'
import {ActionLayout, Layout, Select, Option,Textarea,IconButton, Flex, Searchbar, SearchForm, Tooltip, Box, Typography, Stack, Button, Grid, GridItem, Status,TabPanels, TabPanel, TabGroup, Tabs, Tab } from '@strapi/design-system';

import Message from '@strapi/icons/Message';
import BulletList from '@strapi/icons/BulletList';
import Information from '@strapi/icons/Information';
import PicturePlus from '@strapi/icons/PicturePlus';
import Puzzle from '@strapi/icons/Puzzle';

import Pencil from '@strapi/icons/Pencil';
import Plus from '@strapi/icons/Plus';
import Trash from '@strapi/icons/Trash';


const HandleEditMessage = ({ index, content, updateContent, deleteContent }) => {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(content.content);

    const HandleDelete = () => {
        let confirm = window.confirm("Bạn có muốn xóa?");
        if(confirm){
            console.log(index);
            deleteContent(index)
        }
    }

    const HandleUpdate = () => {
        if(!value){ 
            return alert("Bạn chưa nhập nội dung");
        }
        updateContent(index, value);
        setEdit(false)
    }

    return(
        <Box padding={3} hasRadius borderColor="neutral200" background="neutral0" marginBottom={6}>
            <Flex justifyContent="end" gap={1} marginBottom={3}>
                <Button variant="danger-light" onClick={HandleDelete} label="Trash" startIcon={<Trash />}>Xóa</Button>
                {
                    !edit ?  
                      <Button variant={"tertiary"} onClick={() => setEdit(true)} startIcon={<Pencil />}>Sửa</Button>
                    : <Button variant={"success-light"} onClick={HandleUpdate} startIcon={<Plus />}>Lưu</Button>
                }
               
            </Flex>
            {
                edit ? 
                <Textarea background="neutral0" rows={3} placeholder="Nhập để chỉnh sửa nội dung" label="Nội dung tin nhắn" name="content" onChange={e => setValue(e.target.value)}>
                    {value}
                </Textarea>
                :   
                <Box background="neutral100" padding={4} hasRadius borderColor="neutral200">
                    <Typography>{content.content ? content.content : "Nội dung tin nhắn"}</Typography>
                </Box>
            }
        </Box>
    )
}


const MessagesController = ({setData}) => {

    const [content, setContent] = useState([{
        content: ""
    }]);

    const HandlePushContent = () => {
        setContent([...content, {
            content: ""
        }])
    }

    const HandleUpdateContent = (index, value) => {
        let NewData = [];
        content.map((val, _i) => {
            if(index == _i){
                NewData.push({
                    content: value
                })
            } else {
                NewData.push(val)
            }
        })
        setContent(NewData);
    }

    const HandleDeleteContent = (index) => {
        console.log(index);
        let NewData = [];
        content.map((val, _i) => {
            if(index != _i){
                NewData.push(val)
            }
        })
        setContent(NewData);
    }

    useEffect(() => {
        setData(content)
    }, [content])

    return(
        <>
         <Box>
            {
                Array.isArray(content) && content.length && content.map((val, index) => {
                    return (
                        <HandleEditMessage 
                            key={index} 
                            index={index}
                            content={val} 
                            setContent={setContent}
                            updateContent={HandleUpdateContent}
                            deleteContent={HandleDeleteContent}
                        />
                    )
                })
            }
            <Box>
                <Button variant="secondary" style={{float: 'right'}} onClick={HandlePushContent}>+ Thêm biến thể</Button>
            </Box>
        </Box>
        </>
    )
}

export default MessagesController;