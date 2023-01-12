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
import CreateUtteranceModal from './components/CreateUtteranceModal';
import DialogDeleteUtterance from './components/DialogDeleteUtterance';
import UpdateUtteranceModal from './components/UpdateUtteranceModal';

import { findManyUtterance, findOneUtterance , createUtterance, updateUtterance, deleteUtterance } from '../../api/Utterance'

import '../style.css'

const index = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [utterances, setUtterances] = useState([]);
    const [utteranceCreate, setUtteranceCreate] = useState(false);
    const [utteranceUpdate, setUtteranceUpdate] = useState(false);
    const [utteranceDelete, setUtteranceDelete] = useState(false);

    async function HandleGetUtterances () {
        setIsLoading(true);
        const response = await findManyUtterance();
        if(response){
            setUtterances(response)
        }
        setIsLoading(false);
    }

    async function HandleCreateUtterance (data) {
        setIsLoading(true);
        await createUtterance(data);
        await HandleGetUtterances();
        setIsLoading(false);
    }

    async function HandleUpdateUtterance (id, data) {
        setIsLoading(true);
        await updateUtterance(id, data);
        await HandleGetUtterances();
        setIsLoading(false);
    }

    async function HandleDeleteUtterance (id) {
        setIsLoading(true);
        await deleteUtterance(id);
        await HandleGetUtterances();
        setIsLoading(false);
    }

    useEffect( async () => {
        if(!utterances.length) {
            await HandleGetUtterances();
        }
    }, [])

    useEffect(() => {
        console.log(utterances);
    }, [utterances])

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
                        utterances && 
                        <UtteranceTable 
                            utterances={utterances}
                            setUtteranceCreate={setUtteranceCreate}
                            setUtteranceUpdate={setUtteranceUpdate}
                            setUtteranceDelete={setUtteranceDelete}
                        />
                    }
                    { 
                        utteranceCreate && 
                        <CreateUtteranceModal 
                            setUtteranceCreate={setUtteranceCreate}
                            HandleCreateUtterance={HandleCreateUtterance}
                        />
                    }
                    { 
                        utteranceUpdate && 
                        <UpdateUtteranceModal 
                            utteranceUpdate={utteranceUpdate}
                            setUtteranceUpdate={setUtteranceUpdate}
                            HandleUpdateUtterance={HandleUpdateUtterance}
                        />
                    }
                    { 
                        utteranceDelete && 
                        <DialogDeleteUtterance 
                            isLoading={isLoading}
                            utteranceDelete={utteranceDelete}
                            setUtteranceDelete={setUtteranceDelete}
                            HandleDeleteUtterance={HandleDeleteUtterance}
                        />
                    }

                    </ContentLayout>
                    { isLoading && <Loading />}
            </Layout>
    </>
  )
}

export default index;
