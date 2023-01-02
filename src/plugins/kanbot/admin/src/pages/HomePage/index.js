/*
 *
 * HomePage
 *
 */

import React,  { useState } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

import { 
  Flex, 
  Layout, 
  HeaderLayout, 
  LinkButton, 
  ActionLayout, 
  Button, 
  ContentLayout 
} from '@strapi/design-system';

import BotTable from '../../components/Settings/BotTable';
import Plus from '@strapi/icons/Plus';
import SizeNav from '../../components/SideNav';

const HomePage = () => {
  return <Layout>
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
        </Layout>;
}

export default HomePage;
