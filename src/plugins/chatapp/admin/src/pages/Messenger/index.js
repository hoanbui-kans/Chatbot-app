/*
*
* Messenger
*
*/

import React, { useState, useEffect } from 'react'
import pluginId from '../../pluginId';
import { v4 as uuidv4 } from 'uuid';
import { 
 Layout, 
 HeaderLayout, 
 Link,
 ContentLayout,
} from '@strapi/design-system';
import { ArrowLeft } from '@strapi/icons';
import { findOnePage, getAllConservation, getAllMessages, getMessageInfo, getConservationParticipant, getUserInfo, sendMessage } from '../../api/facebook';
import ConservationUserList from './Components/ConservationUserList';
import ConservationScreen from './Components/ConservationScreen';
import { useParams } from 'react-router-dom';

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Loading from '../../components/Loading';

const index = () => {

    const params = useParams();
    const { page_id } = params;
    const [page, setPage] = useState(false);
    const [conservations, setConservations] = useState([]);
    const [conservation, setConservation] = useState(false);
    const [chatState, setChatState] = useState([]);
    const [typing, setTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

   async function HandleGetPage () {
        if(!page){
            const pageInfo = await findOnePage(page_id);
            setPage(pageInfo)
        }
   }

   async function handleGetConservations (page) {
        setIsLoading(true);
       const response = await getAllConservation(page);
       if(response){
            if(Array.isArray(response.data) && response.data.length){
                response.data.map( async (conservation, index) => {
                    if(conservation){
                        const conservationParticipant = await getConservationParticipant(page, conservation);
                        if(conservationParticipant){
                            const participant = conservationParticipant.participants.data[0];
                            // const userProfile = await getUserInfo(page, participant.id);
                            if(index == 0){
                                setConservation({ participant, conservation });
                            }
                            setConservations((conservations) => [...conservations, {  participant, conservation }])
                        }
                    }
                })
            }
       }
       setIsLoading(false);
   }

   async function HandleGetAllMessages (page, conservation) {
        setIsLoading(true);
        setChatState([]);
        const conservationData = await getAllMessages(page, conservation);
        if(conservationData){
            const { messages } = conservationData;
            if(Array.isArray(messages.data) && messages.data.length){
                Array.from(messages.data).forEach( async (message) => {
                    const messageInfo = await getMessageInfo(page, message);
                    setChatState((chatState) => [...chatState, messageInfo])
                })
            }
        }
        setIsLoading(false);
   }
   
    const HandleSendMessage = async (message) => {
        const response = await sendMessage(page, conservation.participant, message);
        if(response){
            await HandleGetAllMessages(page, conservation);
            return response;
        }
    }


    useEffect( async () => {
        if(!page){
            HandleGetPage()
        }
    }, []);
    

    useEffect(() => {
        if(page){
            handleGetConservations(page);
        }
    }, [page])

    useEffect(() => {
        if(conservation){
            HandleGetAllMessages(page, conservation.conservation);
        }
    }, [conservation])


    if(isLoading){
        return <Loading />
    }

    return (
       <>
        <Layout>
                <HeaderLayout 
                    navigationAction={
                            <Link 
                                startIcon={<ArrowLeft />} 
                                to={`/plugins/${pluginId}`}>
                                Trở lại
                            </Link>
                            }
                    title={page ? page.title : ""}
                    as="h2" 
                    />
                    <ContentLayout style={{padding: 0}}>
                    <Layout 
                        sideNav={
                            <ConservationUserList 
                                conservations={conservations}
                                conservation={conservation}
                                setConservation={setConservation}
                            />}>
                        <ContentLayout>
                            <ConservationScreen 
                                typing={typing}
                                chatState={chatState}
                                HandleSendMessage={HandleSendMessage}
                            />
                    </ContentLayout>
                </Layout>
            </ContentLayout>
        </Layout>
   </>
 )
}

export default index;
