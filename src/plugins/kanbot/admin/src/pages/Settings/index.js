import React from 'react'
import pluginId from '../../pluginId';
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

import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';
import Apps from '@strapi/icons/Apps';
import Plus from '@strapi/icons/Plus';
import SizeNav from '../../components/SideNav';

import { LinkButton } from '@strapi/design-system';
import BotTable from '../../components/Settings/BotTable';

const index = () => {
  const links = [{
    id: 1,
    label: 'Addresses',
    icon: <ExclamationMarkCircle />,
    to: '/address'
  }, {
    id: 2,
    label: 'Categories',
    to: '/category'
  }, {
    id: 3,
    label: 'Cities',
    icon: <Apps />,
    to: '/city',
    active: true
  }, {
    id: 4,
    label: 'Countries',
    to: '/country'
  }];

  return <Box background="neutral100">
          <Layout sideNav={<SizeNav />}>
            <>
              <HeaderLayout 
                  primaryAction={
                      <LinkButton 
                        to={`/plugins/${pluginId}/settings/add-bot`} 
                        startIcon={<Plus />}>Thêm ứng dụng</LinkButton>} 
                        title="WitAi" 
                        subtitle="AI languages facebook" as="h2" 
                      />
                      <ActionLayout startActions={
                          <Button size="M" variant="tertiary">
                              Document
                            </Button>
                          } 
                  endActions={""}
              />
              <ContentLayout>
                <BotTable />
              </ContentLayout>
            </>
          </Layout>
        </Box>;
}

export default index