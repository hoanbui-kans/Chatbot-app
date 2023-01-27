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
import { useParams } from 'react-router-dom';
import { ArrowLeft, Pencil } from '@strapi/icons';
import SideNav from '../../components/SideNav'
import Loading from '../../components/Loading';

import '../style.css'

const index = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { app_name } = useParams();

    return (
        <>
        <Layout sideNav={<SideNav />}>
                    <HeaderLayout 
                        navigationAction={
                            <Link 
                                startIcon={<ArrowLeft />} 
                                to={`/plugins/${pluginId}`}>
                                Trở lại
                            </Link>
                            }
                            primaryAction={
                                <Stack spacing={3} horizontal>
                                    <Button variant="secondary" startIcon={<Pencil />}>
                                        Tài liệu tham khảo
                                    </Button>
                                    <Button onClick={() => { setCreateModal(true)} } variant="primary" startIcon={<Pencil />}>
                                        Thêm mới
                                    </Button>
                                </Stack>
                            } 
                            title="Mục tiêu"
                            subtitle="AI languages facebook" 
                            as="h2" 
                            />
                    <ContentLayout>
                    
                    
                    </ContentLayout>
                    {
                        isLoading && <Loading />
                    }
            </Layout>
    </>
  )
}

export default index;
