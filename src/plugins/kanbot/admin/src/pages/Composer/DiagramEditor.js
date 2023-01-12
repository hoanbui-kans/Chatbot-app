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
import { findOneIntent } from '../../api/Intent';
import Loading from '../../components/Loading';

const index = () => {

  const { id } = useParams();

  const Nodes = useSelector(initialNotes);
  const Edges = useSelector(initialEdges);

  const [isloading, setIsLoading] = useState(false);
  const [addNode, setAddNode] = useState(false);

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
                <HeaderLayout 
                    navigationAction={
                        <Link 
                            startIcon={<ArrowLeft />} 
                            to={`/plugins/${pluginId}/intents`}>
                              Trở lại
                        </Link>
                          }
                          secondaryAction={<Button onClick={() => setAddNode(true)}>+ Add node</Button>}
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
                          as="h2" 
                        />
                  <ContentLayout>
                    <Box background="neutral0" hasRadius boxshadow>
                      <ReactFlowProvider>
                          <Flow addNode={addNode} setAddNode={setAddNode}/>
                      </ReactFlowProvider>
                      <EditorEntity />
                    </Box>
                  </ContentLayout>

                  { simChat && <Box className="simchat"><ChatUi title={'bot Ai'} setSimChat={setSimChat}/></Box> }
                  { isloading && <Loading />}

        </Layout>
    </>
  )
}

export default index;
