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
import SideNav from '../../components/SideNav';
import Loading from '../../components/Loading';
import { getFaceBookConnection, getAllConservation, getAllMessages, getMessageInfo } from '../../api/facebook';

const index = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [pages, setPages] = useState([]);
    const [conservations, setConservations] = useState(false);
    const [messages, setMessages] = useState(false);
    
    async function HandleGetAllPages() {
        const response = await getFaceBookConnection();
        setPages(response.results);
    }

    useEffect(() => {
        if(!pages.length){
            HandleGetAllPages();
        }
    }, [])

    
    async function getConservations (page) {
        const conservations = await getAllConservation(page);
        if(conservations){
            setConservations(conservations.data)
        }
    }

    async function getMessages (page, conservation) {
        const conservationData = await getAllMessages(page, conservation);
        if(conservationData){
            const { messages } = conservationData;
            if(Array.isArray(messages.data) && messages.data.length){
                Array.from(messages.data).forEach( async (message) => {
                    const messageInfo = await getMessageInfo(page, message);
                    console.log(messageInfo)
                })
            }
        }
    }

    return (
        <>
        <Layout sideNav={<SideNav pages={pages}/>}>
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
                   
                    </ContentLayout>
            </Layout>
    </>
  )
}

export default index;
