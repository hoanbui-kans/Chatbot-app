/*
 *
 * HomePage
 *
 */

import React, { useState } from 'react';
import pluginId from '../../pluginId';

import { 
  Layout, 
  HeaderLayout, 
  Button, 
  Link,
  Box,
  ContentLayout,
  ActionLayout,
  Stack
} from '@strapi/design-system';

import { Plus, ArrowLeft} from '@strapi/icons';
import Flow from './components/Flow';
import SideNav from '../../components/SideNav'
import NodeModal from './components/NodeModal';
import DiagramEditor from './components/DiagramEditor';
import { ReactFlowProvider } from 'reactflow';

const index = () => {
  const [ openNode, setOpenNode ] = useState(false);
  return (
    <>
      <Layout sideNav={<SideNav />}>
                <HeaderLayout 
                    navigationAction={
                        <Link 
                            startIcon={<ArrowLeft />} 
                            to={`/plugins/${pluginId}/settings`}>
                              Trở lại
                        </Link>
                          }
                          primaryAction={
                            <Stack spacing={3} horizontal>
                              <Button variant="secondary">Draft</Button>
                              <Button>Publish</Button>
                            </Stack>
                          } 
                          title="Composer" 
                          subtitle="AI languages facebook" as="h2" 
                        />
                        <ActionLayout 
                          startActions={<>
                            <Button onClick={() => setOpenNode(true)} variant="secondary" startIcon={<Plus />}>Add Node</Button>
                          </>}
                        />
                  <ContentLayout>
                    <Box background="neutral0" hasRadius boxshadow>
                      <ReactFlowProvider>
                          <Flow />
                          <DiagramEditor />   
                          { openNode && <NodeModal setOpenNode={setOpenNode}/> }
                      </ReactFlowProvider>
                    </Box>
                  </ContentLayout>
        </Layout>
    </>
  )
}

export default index;
