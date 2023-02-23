import React from 'react';
import pluginId from '../../pluginId';
import {
  SubNav,
  SubNavSection,
  SubNavSections,
  SubNavLink,
} from '@strapi/design-system';
import ChartCircle from '@strapi/icons/ChartCircle';
import Discuss from '@strapi/icons/Discuss';
import Message from '@strapi/icons/Message';
import ChartBubble from '@strapi/icons/ChartBubble';
import ManyToMany from '@strapi/icons/ManyToMany';
import File from '@strapi/icons/File';
import { useParams } from 'react-router-dom';

const SizeNav = ({ pages }) => {

  console.log(pages);

  const { app_name } = useParams();

  const iconSize = {
    width: 18,
    height: 18
  }

  return (
      <SubNav ariaLabel="Settings sub nav">
          <SubNavSections>
            <SubNavSection label="Quản lý trang">
                <>
                  {
                    Array.isArray(pages) && pages.length ?
                        pages.map((page) => {
                          return (
                              <SubNavLink 
                                  to={`/plugins/${pluginId}/facebook/${page.page_id}`} 
                                  active={page.active} 
                                  key={page.id}>
                                  { page.title }
                              </SubNavLink>
                          )
                      }) : ""
                  }
                </>
            </SubNavSection>
          </SubNavSections>
      </SubNav>
  )
}

export default SizeNav;
