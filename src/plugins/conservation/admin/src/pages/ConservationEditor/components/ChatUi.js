import React, { memo, useState, useEffect } from 'react'
import { ChatContainer, ConversationHeader, Avatar, TypingIndicator, MessageSeparator, Message} from '@chatscope/chat-ui-kit-react'
import { SendButton, InputToolbox, MessageInput, MessageList  } from '@chatscope/chat-ui-kit-react'

import { initialNotes } from '../../slice/conservation-builder-slice';
import { v4 as uuidv4 } from 'uuid';

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { useSelector, useDispatch } from 'react-redux';
import { findOneResponse } from '../../../api/Response';
import { useParams } from 'react-router-dom';
import { postMessageConservation, clearConservation } from '../../../api/Conservation';
import { IconButton, Stack } from '@strapi/design-system';
import { Cross, Rotate } from '@strapi/icons';

const ChatUi = ({ appInfo, title, setSimChat }) => {

    const dispatch = useDispatch();

    const [typing, setTyping] = useState(false);
    const [chatState, setChatState] = useState([]);
    const [conservationState, setConservationState] = useState([]);

    const nodes = useSelector(initialNotes);

    const { intent_id, app_name } = useParams();

    async function HandleNewMessage() {

        const sender = "user_" + app_name + "_" + intent_id;
        const recipient = "bot_" + app_name + "_" + intent_id;
        
        await clearConservation(`${sender}-${recipient}`);

        setChatState([]);
        setTyping(true);
        getDefaultResponse();
        setConservationState((conservationState) => [...conservationState, nodes[0].id]);
        setTimeout(() => {
            setChatState((chatState) => [...chatState, {
                message: "Xin chào, để thử nghiệm thực tế cuộc trò chuyện, vui lòng nhắn nội dung câu hỏi liên quan đến cuộc trò chuyện này",
                sentTime: new Date(),
                sender: title,
                direction: "incoming",
                position: "last",
                type: "text"
            }]);
            setTyping(false);           
        }, 300);
    }

    async function HandleAddMessage(message) {

        setTyping(true);

        setChatState((chatState) => [...chatState, {
            message: message,
            sentTime: new Date(),
            sender: "user",
            direction: "outgoing",
            position: "last",
            type: "text"
        }]);

        const sender = "user_" + app_name + "_" + intent_id;
        const recipient = "bot_" + app_name + "_" + intent_id;

        const messageSent = {
            "object": "page",
            "entry": [
                {
                    "messaging": [
                        {
                            "sender": {
                                "id": sender
                            },
                            "recipient": {
                                "id": recipient
                            },
                            "message": {
                                "id": uuidv4(), 
                                "text": message
                            }
                        }
                    ]
                }
            ]
        };
        await HandleSendMessage(messageSent, nodes, appInfo);
        setTyping(false);
    }

    async function HandleSendMessage (message, nodes, appInfo) {
        const response = await postMessageConservation(message, nodes, appInfo);

        setChatState((chatState) => [...chatState, {
            message: response.followUp,
            sentTime: new Date(),
            sender: "user",
            direction: "ongoing",
            position: "last",
            type: "text"
        }]);

        if(response.next){ 
            setTyping(true);
            await HandleSendMessage(message, nodes, appInfo);
        }
    }

    async function HandleRefreshConservation(){
        await HandleNewMessage();
    }

    const getDefaultResponse = async () => {
        const response = await findOneResponse(nodes[0].data.response[0].id);
    }

    useEffect( async () => {
        await HandleNewMessage();
    }, [dispatch]);

    return (
        <>
        <div style={{
            height: "100%"
            }}>
            <ChatContainer>
                <ConversationHeader>
                    <ConversationHeader.Content userName={title} info="Đang hoạt động" />   
                    <ConversationHeader.Actions>
                        <Stack horizontal spacing={2}>
                            <IconButton 
                                onClick={HandleRefreshConservation}
                                icon={<Rotate />} label="Làm mới" />
                            <IconButton 
                                icon={<Cross />} 
                                label="Đóng"  
                                onClick={() => setSimChat(false)}
                            />
                        </Stack>
                    </ConversationHeader.Actions>          
                </ConversationHeader> 
                <MessageList typingIndicator={ typing ? <TypingIndicator content={`${title} đang nhập`} /> : false}>
                        {
                            Array.isArray(chatState) 
                            && chatState.length 
                            ? chatState.map((val, index) => {
                                return(
                                    <Message key={index} model={val} />
                                )
                            }) : ""
                        }
                </MessageList>
                <MessageInput onSend={HandleAddMessage}  placeholder="Nhập nội dung của bạn" sendButton={true} attachButton={false} />
            </ChatContainer>
            </div>
        </>
  )
}

export default memo(ChatUi)