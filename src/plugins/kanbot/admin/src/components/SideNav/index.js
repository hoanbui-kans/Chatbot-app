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
import { useParams } from 'react-router-dom';

const SizeNav = () => {

  const { app_name } = useParams();

  const iconSize = {
    width: 18,
    height: 18
  }

  const links = [ 
    {
      id: 'intents',
      label: 'Chiến dịch',
      icon: <Discuss style={iconSize} />,
      to: 'intents'
    }
  ,{
    id: 'entities',
    label: 'Trường dữ liệu',
    icon: <ChartCircle style={iconSize} />,
    to: 'entities'
  }, {
    id: 'traits',
    label: 'Các đặc điểm',
    icon: <ChartBubble style={iconSize} />,
    to: 'traits',
  }, {
    id: 'utterances',
    label: 'Cấu trúc câu',
    icon: <Message style={iconSize} />,
    to: 'utterances'
  }
];

  return (
      <SubNav ariaLabel="Settings sub nav">
          <SubNavSections>
            <SubNavSection label="Cấu trúc dữ liệu">
              {links.map( link =>
                    <SubNavLink 
                        to={`/plugins/${pluginId}/${app_name}/${link.to}`} 
                        active={link.active} 
                        icon={link.icon} key={link.id}>
                        {link.label}
                    </SubNavLink>)}
            </SubNavSection>
          </SubNavSections>
      </SubNav>
  )
}

export default SizeNav;
