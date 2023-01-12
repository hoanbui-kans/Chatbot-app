/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from 'react';
import pluginId from '../../pluginId';
import { useParams } from 'react-router-dom';

import { 
  Layout, 
  HeaderLayout, 
  Button, 
  Link,
  Box,
  ContentLayout,
  Stack,
  BaseHeaderLayout,
  Divider
} from '@strapi/design-system';

import { ArrowLeft } from '@strapi/icons';
import { createResponse } from '../../api/Response';
import { createConservation } from '../../api/Conservation';

import ChatUi from '../Composer/components/ChatUi';

import EditorEntity from '../Composer/components/EditorPanel/EditorEntity';
import AddNodeModal from  './components/AddNodeModal';

import { findOneIntent } from '../../api/Intent';
import Loading from '../../components/Loading';
import Flow from './components/Flow';
import { Plus, Pencil } from '@strapi/icons';

const index = () => {

  const { id } = useParams();

  const [isloading, setIsLoading] = useState(false);

  // Simulator chat
  const [simChat, setSimChat] = useState(false);

  // Intent
  const [intent, setIntent] = useState('');

  const HandleCreateResponse = async () => {
    const response = await createResponse(Edges);
  }

  const HandleCreateConservation = async () => {
    setIsLoading(true);
    let Flow = [];
    
    const data = {
      intent: intent,
      flow: Flow
    }
    await createConservation(data);
    setIsLoading(false)
  }

  useEffect( async() => {
      if(!intent){
        const response = await findOneIntent(id);
        if(response){
          setIntent(response)
        }
      }
  }, [])

  return (
    <>
            <Layout>
                <Box background="neutral0">
                      <BaseHeaderLayout navigationAction={
                          <Link 
                              startIcon={<ArrowLeft />} 
                              to={`/plugins/${pluginId}/intents`}>
                                Trở lại
                          </Link>} 
                          primaryAction={
                            <Stack spacing={3} horizontal>
                              <Button variant={simChat ? 'danger-light' : 'success-light'} onClick={() => { setSimChat(!simChat) }}>Thử nghiệm</Button>
                              <Button 
                                onClick={() => HandleCreateResponse('draft')} variant="secondary">Lưu nháp</Button>
                              <Button 
                                onClick={HandleCreateConservation}>Đăng</Button>
                            </Stack>
                          } 
                          title={ intent ? intent.title : "Bot Ai"}
                          as="h2"  />
                  </Box>
                  <Divider />
                  <ContentLayout>
                      <Flow />
                  </ContentLayout>

                  { simChat && <Box className="simchat"><ChatUi title={'bot Ai'} setSimChat={setSimChat}/></Box> }
                  { isloading && <Loading />}
                  <EditorEntity />
        </Layout>
    </>
  )
}

export default index;
