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

import UtteranceTable from './components/UtteranceTable';
import CreateUtterance from './components/CreateUtterance';
import DialogDeleteUtterance from './components/DialogDeleteUtterance';
import UpdateUtterance from './components/UpdateUtterance';

import { findOneWitaiByAppName } from '../../api/witAi';
import { findManyIntent } from '../../api/Intent';
import { findManyEntity } from '../../api/Entity';
import { useParams } from 'react-router-dom';
import { findManyUtterance, createUtterance, updateUtterance, deleteUtterance } from '../../api/Utterance'

import '../style.css'

const index = () => {

    const [isLoading, setIsLoading] = useState(false);

    const { app_name } = useParams();

    const [utteranceCreate, setUtteranceCreate] = useState(false);
    const [utteranceUpdate, setUtteranceUpdate] = useState(false);
    const [utteranceDelete, setUtteranceDelete] = useState(false);

    const [utterances, setUtterances] = useState([]);
    const [entities, setEntities] = useState([]);
    const [intents, setIntents] = useState([]);
    
    const [appInfo, setAppInfo] = useState(false);

    async function HandleGetUtterances(app_id) {
        setIsLoading(true);
        const response = await findManyUtterance(app_id);
        if(response){
            setUtterances(response)
        }
        setIsLoading(false);
    }

    async function HandleCreateUtterance (data) {
        setIsLoading('create');
        data.kanbot_witais = appInfo.id;
        await createUtterance(data);
        await HandleGetUtterances(appInfo.id);
        setIsLoading(false);
    }

    async function HandleUpdateUtterance (id, data) {
        setIsLoading('update');
        data.kanbot_witais = appInfo.id;
        await updateUtterance(id, data);
        await HandleGetUtterances(appInfo.id);
        setIsLoading(false);
    }

    async function HandleDeleteUtterance (id) {
        setIsLoading('delete');
        data.kanbot_witais = appInfo.id;
        await deleteUtterance(id);
        await HandleGetUtterances(appInfo.id);
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

    async function HandleGetApp ( app_name ) {
        const App = await findOneWitaiByAppName( app_name );
        if(App){
            setAppInfo(App);
        }
    }

    useEffect( async() => {
        if(!appInfo){
            await HandleGetApp(app_name);
        } else {
            if(!entities.length) {
                await HandleGetEntities(appInfo.id);
            }
            if(!intents.length) {
                await HandleGetIntents(appInfo.id);
            }
            if(!utterances.length) {
                await HandleGetUtterances(appInfo.id);
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
                                    <Button onClick={() => { setUtteranceCreate(true)} } variant="primary" startIcon={<Plus />}>
                                        Thêm mới
                                    </Button>
                                </Stack>
                            } 
                            title="Cấu trúc câu"
                            subtitle="Chỉnh sửa cấu trúc câu thoại đơn" 
                            as="h2" 
                            />
                    <ContentLayout>
                    { 
                        utteranceCreate ? 
                        <CreateUtterance 
                            intents={intents}
                            entities={entities}
                            isLoading={isLoading}
                            setUtteranceCreate={setUtteranceCreate}
                            HandleCreateUtterance={HandleCreateUtterance}
                        />
                        : utteranceUpdate ?
                        <UpdateUtterance
                            intents={intents}
                            entities={entities}
                            isLoading={isLoading}
                            utteranceUpdate={utteranceUpdate}
                            setUtteranceUpdate={setUtteranceUpdate}
                            HandleUpdateUtterance={HandleUpdateUtterance}
                        />
                        : utteranceDelete ?
                        <DialogDeleteUtterance 
                            isLoading={isLoading}
                            utteranceDelete={utteranceDelete}
                            setUtteranceDelete={setUtteranceDelete}
                            HandleDeleteUtterance={HandleDeleteUtterance}
                        /> :
                        <UtteranceTable 
                            utterances={utterances}
                            setUtteranceCreate={setUtteranceCreate}
                            setUtteranceUpdate={setUtteranceUpdate}
                            setUtteranceDelete={setUtteranceDelete}
                        />
                    }
                    </ContentLayout>
            </Layout>
    </>
  )
}

export default index;
