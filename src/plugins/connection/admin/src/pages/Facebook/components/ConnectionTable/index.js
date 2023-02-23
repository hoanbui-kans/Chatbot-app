import React from 'react'
import { Box, Flex, Table, Thead, Tbody, TFooter, Th, Tr, Td} from '@strapi/design-system';
import { IconButton, Typography, VisuallyHidden, Badge, Stack  } from '@strapi/design-system';
import { Plus, Pencil, Trash } from '@strapi/icons'
import { PaginationURLQuery, PageSizeURLQuery } from '@strapi/helper-plugin';

const index = ({ Connection, Pagination, setConnectionCreate, setConnectionUpdate, setConnectionDelete }) => {

    const PaginationFooter = ({ pagination }) => {
        return (
          <Box paddingTop={6}>
            <Flex alignItems="flex-end" justifyContent="space-between">
              <PageSizeURLQuery />
              <PaginationURLQuery pagination={pagination} />
            </Flex>
          </Box>
        );
    };

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
                            Array.isArray(Connection) && Connection.length ?
                            Connection.map((entry, index) => 
                                <Tr key={entry.id}>
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
                                </Tr>
                            ): 
                            <Tr>
                                <Td colSpan={3}>
                                    <Box padding={3} style={{textAlign: 'center'}}>
                                        <Typography textColor="neutral800">Bạn chưa kết nối đến trang nào</Typography>
                                    </Box>
                                </Td>
                            </Tr>
                        }
                        </Tbody>
                    </Table>
                    <PaginationFooter pagination={Pagination}/>
                </Box>
        </>
    )
}

export default index