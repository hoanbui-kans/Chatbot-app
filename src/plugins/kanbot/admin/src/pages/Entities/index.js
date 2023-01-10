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
  Box,
  ContentLayout,
  Stack
} from '@strapi/design-system';

import { findManyEntity, createEntity, updateEntity, deleteEntity } from '../../api/Entity';
import { ArrowLeft, Pencil, Plus } from '@strapi/icons';
import SideNav from '../../components/SideNav';
import Loading from '../../components/Loading';

import EntityTable from './components/EntityTable';
import CreateEntityModal from './components/CreateEntityModal';
import UpdateEntityModal from './components/UpdateEntityModal';
import DialogDeleteEntity from './components/DialogDeleteEntity';

import '../style.css'

const index = () => {

    const [entities, setEntities] = useState([]);
    const [entityCreate, setEntityCreate] = useState(false);
    const [entityUpdate, setEntityUpdate] = useState(false);
    const [entityDelete, setEntityDelete] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    async function HandleGetEntities () {
        setIsLoading(true);
        const response = await findManyEntity();
        if(response){
            setEntities(response)
        }
        setIsLoading(false);
    }

    async function HandleCreateEntity (data) {
        setIsLoading(true);
        await createEntity(data);
        await HandleGetEntities();
        setIsLoading(false);
    }

    async function HandleUpdateEntity (id, data) {
        setIsLoading(true);
        await updateEntity(id, data);
        await HandleGetEntities();
        setIsLoading(false);
    }

    async function HandleDeleteEntity (id) {
        setIsLoading(true);
        await deleteEntity(id, data);
        await HandleGetEntities();
        setIsLoading(false);
    }

    useEffect( async () => {
        if(!entities.length) {
            await HandleGetEntities();
        }
    }, [])

    useEffect(() => {
        console.log(entities);
    }, [entities])
    
    
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
                            // Table
                            Array.isArray(entities) 
                            && entities.length 
                            && <EntityTable 
                                    entities={entities}
                                    setEntityCreate={setEntityCreate}
                                    setEntityUpdate={setEntityUpdate}
                                    setEntityDelete={setEntityDelete}
                                />
                        }
                        {
                            // Create Modal
                            entityCreate && 
                            <CreateEntityModal 
                                setEntityCreate={setEntityCreate}
                                HandleCreateEntity={HandleCreateEntity}
                            />
                        }
                        {
                            // Edit Modal
                            entityUpdate && 
                            <UpdateEntityModal 
                                entityUpdate={entityUpdate}
                                setEntityUpdate={setEntityUpdate}
                                HandleUpdateEntity={HandleUpdateEntity}
                            />
                        }
                        {
                            // Delete Dialogue 
                            entityDelete && 
                            <DialogDeleteEntity 
                                entityDelete={entityDelete}
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
