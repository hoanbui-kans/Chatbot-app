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
import { ArrowLeft, Pencil, Plus } from '@strapi/icons';
import SideNav from '../../components/SideNav';
import Loading from '../../components/Loading';

import ConnectionTable from './components/ConnectionTable';
import CreateConnectionModal from './components/CreateConnectionModal';
import UpdateConnectionModal from './components/UpdateConnectionModal';
import DialogDeleteConnection from './components/DialogDeleteConnection';

import { getFaceBookConnection, createFaceBookConnection, updateFacebookConnection, deleteFacebookConnection } from '../../api/Facebook';

import { useQueryParams } from '@strapi/helper-plugin';

import '../style.css'

const index = () => {

    const [Connection, setConnection] = useState([]);
    const [Pagination, setPagination] = useState(false);
    const [ConnectionCreate, setConnectionCreate] = useState(false);
    const [ConnectionUpdate, setConnectionUpdate] = useState(false);
    const [ConnectionDelete, setConnectionDelete] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const query = useQueryParams()[0].rawQuery;

    async function HandleGetConnection () {
        setIsLoading(true);
        const response = await getFaceBookConnection(query);
        if(response){
            setConnection(response.results)
            setPagination(response.pagination)
        }
        setIsLoading(false);
    }

    async function HandleCreateConnection (data) {
        setIsLoading('create');
        await createFaceBookConnection(data);
        await HandleGetConnection();
        setIsLoading(false);
    }

    async function HandleUpdateConnection (data){
        setIsLoading('update');
        await updateFacebookConnection(data);
        await HandleGetConnection();
        setIsLoading(false);
    }

    async function HandleDeleteConnection (id) {
        setIsLoading(true);
        await deleteFacebookConnection(id);
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
                                title="Facebook"
                                subtitle="Quản lý các kết nối trang facebook" 
                                as="h2" 
                                />
                        <ContentLayout>
                            <ConnectionTable 
                                Connection={Connection}
                                Pagination={Pagination}
                                setConnectionCreate={setConnectionCreate}
                                setConnectionUpdate={setConnectionUpdate}
                                setConnectionDelete={setConnectionDelete}
                            />
                            {
                                // Create Modal
                                ConnectionCreate && 
                                    <CreateConnectionModal 
                                        isLoading={isLoading}
                                        Connection={Connection}
                                        HandleUpdateConnection={HandleUpdateConnection}
                                        setConnectionCreate={setConnectionCreate}
                                        HandleCreateConnection={HandleCreateConnection}
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
