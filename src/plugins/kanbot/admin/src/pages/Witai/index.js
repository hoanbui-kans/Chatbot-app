/*
 *
 * HomePage
 *
 */

import React from 'react';
import pluginId from '../../pluginId';

import { 
  Layout, 
  HeaderLayout, 
  LinkButton, 
  ActionLayout, 
  Button, 
  ContentLayout 
} from '@strapi/design-system';

import WitaiTable from './components/WitaiTable';
import CreateWitaiModal from './components/CreateWitaiModal';
import UpdateWitaiModal from './components/CreateWitaiModal';
import DialogDeleteWitai from './components/DialogDeleteWitai';

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
                <WitaiTable />
              </ContentLayout>
        </Layout>;
}

export default HomePage;
