import React, { useState } from 'react'
import { ModalLayout, ModalBody, ModalHeader, ModalFooter, Typography, Button, Box, Stack, Textarea} from '@strapi/design-system';
import { TextInput } from '@strapi/design-system';
import slugify from 'slugify';
  
const CreateModal = ({ Witai, setWitaiCreate, HandleCreateWitai }) => {

  const [content, setContent] = useState({
    title: "",
    description: "",
  });

  const HandleCreate = async () => {
    await HandleCreateWitai(content);
    setContent({
      app_name: "",
      description: "",
    });
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
                          hint="Nhập tiếng việt gạch chân không có dấu"
                          onChange={e => setContent({...content, app_name: slugify(e.target.value)})} 
                          value={content.app_name} />
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