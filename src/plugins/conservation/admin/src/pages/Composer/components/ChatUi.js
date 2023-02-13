import React, { memo, useState, useEffect } from 'react'
import { ChatContainer, ConversationHeader, Avatar, TypingIndicator, MessageSeparator, Message} from '@chatscope/chat-ui-kit-react'
import { SendButton,InputToolbox, MessageInput, MessageList  } from '@chatscope/chat-ui-kit-react'

import { initialNotes } from '../../slice/diagram-builder-slice';
import { useSelector, useDispatch } from 'react-redux';
import { findOneResponse } from '../../../api/Response';
import { v4 as uuidv4 } from 'uuid'; 
import { postMessageConservation } from '../../../api/Conservation';
import { useParams } from 'react-router-dom';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const ChatUi = ({title, setSimChat}) => {
    const dispatch = useDispatch();

    const [typing, setTyping] = useState(false);
    const [chatState, setChatState] = useState([]);
    const [conservationState, setConservationState] = useState([]);
    const sessionId = uuidv4();
    const nodes = useSelector(initialNotes);
    const params = useParams();

    useEffect(() => {
        setTyping(true);
        getDefaultResponse();
        setConservationState((conservationState) => [...conservationState, nodes[0].id]);
        setTimeout(() => {
            setChatState((chatState) => [...chatState, {
                message: "Xin chào, chúng tôi có thể giúp gì được cho bạn?",
                sentTime: new Date(),
                sender: title,
                direction: "incoming",
                position: "last",
                type: "text"
            }]);
            setTyping(false);           
        }, 3000)
    }, [dispatch]);

    const HandleAddMessage = async (message) => {
        console.log(message);
        setTyping(true);
        setChatState((chatState) => [...chatState, {
            message: message,
            sentTime: new Date(),
            sender: "user",
            direction: "outgoing",
            position: "last",
            type: "text"
        }]);
        await HandleSendMessage({
            "object": "page",
            "entry": [
                {
                    "messaging": [
                        {
                            "sender": {
                                "id": "user_" + sessionId
                            },
                            "recipient": {
                                "id": "bot_" + sessionId
                            },
                            "message": {
                                "id": sessionId,
                                "text": message
                            }
                        }
                    ]
                }
            ]
        });
       setTimeout(() => {
        setTyping(false);
       }, 2000);
    }

    const HandleSendMessage = async (message) => {
        const response = await postMessageConservation(message);
        console.log(response);
        // setChatState((chatState) => [...chatState, {
        //     message: e,
        //     sentTime: new Date(),
        //     sender: "user",
        //     direction: "ongoing",
        //     position: "last",
        //     type: "text"
        // }]);
    }

    const getDefaultResponse = async () => {
        const response = await findOneResponse(nodes[0].data.response[0].id);
        console.log(response);
    }

    return (
        <>
        <div style={{
            height: "100%"
            }}>
            <ChatContainer>
                <ConversationHeader>
                    <ConversationHeader.Back onClick={() => setSimChat(false)}/>
                    <ConversationHeader.Content userName={title} info="Đang hoạt động" />       
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