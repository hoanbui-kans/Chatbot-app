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

import { findManyEntity, createEntity, updateEntity, deleteEntity } from '../../api/Entity';
import { findOneWitaiByAppName } from '../../api/witAi';
import { ArrowLeft, Pencil, Plus } from '@strapi/icons';
import SideNav from '../../components/SideNav';
import Loading from '../../components/Loading';

import EntityTable from './components/EntityTable';
import CreateEntity from './components/CreateEntity';
import UpdateEntity from './components/UpdateEntity';
import DialogDelete from './components/DialogDelete';

import { useParams } from 'react-router-dom';
import '../style.css'

const index = () => {

    const [entities, setEntities] = useState([]);
    const [entityCreate, setEntityCreate] = useState(false);
    const [entityUpdate, setEntityUpdate] = useState(false);
    const [entityDelete, setEntityDelete] = useState(false);
    const [appInfo, setAppInfo] = useState(false);
    const { app_name } = useParams();

    const [isLoading, setIsLoading] = useState(false);

    async function HandleGetApp(app_id) {
        const App = await findOneWitaiByAppName(app_id);
        if(App){
            setAppInfo(App);
        }
    }

    async function HandleGetEntities (app_id) {
        setIsLoading(true);
        const response = await findManyEntity(app_id);
        if(response){
            setEntities(response)
        }
        setIsLoading(false);
    }

    async function HandleCreateEntity (data) {
        setIsLoading("create");
        data.kanbot_witais = appInfo.id;
        await createEntity(data);
        await HandleGetEntities( appInfo.id );
        setIsLoading(false);
    }

    async function HandleUpdateEntity (data) {
        setIsLoading("update");
        data.kanbot_witais = appInfo.id;
        await updateEntity(data);
        await HandleGetEntities( appInfo.id );
        setIsLoading(false);
    }

    async function HandleDeleteEntity (data) {
        setIsLoading("delete");
        data.kanbot_witais = appInfo.id;
        await deleteEntity(entity);
        await HandleGetIntent(appInfo.id);
        setEntityDelete(false);
        setIsLoading(false);
    }

    useEffect( async () => {
        if(!appInfo){
            await HandleGetApp(app_name);
        } else {
            if(!entities.length) {
                await HandleGetEntities( appInfo.id );
            }
        }
    }, [appInfo])
    
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
                                    <Button onClick={() => { setEntityCreate(true)} } variant="primary" startIcon={<Plus />}>
                                        Thêm mới
                                    </Button>
                                </Stack>
                            } 
                            title="Trường dữ liệu"
                            subtitle="Trường dữ liệu nhận dạng" 
                            as="h2" 
                            />
                    <ContentLayout>
                        {
                            entityCreate ? 
                            <CreateEntity
                                setEntityCreate={setEntityCreate}
                                isLoading={isLoading}
                                HandleCreateEntity={HandleCreateEntity}
                            /> : entityUpdate ? 
                            <UpdateEntity 
                                entityUpdate={entityUpdate}
                                isLoading={isLoading}
                                setEntityUpdate={setEntityUpdate}
                                HandleUpdateEntity={HandleUpdateEntity}
                            /> :
                            <EntityTable 
                                entities={entities}
                                setEntityCreate={setEntityCreate}
                                setEntityUpdate={setEntityUpdate}
                                setEntityDelete={setEntityDelete}
                            />
                        }
                        {
                            entityDelete && 
                            <DialogDelete 
                                entityDelete={entityDelete}
                                isLoading={isLoading}
                                setEntityDelete={setEntityDelete}
                                HandleDeleteEntity={HandleDeleteEntity}
                            />
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
