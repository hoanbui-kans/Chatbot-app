import React, { useState, useEffect, memo} from 'react'
import { Stack, IconButton, Box, Typography }  from '@strapi/design-system';
import { Cross } from "@strapi/icons"

const EditorIntent = ({ HandleShowIntent }) => {
    
    const [title, setTitle] = useState("");

    const HandleClosePanel = () => {
        HandleShowIntent(false)
    }

    return (
        <>
           <Box padding={3} className="x_editor_panel" background="neutral0" shadow="filterShadow" borderColor="neutral100">
                        <Box padding={3}>
                        <Stack spacing={4}>
                                <Stack 
                                    style={{
                                        borderBottom: '1px solid #e7e7e7',
                                        paddingBottom: 12,
                                        marginBottom: 16
                                    }} 
                                    horizontal 
                                    justifyContent="space-between">
                                    <Typography variant="beta" fontWeight="bold">
                                        Thêm mục tiêu
                                    </Typography>
                                    <IconButton onClick={HandleClosePanel} label="Đóng" icon={<Cross />} />
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
        </>
    )
}

export default memo(EditorIntent)