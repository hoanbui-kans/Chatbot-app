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
  Stack
} from '@strapi/design-system';

import { ArrowLeft } from '@strapi/icons';
import Flow from './components/Flow';
import { ReactFlowProvider } from 'reactflow';
import { initialNotes, initialEdges } from '../slice/diagram-builder-slice';
import { useDispatch, useSelector } from 'react-redux';
import { createResponse } from '../../api/Response';
import { createConservation } from '../../api/Conservation';

import ChatUi from './components/ChatUi';

import EditorEntity from './components/EditorPanel/EditorEntity';
import EditorIntent from './components/EditorPanel/EditorIntent';
import { findOneIntent } from '../../api/Intent';

const index = () => {

  const { id } = useParams();

  const Nodes = useSelector(initialNotes);
  const Edges = useSelector(initialEdges);

  // Title
  const [editBot, setEditBot] = useState(false);
  const [intent, setIntent] = useState('');

  const [loading, setLoading] = useState(false);

  // Simulator chat
  const [simChat, setSimChat] = useState(false);
  
  // Intent
  const [showIntentEditor, setShowIntentEditor] = useState(false);

  const HandleCreateResponse = async () => {
    const response = await createResponse(Edges);
  }

  const HandleCreateConservation = async () => {
    setLoading(true);
    let Flow = [];
    Nodes.map((val, index) => {
        if(index > 0){
          const FlowData = val.data
          const success_response = FlowData.response ? FlowData.response.find((val) => val.id == "success") : "";
          const error_response = FlowData.response ? FlowData.response.find((val) => val.id == "error") : "";
          const data =  {
            entity: FlowData.request ? FlowData.request.id : "",
            success_response: success_response ? success_response.id : "",
            error_response: error_response ? error_response.id : ""
          }
          Flow.push(data);
        }
    })
    const data = {
      intent: intent,
      default_response: parseInt(Nodes[0].data.response[0].id),
      flow: Flow
    }
    await createConservation(data);
    setLoading(false)
  }

  useEffect(() => {
    console.log(Nodes)
  }, [Nodes])

  useEffect( async() => {
      if(!intent){
        const response = await findOneIntent(id);
        if(response){
          setIntent(response)
        }
        console.log(response);
      }
  }, [])

  
  return (
    <>
            <Layout>
                <HeaderLayout 
                    navigationAction={
                        <Link 
                            startIcon={<ArrowLeft />} 
                            to={`/plugins/${pluginId}/intents`}>
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
                                onClick={HandleCreateConservation}>Đăng</Button>
                            </Stack>
                          }
                          title={ intent ? intent.title : "Bot Ai"}
                          as="h2" 
                        />
                  <ContentLayout>
                    <Box background="neutral0" hasRadius boxshadow>
                      <ReactFlowProvider>
                          <Flow />
                      </ReactFlowProvider>
                    </Box>
                  </ContentLayout>
                  { simChat && <Box className="simchat"><ChatUi title={'bot Ai'} setSimChat={setSimChat}/></Box> }
                  <EditorEntity />
                  { showIntentEditor && <EditorIntent showIntent={showIntent} HandleShowIntent={setShowIntentEditor} /> }
        </Layout>
    </>
  )
}

export default index;
