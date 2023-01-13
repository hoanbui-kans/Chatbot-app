
import Logo from './extensions/logo.svg';
import Favicon from './extensions/favicon.png';
import IconLogo from './extensions/iconLogo.svg';
import { Button } from '@strapi/design-system';
import Archive from '@strapi/icons/Archive';
import Home from './extensions/admin/Home';

const config = {
  head: {
    title: "kanbot",
    favicon: Favicon,
  },
  auth: {
    logo: Logo
  },
  menu: {
    logo: IconLogo,
    defaultMessage: 'Kanbot'
  },
  locales: [
     'en', 'vi'
  ], 
  admin: {
    tutorials: {
      links: [],
    },
    homePage: {
      right: []
    }
  },
  theme: {
      light: {
        colors: {
          // primary100: '#f6ecfc',
          // primary200: '#e0c1f4',
          // primary500: '#ac73e6',
          // primary600: '#9736e8',
          // primary700: '#8312d1',
          // danger700: '#b72b1a'
        },
    },
  },
  translations: {
    en: {
      "app.components.LeftMenu.navbrand.title": "Kan solution",
      "app.components.LeftMenu.navbrand.workplace": "Bảng điều khiển",
      "Auth.form.welcome.subtitle": "Đăng nhập vào Kanbot",
      "app.components.HomePage.welcome.again": "Hi Chloé!",
      "content-type-builder.plugin.name": "Quản trị nội dung",
      "global.content-manager": "Quản lý dữ liệu",
      "upload.plugin.name": "Quản lý file",
      "app.components.LeftMenu.plugins": "Ứng dụng",
      "app.components.LeftMenu.general": "Tổng quan",
      "global.profile": "Trang cá nhân",
      "app.components.LeftMenu.logout": "Đăng xuất",
      "app.components.LeftMenu.settings": "Cài đặt",
  },
  // Disable video tutorials
  tutorials: false,
   // Disable notifications about new Strapi releases
  notifications: { release: false },
},
}; 

const bootstrap = (app) => { 
  console.log(app);

  app.addMenuLink({
    to: `/admin`,
    icon: Archive,
    intlLabel: {
      id: `home`,
      defaultMessage: 'Ok',
    },
    Component: async () => {
      const component = await import(/* webpackChunkName: "[request]" */ './extensions/admin/Home');

      return component;
    },
  });

  app.injectAdminComponent('tutorials', 'links', {
    name: 'content-top',
    Component: () => (
      <Button style={{ backgroundColor: 'red', borderColor: 'red', marginBottom: '24px' }}>
        content-top
      </Button>
    ),
  });
};

export default {
  config,
  bootstrap,
};
