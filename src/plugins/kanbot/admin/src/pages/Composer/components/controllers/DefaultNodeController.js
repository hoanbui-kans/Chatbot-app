import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateNode, updateNodeData } from '../../../slice/diagram-builder-slice';
import { Stack, Button, Box, Typography } from '@strapi/design-system';
import ResponseController from './ResponseController';
const DefaultNodeController = ({data}) => {
  const [ NodeValue, setNodeValue] = useState(false);
  const dispatch = useDispatch();

  const HandleUpdateNode = () => {
    let UpdateNode = {...data, data: {
      title: NodeValue,
      value: NodeValue
    }};
    
    dispatch(updateNodeData(UpdateNode));
  }
  return (
    <div>
        <ResponseController />
    </div>
  )
}

export default DefaultNodeController