/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from 'react';
import pluginId from '../../pluginId';
import { 
  Layout, 
  HeaderLayout, 
  Button, 
  Link,
  Box,
  ContentLayout,
  Stack
} from '@strapi/design-system';

import { findManyProduct, createProduct, updateProduct, deleteProduct } from '../../api/Product';
import { ArrowLeft, Pencil, Plus } from '@strapi/icons';
import SideNav from '../../components/SideNav';
import Loading from '../../components/Loading';

import ProductTable from './components/ProductTable';
import CreateProductModal from './components/CreateProductModal';
import UpdateProductModal from './components/UpdateProductModal';
import DialogDeleteProduct from './components/DialogDeleteProduct';

import '../style.css'

const index = () => {

    const [entities, setEntities] = useState([]);
    const [ProductCreate, setProductCreate] = useState(false);
    const [ProductUpdate, setProductUpdate] = useState(false);
    const [ProductDelete, setProductDelete] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    async function HandleGetEntities () {
        setIsLoading(true);
        const response = await findManyProduct();
        if(response){
            setEntities(response)
        }
        setIsLoading(false);
    }

    async function HandleCreateProduct (data) {
        setIsLoading(true);
        await createProduct(data);
        await HandleGetEntities();
        setIsLoading(false);
    }

    async function HandleUpdateProduct (id, data) {
        setIsLoading(true);
        await updateProduct(id, data);
        await HandleGetEntities();
        setIsLoading(false);
    }

    async function HandleDeleteProduct (id) {
        setIsLoading(true);
        await deleteProduct(id);
        await HandleGetEntities();
        setIsLoading(false);
    }

    useEffect( async () => {
        if(!entities.length) {
            await HandleGetEntities();
        }
    }, [])

    useEffect(() => {
        console.log(ProductDelete);
    }, [ProductDelete])
    
    
    return (
        <>
        <Layout sideNav={<SideNav />}>
                    <HeaderLayout 
                        navigationAction={
                            <Link 
                                startIcon={<ArrowLeft />} 
                                to={`/plugins/${pluginId}/settings`}>
                                Trở lại
                            </Link>
                            }
                            primaryAction={
                                <Stack spacing={3} horizontal>
                                    <Button variant="secondary" startIcon={<Pencil />}>
                                        Tài liệu tham khảo
                                    </Button>
                                    <Button onClick={() => { setProductCreate(true)} } variant="primary" startIcon={<Plus />}>
                                        Thêm mới
                                    </Button>
                                </Stack>
                            } 
                            title="Trường dữ liệu"
                            subtitle="Trường dữ liệu nhận dạng" 
                            as="h2" 
                            />
                    <ContentLayout>
                        {
                            // Table
                            Array.isArray(entities) 
                            && entities.length 
                            && <ProductTable 
                                    entities={entities}
                                    setProductCreate={setProductCreate}
                                    setProductUpdate={setProductUpdate}
                                    setProductDelete={setProductDelete}
                                />
                        }
                        {
                            // Create Modal
                            ProductCreate && 
                            <CreateProductModal 
                                setIsLoading={setIsLoading}
                                setProductCreate={setProductCreate}
                                HandleCreateProduct={HandleCreateProduct}
                            />
                        }
                        {
                            // Edit Modal
                            ProductUpdate && 
                            <UpdateProductModal 
                                setIsLoading={setIsLoading}
                                ProductUpdate={ProductUpdate}
                                setProductUpdate={setProductUpdate}
                                HandleUpdateProduct={HandleUpdateProduct}
                            />
                        }
                        {
                            // Delete Dialogue 
                            ProductDelete && 
                            <DialogDeleteProduct 
                                setIsLoading={setIsLoading}
                                ProductDelete={ProductDelete}
                                setProductDelete={setProductDelete}
                                HandleDeleteProduct={HandleDeleteProduct}
                            />
                        }
                    </ContentLayout>
                    {
                        isLoading && <Loading />
                    }
            </Layout>
    </>
  )
}

export default index;
