import React,  { useState } from 'react';
import pluginId from '../../pluginId';
import {
  SubNav,
  SubNavSection,
  SubNavSections,
  SubNavLink,
} from '@strapi/design-system';
import Message from '@strapi/icons/Message';

const SizeNav = () => {

  const iconSize = {
    width: 18,
    height: 18
  }

  const links = [{
    id: 1,
    label: 'Facebook',
    icon: <Message style={iconSize} />,
    to: 'facebook'
  }, {
    id: 2,
    label: 'Instagram',
    icon: <Message style={iconSize} />,
    to: 'instagram'
  }, {
    id: 3,
    label: 'Zalo',
    icon: <Message style={iconSize} />,
    to: 'zalo',
    active: true
  }, {
    id: 4,
    label: 'Shoppee',
    icon: <Message style={iconSize} />,
    to: 'shopee'
  },
  {
    id: 5,
    label: 'Lazada',
    icon: <Message style={iconSize} />,
    to: 'lazada'
  },
  {
    id: 5,
    label: 'Tiktok',
    icon: <Message style={iconSize} />,
    to: 'tiktok'
  }
];

  return (
  <SubNav ariaLabel="Settings sub nav">
      <SubNavSections>
        <SubNavSection label="QUẢN LÝ KẾT NỐI">
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
