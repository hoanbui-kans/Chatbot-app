import React,  { useState } from 'react';

import { Flex, Box, TextButton } from '@strapi/design-system';
import pluginId from '../../pluginId';
import {
  SubNav,
  SubNavHeader,
  SubNavSection,
  SubNavSections,
  SubNavLink,
  SubNavLinkSection,
} from '@strapi/design-system';

import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';
import Apps from '@strapi/icons/Apps';
import Plus from '@strapi/icons/Plus';
import ChartCircle from '@strapi/icons/ChartCircle';
import ManyToMany from '@strapi/icons/ManyToMany';
import Discuss from '@strapi/icons/Discuss';
import Message from '@strapi/icons/Message';
import ChartBubble from '@strapi/icons/ChartBubble';

const SizeNav = () => {
  const [search, setSearch] = useState('');
  const iconSize = {
    width: 18,
    height: 18
  }
  const links = [{
    id: 1,
    label: 'Mục tiêu',
    icon: <Discuss style={iconSize} />,
    to: 'intents'
  }, {
    id: 2,
    label: 'Trường dữ liệu',
    icon: <ChartCircle style={iconSize} />,
    to: 'entities'
  }, {
    id: 3,
    label: 'Các đặc điểm',
    icon: <ChartBubble style={iconSize} />,
    to: 'traits',
    active: true
  }, {
    id: 4,
    label: 'Cấu trúc câu',
    icon: <Message style={iconSize} />,
    to: 'utterances'
  },{
    id: 5,
    label: 'Trình soạn thảo',
    icon: <ManyToMany style={iconSize} />,
    to: 'composer'
  }];
  return (
  <SubNav ariaLabel="Settings sub nav">

      <SubNavSections>
        <SubNavSection label="Kan bot">
          {links.map(link =>
                <SubNavLink to={`/plugins/${pluginId}/${link.to}`} active={link.active} icon={link.icon} key={link.id}>
                    {link.label}
                </SubNavLink>)}
        </SubNavSection>
      </SubNavSections>
    </SubNav>
  )
}

export default SizeNav;
