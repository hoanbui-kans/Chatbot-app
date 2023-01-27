import React from 'react'
import { Loader } from '@strapi/design-system';

const Loading = () => {
  return (
    <div className="loadingComponent">
        <Loader>Loading content...</Loader>
    </div>
  )
}

export default Loading