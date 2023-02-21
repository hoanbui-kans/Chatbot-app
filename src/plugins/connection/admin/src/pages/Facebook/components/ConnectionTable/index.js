import React from 'react'
import { Box, Flex, Table, Thead, Tbody, TFooter, Th, Tr, Td} from '@strapi/design-system';
import { IconButton, Typography, VisuallyHidden, Badge, Stack  } from '@strapi/design-system';
import { Plus, Pencil, Trash } from '@strapi/icons'

const index = ({ Connection, setConnectionCreate, setConnectionUpdate, setConnectionDelete }) => {

    return (
        <>
            <Box background="neutral100">
                <Table 
                colCount={6} 
                rowCount={6} 
                footer={
                <TFooter onClick={() => { setConnectionCreate(true) }} icon={<Plus />}>
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
                                <VisuallyHidden>Hành động</VisuallyHidden>
                            </Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        {
                        Connection.map((entry, index) => <Tr key={entry.id}>
                            <Td>
                                <Typography textColor="neutral800">{index + 1}</Typography>
                            </Td>
                            <Td>
                                <Typography textColor="neutral800">{entry.title}</Typography>
                            </Td>
                            <Td>
                                <Flex>
                                    <IconButton onClick={() => setConnectionUpdate(entry)} label="Chỉnh sửa" noBorder icon={<Pencil />} />
                                    <IconButton onClick={() => setConnectionDelete(entry.id)} label="Xóa" noBorder icon={<Trash />} />
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