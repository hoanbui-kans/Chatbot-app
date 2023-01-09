import React, { useState } from 'react'
import { 
    ModalLayout, 
    ModalBody, 
    ModalHeader, 
    ModalFooter,
    Button,
    Typography,
    TextInput, 
    Box
} from '@strapi/design-system';

const NodeModal = ({ title, HandleSaveTitle }) => {
    const [content, setContent] = useState(title);
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
                    <Box>
                        <TextInput 
                            placeholder="Nhập tiêu đề Bot" 
                            label="Nhập tiêu đề" 
                            name="content" 
                            error={content.length > 5 ? 'Content is too long' : undefined} 
                            onChange={e => setContent(e.target.value)} value={content} />
                    </Box>
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