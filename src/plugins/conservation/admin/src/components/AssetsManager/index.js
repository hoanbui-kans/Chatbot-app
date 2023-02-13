import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { 
    ModalLayout, ModalBody, ModalHeader, 
    ModalFooter, Button, Loader, Typography, 
    Table, Thead, Tbody, Tr, Td, Th, 
    Avatar, Stack, Checkbox,
    TFooter, Flex 
} from '@strapi/design-system';

import { Dots, NextLink, PageLink, Pagination, PreviousLink } from '@strapi/design-system';
import { request } from '@strapi/helper-plugin';
import { Plus } from '@strapi/icons';

import { getFolders, getFiles, uploadFile, deleteFile } from '../../api/AssetsMedia';

import TableAssets from './components/TableAssets';
import ViewAsset from './components/ViewAsset';
import UploadAsset from './components/UploadAsset';
import DeleteAsset from './components/DeleteAsset';

const index = ({ multipe, selectImages }) => {

    const history = useHistory();

    const [folders, setFolders] = useState([]);
    const [assets, setAssets] = useState([]);

    const [imageDelete, setImageDetete] = useState(false);
    const [imageUpload, setImageUpload] = useState(false);
    const [viewImage, setViewImage] = useState(false);

    const [selectedAsset, setSelectedAsset] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function HandlefetchFolders() {
        setIsLoading(true);
        const folders = await getFolders();
        setFolders(folders.data);
        setIsLoading(false);
    }

    async function HandlefetchAssets() {
        setIsLoading(true);
        const assets = await getFiles();
        setAssets(assets.results);
        setIsLoading(false);
    }

    async function HandleUploadAsset(files) {
        setIsLoading(true);
        const assets = await uploadFile(files);
        console.log(assets);
        setIsLoading(false);
    }

    async function HanleDeleteAsset() {
        setIsLoading(true);
        const assets = await getFiles();
        deleteFile(imageDelete);
        setIsLoading(false);
    }

    useEffect(() => {
        HandlefetchFolders();
        HandlefetchAssets();
    }, []);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const openModal = (asset) => {
        setSelectedAsset(asset);
        setIsModalOpen(true);
    };


    const handleImageUpload = () => {
        setImageUpload(true);
    }

    return (
        <>
            <ModalLayout onClose={() => setIsModalOpen(prev => !prev)} labelledBy="title">
                <ModalHeader>
                    <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                        Thư viện hình ảnh
                    </Typography>
                </ModalHeader>
                <ModalBody>
                    {
                        isLoading ? 
                        <Loader  /> : 
                        <TableAssets 
                            assets={assets}
                        />
                    }
                </ModalBody>
                <ModalFooter 
                    startActions={<Button onClick={() => setIsModalOpen(prev => !prev)} variant="tertiary">Hủy</Button> } 
                    endActions={
                        <>
                            <Button variant="secondary" onClick={handleImageUpload}>Tải ảnh lên</Button>
                            <Button onClick={() => setIsModalOpen(prev => !prev)}>Hoàn tất</Button>
                        </>
                    } />
            </ModalLayout>
            
            {
                imageUpload ? 
                <ModalLayout onClose={() => setImageUpload(false)} labelledBy="title">
                    <ModalHeader>
                        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                            Tải ảnh lên
                        </Typography>
                    </ModalHeader>
                    <ModalBody>
                        <UploadAsset HandleUploadAsset={HandleUploadAsset}/> 
                    </ModalBody>
                </ModalLayout> : ""
            }
        </>
      );
}

export default index;