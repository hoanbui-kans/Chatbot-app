import React from 'react'
import { Box, Flex, Table, Thead, Tbody, TFooter, Th, Tr, Td} from '@strapi/design-system';
import { IconButton, Typography, VisuallyHidden, Badge, Stack  } from '@strapi/design-system';
import { Plus, Pencil, Trash } from '@strapi/icons'

const index = ({ Orders, setOrderCreate, setOrderUpdate, setOrderDelete }) => {

    return (
        <>
            <Box background="neutral100">
                <Table 
                    colCount={6} 
                    rowCount={6} 
                    footer={
                    <TFooter onClick={() => { setOrderCreate(true) }} icon={<Plus />}>
                        Thêm dữ liệu tùy biến khác vào bảng này
                    </TFooter>}>
                    <Thead>
                        <Tr>
                            <Th>
                                <Typography variant="sigma">STT</Typography>
                            </Th>
                            <Th>
                                <Typography variant="sigma">Tên trường dữ liệu</Typography>
                            </Th>
                            <Th>
                                <Typography variant="sigma">Mục tiêu</Typography>
                            </Th>
                            <Th>
                                <Typography variant="sigma">Từ khóa</Typography>
                            </Th>
                            <Th>
                                <VisuallyHidden>Hành động</VisuallyHidden>
                            </Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        {
                        Orders.map((entry, index) => <Tr key={entry.id}>
                            <Td>
                                <Typography textColor="neutral800">{index + 1}</Typography>
                            </Td>
                            <Td>
                                <Typography textColor="neutral800">{entry.title}</Typography>
                            </Td>
                            <Td>
                                <Stack horizontal spacing={3}>
                                    <Badge>{entry.intents.length}</Badge>
                                    <Typography variant="pi" textColor="neutral800">
                                        Trường dữ liệu
                                    </Typography>
                                </Stack>
                            </Td>
                            <Td>
                                <Stack horizontal spacing={3}>
                                    <Badge>{entry.keywords.length}</Badge>
                                    <Typography variant="pi" textColor="neutral800">
                                        Từ khóa
                                    </Typography>
                                </Stack>
                            </Td>
                            <Td>
                                <Flex>
                                    <IconButton onClick={() => setOrderUpdate(entry)} label="Chỉnh sửa" noBorder icon={<Pencil />} />
                                    <IconButton onClick={() => setOrderDelete(entry.id)} label="Xóa" noBorder icon={<Trash />} />
                                </Flex>
                            </Td>
                            </Tr>)}
                        </Tbody>
                    </Table>
                </Box>
        </>
    )
}

export default index