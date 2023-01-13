import React from 'react'
import { Box, Flex, Table, Thead, Tbody, TFooter, Th, Tr, Td} from '@strapi/design-system';
import { IconButton, Typography, VisuallyHidden, Badge, Stack, Link  } from '@strapi/design-system';
import { Plus, Pencil, Trash } from '@strapi/icons'
import pluginId from '../../../../pluginId';

const index = ({ Witai, setWitaiCreate, setWitaiUpdate, setWitaiDelete }) => {
    return (
        <>
            <Box background="neutral100">
                <Table 
                colCount={6} 
                rowCount={6} 
                footer={
                <TFooter onClick={() => { setWitaiCreate(true) }} icon={<Plus />}>
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
                        Witai.map((entry, index) => <Tr key={entry.id}>
                              <Td>
                                  <Typography textColor="neutral800">{index + 1}</Typography>
                              </Td>
                              <Td>
                                  <Typography textColor="neutral800">
                                    <Link to={`/plugins/${pluginId}/${entry.app_name}`}>{entry.title}</Link>
                                  </Typography>
                              </Td>
                              <Td>
                                  <Flex>
                                    <IconButton onClick={() => setWitaiUpdate(entry)} label="Chỉnh sửa" noBorder icon={<Pencil />} />
                                    <IconButton onClick={() => setWitaiDelete(entry.id)} label="Xóa" noBorder icon={<Trash />} />
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