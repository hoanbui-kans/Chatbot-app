import React from 'react'
import { ConversationList,Conversation, Avatar} from '@chatscope/chat-ui-kit-react'
import { Typography } from '@strapi/design-system';

const index = ({conservations, conservation, setConservation}) => {
  return (
    <>
        <ConversationList>        
            {
                Array.isArray(conservations) && conservations.length ? 
                    conservations.map((val) => {
                        const { participant } = val; 
                        return (
                            <Conversation key={participant.id} name={participant.name} onClick={() => setConservation(val)}>
                                <Avatar src="http://localhost:1337/uploads/user_avatar_463853c9e9.jpg?updated_at=2023-02-23T07:50:44.105Z" name={participant.name} />
                            </Conversation>
                        )
                    })
                : ""
            }
        </ConversationList>
    </>
  )
}

export default index