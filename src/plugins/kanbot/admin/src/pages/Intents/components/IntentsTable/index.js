import React from 'react'
import { Box, Flex, Table, Thead, Tbody, TFooter, Th, Tr, Td, Link} from '@strapi/design-system';
import { IconButton, Typography, VisuallyHidden, Badge, Stack  } from '@strapi/design-system';
import { Plus, Trash, Pencil } from '@strapi/icons'
import pluginId from '../../../../pluginId';
import { useParams } from 'react-router-dom';

const index = ({ intents, setIntentCreate, setIntentUpdate, setIntentDelete }) => {
    const { app_name } = useParams();
    return (
        <>
            <Box background="neutral100">
                <Table 
                colCount={6} 
                rowCount={6} 
                footer={
                <TFooter onClick={() => { setIntentCreate(true) }} icon={<Plus />}>
                    Thêm dữ liệu tùy biến khác vào bảng này
                </TFooter>}>
                    <Thead>
                        <Tr>
                            <Th>
                                <Typography variant="sigma">STT</Typography>
                            </Th>
                            <Th>
                                <Typography variant="sigma">Tên mục tiêu</Typography>
                            </Th>
                            <Th>
                                <Typography variant="sigma">Trường dữ liệu</Typography>
                            </Th>
                            <Th>
                                <VisuallyHidden>Actions</VisuallyHidden>
                            </Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        { 
                            intents.map((entry, index) => <Tr key={entry.id}>
                                <Td>
                                    <Typography textColor="neutral800">{index + 1}</Typography>
                                </Td>
                                <Td>
                                    <Typography textColor="neutral800">
                                        <Link to={`/plugins/${pluginId}/${app_name}/intents/${entry.id}/composer`}>
                                            { entry.title }
                                        </Link>
                                    </Typography>
                                </Td>
                                <Td>
                                    <Stack horizontal spacing={3}>
                                        <Badge>{entry.entities.length}</Badge>
                                        <Typography variant="pi" textColor="neutral800">
                                            Trường dữ liệu
                                        </Typography>
                                    </Stack>
                                </Td>
                                <Td>
                                    <Flex>
                                        <IconButton onClick={() => setIntentDelete(entry)} label="Xóa" noBorder icon={<Trash />} />
                                        <IconButton onClick={() => setIntentUpdate(entry)} label="Sửa" noBorder icon={<Pencil />} />
                                    </Flex>
                                </Td>
                                </Tr>)
                            }
                        </Tbody>
                    </Table>
                </Box>
        </>
    )
}

export default index