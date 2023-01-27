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
import { createResponse } from '../../api/Response';
import { createConservation } from '../../api/Conservation';

import { findOneWitaiByAppName } from '../../api/witAi';

import { findOneIntent } from '../../api/Intent';
import { findManyEntity } from '../../api/Entity';
import { findManyResponse } from '../../api/Response';

import ChatUi from './components/ChatUi';
import EditorPanel from './components/EditorPanel';
import Loading from '../../components/Loading';
import Flow from './components/Flow';
import { Plus } from '@strapi/icons';

const index = () => {

  const {app_name, intent_id} = useParams();
  const [AppInfo, setAppInfo] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [conservationIntent, setConservationIntent] = useState(false);

  // Simulator chat
  const [simChat, setSimChat] = useState(false);

  const HandleCreateResponse = async () => {
    const response = await createResponse(Edges);
  }

  async function HandleGetConservation () {

  }

  async function HandleCreateConservation (){
    setIsLoading(true);
    let Flow = [];
    const data = {
      intent: intent,
      flow: Flow
    }
    await createConservation(data);
    setIsLoading(false)
  }

  async function HandleGetApp(app_id) {
      const App = await findOneWitaiByAppName(app_id);
      if(App){
          setAppInfo(App);
      }
  }

  async function HandleGetIntent(app_id){
    const response = await findOneIntent(intent_id);
    if(response){
      setConservationIntent(response);
    }
  }

  useEffect( async () => {
      if(!AppInfo){
          await HandleGetApp(app_name);
      } else {
          if(!conservationIntent){
            HandleGetIntent(AppInfo.id);
          }
      }
  }, [AppInfo])
  

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
                                    <Button onClick={() => { HandleCreateConservation()} } variant="default" startIcon={<Plus />}>
                                        Thêm mới
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
                  simChat ? 
                    <Box className="simchat">
                      <ChatUi 
                        appInfo={AppInfo}
                        title={'bot Ai'} 
                        setSimChat={setSimChat}/>
                    </Box> : ""
                  }
                  { isloading && <Loading /> }
        </Layout>
    </>
  )
}

export default index;
