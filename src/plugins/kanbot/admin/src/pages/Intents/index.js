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
import SideNav from '../../components/SideNav'
import IntentsTable from './components/IntentsTable'
import CreateIntentModal from './components/CreateIntentModal'
import UpdateIntentModal from './components/UpdateIntentModal'
import DialogDeleteIntent from './components/DialogDeleteIntent'

import { 
    findManyIntent, 
    createIntent, 
    updateIntent, 
    deleteIntent 
} from '../../api/Intent';

import { findManyEntity } from '../../api/Entity';
import Loading from '../../components/Loading';

import '../style.css'

const index = () => {

    const [entities, setEntities] = useState([]);
    const [intents, setIntents] = useState([]);
    const [intentCreate, setIntentCreate] = useState(false);
    const [intentUpdate, setIntentUpdate] = useState(false);
    const [intentDelete, setIntentDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function HandleGetIntents () {
        const response = await findManyIntent();
        if(Array.isArray(response) && response.length){
            setIntents(response);
        }
    }

    async function HandleCreateIntent (data) {
        setIsLoading(true);
        const response = await createIntent(data);
        if(response){
            HandleGetIntents();
        }
        setIntentCreate(false);
        setIsLoading(false);
    }

    async function HandleUpdateIntent(id, data) {
        setIsLoading(true);
        const response = await updateIntent(id, data);
        if(response){
            HandleGetIntents();
        }
        setIsLoading(false);
    }

    async function HandleDeleteIntent (id) {
        setIsLoading(true);
        const response = await deleteIntent(id);
        setIsLoading(false);
        if(response){
            HandleGetIntents();
        }
    }

    // Entities
    async function HandleGetEntities(){
        const response = await findManyEntity();
        if(Array.isArray(response) && response.length) {
            setEntities(response)
        }
    }

    useEffect(() => {
        if(!intents.length){
            HandleGetIntents();
        }
        if(!entities.length){
            HandleGetEntities();
        }
    }, []);

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
                    intents && 
                    <IntentsTable 
                        intents={intents} 
                        setIntentCreate={setIntentCreate}
                        setIntentDelete={setIntentDelete}
                        setIntentUpdate={setIntentUpdate}
                    />
                }
                {
                    entities && intentCreate &&
                    <CreateIntentModal 
                        entities={entities}
                        setIntentCreate={setIntentCreate}
                        HandleCreateIntent={HandleCreateIntent}
                    />
                }
                
                {
                    entities && intentUpdate && 
                    <UpdateIntentModal 
                        entities={entities}
                        intentUpdate={intentUpdate}
                        setIntentUpdate={setIntentUpdate}
                        HandleUpdateIntent={HandleUpdateIntent}
                    />
                }

                {
                    intentDelete && 
                    <DialogDeleteIntent HandleDeleteIntent={HandleDeleteIntent}/>
                }
                
                </ContentLayout>
                {
                    isLoading && <Loading />
                }
        </Layout>
    </>
  )
}

export default index;
