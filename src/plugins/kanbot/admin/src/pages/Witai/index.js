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
  LinkButton, 
  ActionLayout, 
  Button, 
  ContentLayout 
} from '@strapi/design-system';

import WitaiTable from './components/WitaiTable';
import CreateWitaiModal from './components/CreateWitaiModal';
import UpdateWitaiModal from './components/CreateWitaiModal';
import DialogDeleteWitai from './components/DialogDeleteWitai';

import { findManyWitai, findOneWitai , createWitai, updateWitai, deleteWitai } from '../../api/witai'

import Plus from '@strapi/icons/Plus';

import SideNav from '../../components/SideNav'
import Loading from '../../components/Loading';

const HomePage = () => {

  const [isLoading, setIsLoading] = useState(false);

    const [Witai, setWitai] = useState([]);
    const [WitaiCreate, setWitaiCreate] = useState(false);
    const [WitaiUpdate, setWitaiUpdate] = useState(false);
    const [WitaiDelete, setWitaiDelete] = useState(false);

    async function HandleGetWitai () {
        setIsLoading(true);
        const response = await findManyWitai();
        if(response){
            setWitai(response)
        }
        setIsLoading(false);
    }

    async function HandleCreateWitai (data) {
        setIsLoading(true);
        await createWitai(data);
        await HandleGetWitai();
        setIsLoading(false);
    }

    async function HandleUpdateWitai (id, data) {
        setIsLoading(true);
        await updateWitai(id, data);
        await HandleGetWitai();
        setIsLoading(false);
    }

    async function HandleDeleteWitai (id) {
        setIsLoading(true);
        await deleteWitai(id);
        await HandleGetWitai();
        setIsLoading(false);
    }

    useEffect( async () => {
        if(!Witai.length) {
            await HandleGetWitai();
        }
    }, [])

    useEffect(() => {
        console.log(Witai);
    }, [Witai])
    
  return <Layout>
            <HeaderLayout 
                primaryAction={
                    <Button 
                      onClick={() => {setWitaiCreate(true)}}
                      startIcon={<Plus />}>Thêm ứng dụng</Button>} 
                      title="AI Kanbot" 
                      subtitle="Gửi tin nhắn tự động với ứng dụng AI Kanbot" as="h2" 
                    />
                    <ActionLayout startActions={
                        <Button size="M" variant="tertiary">
                            Tài liệu hướng dẫn
                        </Button>
                        } 
                endActions={""}
              />
              <ContentLayout>
                    { 
                        Witai && 
                        <WitaiTable 
                            Witai={Witai}
                            setWitaiCreate={setWitaiCreate}
                            setWitaiUpdate={setWitaiUpdate}
                            setWitaiDelete={setWitaiDelete}
                        />
                    }
                    { 
                        WitaiCreate && 
                        <CreateWitaiModal 
                            setWitaiCreate={setWitaiCreate}
                            HandleCreateWitai={HandleCreateWitai}
                        />
                    }
                    { 
                        WitaiUpdate && 
                        <UpdateWitaiModal 
                            WitaiUpdate={WitaiUpdate}
                            setWitaiUpdate={setWitaiUpdate}
                            HandleUpdateWitai={HandleUpdateWitai}
                        />
                    }
                    { 
                        WitaiDelete && 
                        <DialogDeleteWitai 
                            isLoading={isLoading}
                            WitaiDelete={WitaiDelete}
                            setWitaiDelete={setWitaiDelete}
                            HandleDeleteWitai={HandleDeleteWitai}
                        />
                    }

                    </ContentLayout>
                    { isLoading && <Loading />}
        </Layout>;
}

export default HomePage;
