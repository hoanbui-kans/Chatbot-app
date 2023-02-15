/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from 'react';
import pluginId from '../../pluginId';
import { 
  Layout, 
  HeaderLayout, 
  Button, 
  Link,
  ContentLayout,
  Stack
} from '@strapi/design-system';

import { ArrowLeft, Pencil, Plus } from '@strapi/icons';
import SideNav from '../../components/SideNav'
import Loading from '../../components/Loading';

import ResponseTable from './components/ResponseTable';
import CreateResponse from './components/CreateResponse';
import DeleteResponse from './components/DeleteResponse';
import UpdateResponse from './components/UpdateResponse';

import { findManyIntent } from '../../api/Intent';
import { findManyEntity } from '../../api/Entity';
import { useParams } from 'react-router-dom';
import { findManyResponse, createResponse, updateResponse, deleteResponse } from '../../api/Response'

import '../style.css'

const index = () => {

    const [isLoading, setIsLoading] = useState(false);

    const { app_name } = useParams();

    const [ResponseCreate, setResponseCreate] = useState(false);
    const [ResponseUpdate, setResponseUpdate] = useState(false);
    const [ResponseDelete, setResponseDelete] = useState(false);

    const [Responses, setResponses] = useState([]);
    const [entities, setEntities] = useState([]);
    const [intents, setIntents] = useState([]);
    
    const [appInfo, setAppInfo] = useState(false);

    async function HandleGetResponses(app_id) {
        setIsLoading(true);
        const response = await findManyResponse(app_id);
        if(response){
            setResponses(response)
        }
        setIsLoading(false);
    }

    async function HandleCreateResponse (data) {
        setIsLoading('create');
        data.kanbot_witais = appInfo.id;
        await createResponse(data);
        await HandleGetResponses(appInfo.id);
        setIsLoading(false);
    }

    async function HandleUpdateResponse (id, data) {
        setIsLoading('update');
        data.kanbot_witais = appInfo.id;
        await updateResponse(id, data);
        await HandleGetResponses(appInfo.id);
        setIsLoading(false);
    }

    async function HandleDeleteResponse (response) {
        setIsLoading('delete');
        await deleteResponse(response.id);
        await HandleGetResponses(appInfo.id);
        setIsLoading(false);
    }

    async function HandleGetEntities (app_id) {
        setIsLoading(true);
        const response = await findManyEntity(app_id);
        if(response){
            setEntities(response)
        }
        setIsLoading(false);
    }
  
    async function HandleGetIntents (app_id) {
        const response = await findManyIntent(app_id);
        if(Array.isArray(response) && response.length){
            setIntents(response);
        }
    }


    useEffect( async() => {
        if(!entities.length) {
            await HandleGetEntities(appInfo.id);
        }
        if(!intents.length) {
            await HandleGetIntents(appInfo.id);
        }
        if(!Responses.length) {
            await HandleGetResponses(appInfo.id);
        }
      }, [appInfo]);

    return (
        <>
        <Layout sideNav={<SideNav />}>
                    <HeaderLayout 
                        navigationAction={
                            <Link 
                                startIcon={<ArrowLeft />} 
                                to={`/plugins/${pluginId}`}>
                                Trở lại
                            </Link>
                            }
                            primaryAction={
                                <Stack spacing={3} horizontal>
                                    <Button variant="secondary" startIcon={<Pencil />}>
                                        Tài liệu tham khảo
                                    </Button>
                                    <Button onClick={() => { setResponseCreate(true)} } variant="primary" startIcon={<Plus />}>
                                        Thêm mới
                                    </Button>
                                </Stack>
                            } 
                            title="Cấu trúc câu"
                            subtitle="Chỉnh sửa cấu trúc câu thoại đơn" 
                            as="h2" 
                            />
                    <ContentLayout>
                    <ResponseTable 
                        Responses={Responses}
                        setResponseCreate={setResponseCreate}
                        setResponseUpdate={setResponseUpdate}
                        setResponseDelete={setResponseDelete}
                    />
                    { 
                        ResponseCreate ? 
                        <CreateResponse 
                            intents={intents}
                            entities={entities}
                            isLoading={isLoading}
                            setResponseCreate={setResponseCreate}
                            HandleCreateResponse={HandleCreateResponse}
                        /> : ""
                    }
                    {
                        ResponseUpdate ?
                        <UpdateResponse
                            intents={intents}
                            entities={entities}
                            isLoading={isLoading}
                            ResponseUpdate={ResponseUpdate}
                            setResponseUpdate={setResponseUpdate}
                            HandleUpdateResponse={HandleUpdateResponse}
                        /> :""
                    }
                    {
                        ResponseDelete ?
                        <DeleteResponse 
                            isLoading={isLoading}
                            ResponseDelete={ResponseDelete}
                            setResponseDelete={setResponseDelete}
                            HandleDeleteResponse={HandleDeleteResponse}
                        /> : ""
                    }
                    </ContentLayout>
            </Layout>
    </>
  )
}

export default index;
