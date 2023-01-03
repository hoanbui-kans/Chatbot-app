import React from 'react'
import DefaultNodeController from './controllers/DefaultNodeController'

const EditorPanel = ({data}) => {
    if(!data) return false;
    let { type } = data;
    if(!type ) return false;

    switch(type){
        case('default-template'):
            return (
                <DefaultNodeController data={data} />
            )
            break;
        default: 
            return false
    }
}

export default EditorPanel