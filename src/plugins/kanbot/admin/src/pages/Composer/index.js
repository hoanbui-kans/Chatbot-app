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
  Stack
} from '@strapi/design-system';

import { ArrowLeft, Pencil } from '@strapi/icons';
import Flow from './components/Flow';
import SideNav from '../../components/SideNav'
import NodeModal from './components/NodeModal';
import { ReactFlowProvider } from 'reactflow';
import { initialNotes, initialEdges } from '../slice/diagram-builder-slice';
import { useDispatch, useSelector } from 'react-redux';
import { createResponse } from '../../api/Response';
import ChatUi from './components/ChatUi';
import EditorPanel from './components/EditorPanel';

const index = () => {

  const dispatch = useDispatch();
  const Nodes = useSelector(initialNotes);
  const Edges = useSelector(initialEdges);

  // Title
  const [title, setTitle] = useState('Bot Ai');
  const [editTitle, setEditTitle] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulator chat
  const [simChat, setSimChat] = useState(false);

  const HandleCreateResponse = async () => {
    const response = await createResponse(Edges);
  }

  const HandleSaveTitle = (e) => {
    setTitle(e);
    setEditTitle(false);
  }


  
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
                              <Button variant={simChat ? 'danger-light' : 'success-light'} onClick={() => { setSimChat(!simChat) }}>Thử nghiệm</Button>
                              <Button 
                                loading={ loading == 'draft' ? true : false } 
                                onClick={() => HandleCreateResponse('draft')} variant="secondary">Lưu nháp</Button>
                              <Button 
                                loading={ loading == 'publish' ? true : false } 
                                onClick={() => HandleCreateResponse('publish')}>Đăng</Button>
                            </Stack>
                          } 
                          secondaryAction={
                            <Button onClick={() => setEditTitle(true)} variant="tertiary" startIcon={<Pencil />}>
                              Đổi tên
                            </Button>
                          }
                          title={ title ? title : "Bot Ai"}
                          subtitle="AI languages facebook" 
                          as="h2" 
                        />
                  <ContentLayout>
                    <Box background="neutral0" hasRadius boxshadow>
                      <ReactFlowProvider>
                          <Flow />
                      </ReactFlowProvider>
                    </Box>
                  </ContentLayout>
                  
                  { editTitle && <NodeModal title={title} HandleSaveTitle={HandleSaveTitle}/> }
                  { simChat && <Box className="simchat"><ChatUi title={title} setSimChat={setSimChat}/></Box> }
                  <EditorPanel />
        </Layout>
    </>
  )
}

export default index;
