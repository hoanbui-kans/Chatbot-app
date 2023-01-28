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

import { ArrowLeft, Pencil } from '@strapi/icons';
import SideNav from '../../components/SideNav';

import IntentsTable from './components/IntentsTable';
import CreateIntent from './components/CreateIntent';
import UpdateIntent from './components/UpdateIntent';
import DeleteIntent from './components/DeleteIntent';

import { 
    findManyIntent, 
    createIntent, 
    deleteIntent, 
    updateIntent
} from '../../api/Intent';

import { findOneWitaiByAppName } from '../../api/witAi';
import { findManyEntity } from '../../api/Entity';
import { useParams } from 'react-router-dom'; 

import slugify from 'slugify';
import '../style.css'

const index = () => {

    const [entities, setEntities] = useState([]);
    const [intents, setIntents] = useState([]);
    const [appInfo, setAppInfo] = useState(false);

    const [intentCreate, setIntentCreate] = useState(false);
    const [intentUpdate, setIntentUpdate] = useState(false);
    const [intentDelete, setIntentDelete] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const { app_name } = useParams();

    async function HandleGetApp ( app_id ) {
        const App = await findOneWitaiByAppName( app_id );
        if(App){
            setAppInfo(App);
        }
    }

    async function HandleGetIntents (app_id) {
        const response = await findManyIntent(app_id);
        if(Array.isArray(response)){
            setIntents(response);
        }
    }

    async function HandleCreateIntent(data) {
        setIsLoading("create");
        data.kanbot_witais = appInfo.id;
        data.name = slugify(
            data.title, { 
            replacement: '_',
            locale: 'vi'
        });
        await createIntent( appInfo.server_access_token, data);
        await HandleGetIntents(appInfo.id);
        setIntentCreate(false);
        setIsLoading(false);
    }

    async function HandleUpdateIntent (id, data) {
        setIsLoading("update");
        data.kanbot_witais = appInfo.id;
        await updateIntent(id, data);
        await HandleGetIntents(appInfo.id);
        setIntentUpdate(false);
        setIsLoading(false);
    }

    async function HandleDeleteIntent (data) {
        setIsLoading("delete");
        data.kanbot_witais = appInfo.id;
        await deleteIntent(data);
        await HandleGetIntents(appInfo.id);
        setIntentDelete(false);
        setIsLoading(false);
    }

    // Entities
    async function HandleGetEntities(app_id){
        const response = await findManyEntity(app_id);
        if(Array.isArray(response) && response.length) {
            setEntities(response)
        }
    }

    useEffect( async () => {
        if(!appInfo){
            await HandleGetApp(app_name);
        } else {
            if(!intents.length){
                await HandleGetIntents(appInfo.id);
            }
            if(!entities.length){
                await HandleGetEntities(appInfo.id);
            }
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
                            <Button onClick={() => { setIntentCreate(true)} } variant="primary" startIcon={<Pencil />}>
                                Thêm mới
                            </Button>
                        </Stack>
                    } 
                    title="Chiến dịch"
                    subtitle="Tạo cuộc hội thoại từ chiến dịch" 
                    as="h2" 
                />
            <ContentLayout> 
                {
                    intentCreate ?
                    <CreateIntent 
                        isLoading={isLoading}
                        entities={entities}
                        setIntentCreate={setIntentCreate}
                        HandleCreateIntent={HandleCreateIntent}
                    /> :                    
                    intentUpdate ?
                    <UpdateIntent 
                        isLoading={isLoading}
                        entities={entities}
                        intentUpdate={intentUpdate}
                        setIntentUpdate={setIntentUpdate}
                        HandleUpdateIntent={HandleUpdateIntent}
                    /> :               
                    <IntentsTable 
                        intents={intents} 
                        isLoading={isLoading}
                        setIntentUpdate={setIntentUpdate}
                        setIntentCreate={setIntentCreate}
                        setIntentDelete={setIntentDelete}
                    />
                }
                {
                    intentDelete ?
                    <DeleteIntent 
                        intentDelete={intentDelete}
                        isLoading={isLoading}
                        setIntentDelete={setIntentDelete}
                        HandleDeleteIntent={HandleDeleteIntent}
                    /> : ""
                }
                </ContentLayout>
        </Layout>
    </>
  )
}

export default index;
