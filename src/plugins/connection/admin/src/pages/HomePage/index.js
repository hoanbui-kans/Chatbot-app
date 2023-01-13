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

import { findManyConnection, createConnection, updateConnection, deleteConnection } from '../../api/Connection';
import { ArrowLeft, Pencil, Plus } from '@strapi/icons';
import SideNav from '../../components/SideNav';
import Loading from '../../components/Loading';

import ConnectionTable from './components/ConnectionTable';
import CreateConnectionModal from './components/CreateConnectionModal';
import UpdateConnectionModal from './components/UpdateConnectionModal';
import DialogDeleteConnection from './components/DialogDeleteConnection';

import '../style.css'

const index = () => {

    const [Connection, setConnection] = useState([]);
    const [ConnectionCreate, setConnectionCreate] = useState(false);
    const [ConnectionUpdate, setConnectionUpdate] = useState(false);
    const [ConnectionDelete, setConnectionDelete] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    async function HandleGetConnection () {
        setIsLoading(true);
        const response = await findManyConnection();
        if(response){
            setConnection(response)
        }
        setIsLoading(false);
    }

    async function HandleCreateConnection (data) {
        setIsLoading(true);
        await createConnection(data);
        await HandleGetConnection();
        setIsLoading(false);
    }

    async function HandleUpdateConnection (id, data) {
        setIsLoading(true);
        await updateConnection(id, data);
        await HandleGetConnection();
        setIsLoading(false);
    }

    async function HandleDeleteConnection (id) {
        setIsLoading(true);
        await deleteConnection(id);
        await HandleGetConnection();
        setIsLoading(false);
    }

    useEffect( async () => {
        if(!Connection.length) {
            await HandleGetConnection();
        }
    }, [])

    useEffect(() => {
        console.log(ConnectionDelete);
    }, [ConnectionDelete])
    
    
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
                                    <Button onClick={() => { setConnectionCreate(true)} } variant="primary" startIcon={<Plus />}>
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
                            Array.isArray(Connection) 
                            && Connection.length 
                            && <ConnectionTable 
                                    Connection={Connection}
                                    setConnectionCreate={setConnectionCreate}
                                    setConnectionUpdate={setConnectionUpdate}
                                    setConnectionDelete={setConnectionDelete}
                                />
                        }
                        {
                            // Create Modal
                            ConnectionCreate && 
                            <CreateConnectionModal 
                                setConnectionCreate={setConnectionCreate}
                                HandleCreateConnection={HandleCreateConnection}
                            />
                        }
                        {
                            // Edit Modal
                            ConnectionUpdate && 
                            <UpdateConnectionModal 
                                ConnectionUpdate={ConnectionUpdate}
                                setConnectionUpdate={setConnectionUpdate}
                                HandleUpdateConnection={HandleUpdateConnection}
                            />
                        }
                        {
                            // Delete Dialogue 
                            ConnectionDelete && 
                            <DialogDeleteConnection 
                                ConnectionDelete={ConnectionDelete}
                                setConnectionDelete={setConnectionDelete}
                                HandleDeleteConnection={HandleDeleteConnection}
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
