import React, { useState } from 'react'
import pluginId from '../../pluginId';
import { 
  Layout,
  Box,
  BaseHeaderLayout,
  Button,
  ContentLayout,
  ActionLayout,
  Typography,
  Tooltip,
  Link,
  LinkButton 
} from '@strapi/design-system';
import Plus from '@strapi/icons/Plus';
import CreateBot from "../../components/Createbot";
import ArrowLeft from '@strapi/icons/ArrowLeft';
import File from '@strapi/icons/File';

const Addbot = () => {

  return <Box background="neutral100">
          <Layout>
            <>
              <BaseHeaderLayout 
                  navigationAction={
                  <Link 
                    startIcon={<ArrowLeft />} 
                    to={`/plugins/${pluginId}/settings`}>
                      Trở lại
                    </Link>
                  }
                  title="Thêm ứng dụng" 
                  subtitle="AI languages facebook" as="h2" 
                  primaryAction={
                  <Button variant="secondary" startIcon={<File />} onClick={() => setIsVisible(true)}>
                    Tài liệu hướng dẫn
                  </Button>}
              />
              <ContentLayout>
                <div className="add-bot">
                  <CreateBot />
                </div>
              </ContentLayout>
            </>
          </Layout>
        </Box>;
}

export default Addbot