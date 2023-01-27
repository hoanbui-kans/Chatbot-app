import React, { useState } from 'react'
import { 
  TextInput,
  Tooltip,
  Button,
  Box,
  ModalLayout,
  ModalBody, 
  ModalHeader, 
  ModalFooter,
  Typography,
  ToggleCheckbox, 
  Textarea 
} from '@strapi/design-system';


import Information from '@strapi/icons/Information';

const index = () => {

  const [content, setContent] = useState({
    title: "",
    description: "",
    app_name: '',
    app_id: "",
    private: false,
    language: "",
    server_access_token: "",
  });

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Box
        background="neutral0"
        padding={4}
        hasRadius
        shadow
        borderColor="neutral100"

        >
        <form
        >
          <Box paddingBottom={4}>
          <Box paddingBottom={4}>
                <TextInput 
                    label="App title" 
                    name="app_title"
                    error={content.title.length == 0 ? 'Trường tiêu đề là bắt buộc' : undefined} 
                    onChange={e => setContent({...content, title: e.target.value})} 
                    value={content.title} 
                    labelAction={
                    <Tooltip description={ "Trường App ID là bắt buộc" }>
                        <button 
                          type="button" 
                          style={{
                              border: 'none',
                              padding: 0,
                              background: 'transparent'
                            }}>
                          <Information aria-hidden />
                        </button>
                    </Tooltip>} />
            </Box>
            <Box>
              <Textarea placeholder="This is a content placeholder" label="Content" name="content" hint="Description line" onChange={e => setContent({...content, description: e.target.value})} labelAction={<Tooltip description="Content of the tooltip" position="right">
                  <button aria-label="Information about the email" style={{
                        border: 'none',
                        padding: 0,
                        background: 'transparent'
                    }}>
                    <Information aria-hidden={true} />
                  </button>
                </Tooltip>}>
              {content.description}
            </Textarea>
            </Box>
            <Box paddingBottom={4}>
                <TextInput 
                    label="App id" 
                    name="app_id"
                    error={content.app_id.length == 0 ? 'Trường App ID là bắt buộc' : undefined} 
                    onChange={e => setContent({...content, app_id: e.target.value})} 
                    value={content.app_id} 
                    labelAction={
                    <Tooltip description={ "Trường App ID là bắt buộc" }>
                        <button 
                          type="button" 
                          style={{
                              border: 'none',
                              padding: 0,
                              background: 'transparent'
                            }}>
                          <Information aria-hidden />
                        </button>
                    </Tooltip>} />
              </Box>
              <TextInput 
                  label="Server access token" 
                  name="server_token"
                  error={content.server_access_token.length == 0 ? 'Trường Server access token là bắt buộc' : undefined} 
                  onChange={e => setContent({...content, server_access_token: e.target.value})} 
                  value={content.server_access_token} 
                  labelAction={
                  <Tooltip description={ "Trường Server access token là bắt buộc" }>
                      <button 
                        type="button" 
                        style={{
                            border: 'none',
                            padding: 0,
                            background: 'transparent'
                          }}>
                        <Information aria-hidden />
                      </button>
                  </Tooltip>} />
            </Box>
            <Box>
              <Button type="submit" size="M" variant='default'>Lấy dữ liệu</Button>
            </Box>
        </form>
      </Box>
      {openModal && <ModalLayout onClose={() => setOpenModal(prev => !prev)} labelledBy="title">
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
              Lưu dữ liệu bot
            </Typography>
          </ModalHeader>
          <ModalBody>
              <form>
                  <Box paddingBottom={4}>
                    <TextInput 
                        label="App id" 
                        value={content.app_id}
                        readOnly
                       />
                  </Box>
                  <Box paddingBottom={4}>
                    <TextInput 
                        label="App Name" 
                        value={content.app_name}
                        readOnly
                       />
                  </Box>
                  <Box paddingBottom={4}>
                    <TextInput 
                        label="App language" 
                        value={content.language}
                        readOnly
                       />
                  </Box>
                  <Box paddingBottom={4}>
                    <ToggleCheckbox onLabel="Private" offLabel="Public" checked={content.private} onChange={false} readOnly>
                        The field is required?
                    </ToggleCheckbox>
                  </Box>
              </form>         
          </ModalBody>
          <ModalFooter startActions={<Button onClick={() => setOpenModal(prev => !prev)} variant="tertiary">
                Hủy
              </Button>} endActions={<>
                <Button>Lưu dữ liệu</Button>
              </>} />
        </ModalLayout>}
    </>
  )
}

export default index