import React, { useState, useEffect } from 'react'
import { ModalLayout, ModalBody, ModalHeader, ModalFooter, Typography, Button, Box, Stack, Tooltip, Textarea} from '@strapi/design-system';
import { TextInput } from '@strapi/design-system';

const CreateModal = ({ Witai, setWitaiCreate, HandleCreateWitai }) => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState({
    title: "",
    description: "",
    app_id: "",
    server_access_token: ""
  });
  const [updateWitai, setUpdateWitai] = useState([]);

  const HandleCreate = async () => {
    const data = {
      title: title,
      Witai: updateWitai,
    }
    await HandleCreateWitai(data);
    setTitle('');
    setUpdateWitai([]);
  }

  return (
    <>
      <ModalLayout onClose={() => setWitaiCreate(false)} labelledBy="Tạo mục tiêu mới">
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
              Tạo ứng dụng mới
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Stack spacing={3}>
                  <Box>
                      <TextInput 
                          label="Tiêu đề ứng dụng" 
                          name="app_title"
                          onChange={e => setContent({...content, title: e.target.value})} 
                          value={content.title} />
                  </Box>
                  <Box>
                      <Textarea 
                        label="Mô tả ngắn" 
                        name="content" 
                        onChange={e => setContent({...content, description: e.target.value})} >
                      {content.description}
                    </Textarea>
                </Box>
            </Stack>
          </ModalBody>
          <ModalFooter startActions={<Button onClick={() => setWitaiCreate(false)} variant="tertiary">
                Hủy
          </Button>} endActions={<Button onClick={() => HandleCreate()}>Lưu</Button>} />
      </ModalLayout>
    </>
  )
}

export default CreateModal