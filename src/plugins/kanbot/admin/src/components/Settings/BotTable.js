import React from 'react'

import { 
  Layout,
  Box,
  HeaderLayout,
  Button,
  ContentLayout,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  TFooter,
  Td,
  Typography,
  Flex,
  IconButton,
  ActionLayout,
  BaseCheckbox,
  VisuallyHidden,
  Avatar
} from '@strapi/design-system';

import Pencil from '@strapi/icons/Pencil';
import Trash from '@strapi/icons/Trash';
import Plus from '@strapi/icons/Plus';

const BotTable = () => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const entry = {
    cover: 'https://avatars.githubusercontent.com/u/3874873?v=4',
    description: 'Chez Léon is a human sized Parisian',
    category: 'French cuisine',
    contact: 'Leon Lafrite'
  };
  const entries = [];

  for (let i = 0; i < 5; i++) {
    entries.push({ ...entry,
      id: i
    });
  }
  return (
    <>
      <Table colCount={COL_COUNT} rowCount={ROW_COUNT} footer={<TFooter icon={<Plus />}>Add another field to this collection type</TFooter>}>
            <Thead>
              <Tr>
                <Th>
                  <BaseCheckbox aria-label="Select all entries" />
                </Th>
                <Th>
                  <Typography variant="sigma">ID</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Cover</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Description</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Categories</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Contact</Typography>
                </Th>
                <Th>More</Th>
                <Th>More</Th>
                <Th>More</Th>
                <Th>
                  <VisuallyHidden>Actions</VisuallyHidden>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {entries.map(entry => <Tr key={entry.id}>
                  <Td>
                    <BaseCheckbox aria-label={`Select ${entry.contact}`} />
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.id}</Typography>
                  </Td>
                  <Td>
                    <Avatar src={entry.cover} alt={entry.contact} />
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.description}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.category}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.contact}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.description}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.description}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.description}</Typography>
                  </Td>
                  <Td>
                    <Flex>
                      <IconButton onClick={() => console.log('edit')} label="Edit" icon={<Pencil />} />
                      <Box paddingLeft={1}>
                        <IconButton onClick={() => console.log('edit')} label="Delete" icon={<Trash />} />
                      </Box>
                    </Flex>
                  </Td>
                </Tr>)}
            </Tbody>
          </Table>
    </>
  )
}

export default BotTable