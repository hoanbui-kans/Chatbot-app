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
  Divider
} from '@strapi/design-system';

import { ArrowLeft } from '@strapi/icons';
import { createConservation } from '../../api/Conservation';
import ChatUi from './components/ChatUi';
import EditorPanel from './components/EditorPanel';
import Flow from './components/Flow';

const index = () => {

  const {app_name, intent_id} = useParams();
  const [AppInfo, setAppInfo] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [conservationIntent, setConservationIntent] = useState(false);

  // Simulator chat
  const [simChat, setSimChat] = useState(false);

  async function HandleCreateConservation(){
    let Flow = [];
    const data = {
      intent: intent,
      flow: Flow
    }
    await createConservation(data);
  }

  return (
    <>
            <Layout>
                <Box background="neutral0">
                      <HeaderLayout 
                        navigationAction={
                            <Link 
                                startIcon={<ArrowLeft />} 
                                to={`/plugins/${pluginId}/${app_name}/intents/`}>
                                Trở lại
                            </Link>
                            }
                            primaryAction={
                                <Stack spacing={3} horizontal>
                                    <Button onClick={() => setSimChat(true)} variant="secondary">
                                        Thử nghiệm
                                    </Button>
                                    <Button onClick={() => { HandleCreateConservation()} } variant="default">
                                        Lưu
                                    </Button>
                                </Stack>
                            } 
                            title={ "Bot Ai"}
                            subtitle="Trường dữ liệu nhận dạng" 
                            as="h2" 
                            />
                  </Box>
                  <Divider />
                  <ContentLayout>
                      <Flow appInfo={AppInfo}/>
                  </ContentLayout>
                  { 
                    simChat && 
                      <Box className="simchat">
                        <ChatUi 
                          appInfo={AppInfo}
                          title={'bot Ai'} 
                          setSimChat={setSimChat}/>
                      </Box>
                  }
        </Layout>
    </>
  )
}

export default index;
