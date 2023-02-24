import React, { useState } from 'react';

import { 
    ChatContainer, ConversationHeader, 
    TypingIndicator, Message, MessageList,
    MessageInput 
} from '@chatscope/chat-ui-kit-react'
import { useParams } from 'react-router-dom';

const index = ({ typing, chatState, HandleSendMessage}) => {

    const params = useParams();
    const { page_id } = params;
    const [ value, setValue ] = useState('');

    const HandleAddMessage = async (message) => {
        await HandleSendMessage(message);
        setValue('');
    }

    return (
        <>
        <ChatContainer>
            <ConversationHeader>
                    <ConversationHeader.Content userName={'title'} info="Đang hoạt động" />   
                        {/* <ConversationHeader.Actions>
                            <Stack horizontal spacing={2}>
                            </Stack>
                        </ConversationHeader.Actions>           */}
                    </ConversationHeader> 
                    <MessageList typingIndicator={ typing ? <TypingIndicator content={`bot đang nhập`} /> : false}>
                            {
                                Array.isArray(chatState) 
                                    && chatState.length 
                                    ? chatState.reverse().map((message, index) => {
                                        const model = message.from.id == page_id ? 
                                        {
                                            message: message.message,
                                            sentTime: message.created_time,
                                            sender: message.from.name,
                                            direction: "outgoing",
                                            position: "last"
                                        }: {
                                            message: message.message,
                                            sentTime: message.created_time,
                                            sender: message.from.name,
                                            direction: "incoming",
                                            position: "last"
                                        }
                                        return(
                                            <Message key={index} model={model} />
                                        )
                                    }) : ""
                            }
                    </MessageList>
                    <MessageInput 
                        onSend={HandleAddMessage}  
                        placeholder="Nhập nội dung của bạn" 
                        sendButton={true} 
                        attachButton={false} 
                        onChange={(val) => setValue(val)} 
                        value={value}
                        onPaste={(evt) => {
                            setValue(evt.clipboardData.getData("text"));
                        }}
                    />
            </ChatContainer>
        </>
  )
}

export default index