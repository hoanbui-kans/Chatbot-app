import React, { memo, useState, useEffect } from 'react'
import { ChatContainer, ConversationHeader, Avatar, TypingIndicator, MessageSeparator, Message} from '@chatscope/chat-ui-kit-react'
import { SendButton,InputToolbox, MessageInput, MessageList  } from '@chatscope/chat-ui-kit-react'

import { initialNotes } from '../../slice/diagram-builder-slice';

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { useSelector, useDispatch } from 'react-redux';
import { findOneResponse } from '../../../api/Response';

const ChatUi = ({title, setSimChat}) => {
    const dispatch = useDispatch();
    const [typing, setTyping] = useState(false);
    const [chatState, setChatState] = useState([]);

    const nodes = useSelector(initialNotes);
 
    useEffect(() => {
        setTyping(true);
        getDefaultResponse();
        setTimeout(() => {
            setChatState((chatState) => [...chatState, {
                message: "Xin chào Hoàn đẹp trai nhất quả đất, chúng tôi có thể giúp gì được cho bạn?",
                sentTime: new Date(),
                sender: title,
                direction: "incoming",
                position: "last",
                type: "text"
            }]);
            setTyping(false);           
        }, 3000)
    }, [dispatch]);

    const HandleAddMessage = (e) => {
        setChatState((chatState) => [...chatState, {
            message: e,
            sentTime: new Date(),
            sender: "user",
            direction: "outgoing",
            position: "last",
            type: "text"
        }]);
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