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

const SizeNav = () => {
  const [search, setSearch] = useState('');
  const links = [{
    id: 1,
    label: 'Intents',
    icon: <ExclamationMarkCircle />,
    to: 'address'
  }, {
    id: 2,
    label: 'Entities',
    to: 'category'
  }, {
    id: 3,
    label: 'Traits',
    icon: <Apps />,
    to: 'city',
    active: true
  }, {
    id: 4,
    label: 'Utterances',
    to: 'country'
  },{
    id: 5,
    label: 'Composer',
    to: 'composer'
  }];
  return (
  <SubNav ariaLabel="Settings sub nav">
      <SubNavHeader label="Kan bot" />
      <SubNavSections>
        <SubNavSection label="Global Settings">
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
