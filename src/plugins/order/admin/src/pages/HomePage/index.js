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
  ContentLayout,
  Stack
} from '@strapi/design-system';

import { findManyOrder, createOrder, updateOrder, deleteOrder } from '../../api/Order';
import { ArrowLeft, Pencil, Plus } from '@strapi/icons';
import SideNav from '../../components/SideNav';
import Loading from '../../components/Loading';

import OrderTable from './components/OrderTable';
import CreateOrder from './components/CreateOrder';
import UpdateOrder from './components/UpdateOrder';
import DialogDelete from './components/DialogDelete';

import '../style.css'

const index = () => {

    const [Orders, setOrders] = useState([]);
    const [OrderCreate, setOrderCreate] = useState(false);
    const [OrderUpdate, setOrderUpdate] = useState(false);
    const [OrderDelete, setOrderDelete] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    async function HandleGetOrders () {
        setIsLoading(true);
        const response = await findManyOrder();
        if(response){
            setOrders(response)
        }
        setIsLoading(false);
    }

    async function HandleCreateOrder (data) {
        setIsLoading(true);
        await createOrder(data);
        await HandleGetOrders();
        setIsLoading(false);
    }

    async function HandleUpdateOrder (id, data) {
        setIsLoading(true);
        await updateOrder(id, data);
        await HandleGetOrders();
        setIsLoading(false);
    }

    async function HandleDeleteOrder (id) {
        setIsLoading(true);
        await deleteOrder(id);
        await HandleGetOrders();
        setIsLoading(false);
    }

    useEffect( async () => {
        if(!Orders.length) {
            await HandleGetOrders();
        }
    }, [])

    useEffect(() => {
        console.log(OrderDelete);
    }, [OrderDelete])
    
    
    return (
        <>
        <Layout>
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
                                <Button onClick={() => { setOrderCreate(true)} } variant="primary" startIcon={<Plus />}>
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
                        // Create Modal
                        OrderCreate ? 
                        <CreateOrder
                            setOrderCreate={setOrderCreate}
                            HandleCreateOrder={HandleCreateOrder}
                        />
                        : OrderUpdate ? 
                        <UpdateOrder 
                            OrderUpdate={OrderUpdate}
                            setOrderUpdate={setOrderUpdate}
                            HandleUpdateOrder={HandleUpdateOrder}
                        />
                        : OrderDelete ? 
                        <DialogDelete 
                            OrderDelete={OrderDelete}
                            setOrderDelete={setOrderDelete}
                            HandleDeleteOrder={HandleDeleteOrder}
                        />:
                        <OrderTable 
                            Orders={Orders}
                            setOrderCreate={setOrderCreate}
                            setOrderUpdate={setOrderUpdate}
                            setOrderDelete={setOrderDelete}
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
