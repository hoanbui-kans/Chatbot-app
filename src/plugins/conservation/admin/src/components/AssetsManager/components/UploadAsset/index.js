import React, { useState, useEffect, useRef  } from 'react'
import {  Stack, Typography, Flex } from '@strapi/design-system';
import { FileUploader } from 'react-drag-drop-files';
import { request } from '@strapi/helper-plugin';
import axios from 'axios';

const index = ({ HandleUploadAsset }) => {

  const fileTypes = ["JPG", "PNG", "GIF"];
  const [files, setFiles] = useState(null);
  const formRef = useRef(null);

  const handleChange = async (files) => {
    setFiles(files);
    await HandleUploadAsset(files);
  };

  return (
   <>
    <Stack padding={6} spacing={6} textAlign="center">
        <Typography variant="beta">Tải ảnh lên</Typography>
        <Flex className="uploadBox" style={{ display: 'flex', alignItem: 'center'}} justifyContent="center">
          <FileUploader style={{height: 120, width: 200}} handleChange={handleChange} name="file" types={fileTypes} multiple/>
        </Flex>
    </Stack>
   </>
  )
}

export default index