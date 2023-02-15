import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import Cog from '@strapi/icons/Cog';
import Message from '@strapi/icons/Message';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/conservation`,
      icon: Message,
      intlLabel: {
        id: `conservation`,
        defaultMessage: 'Cuộc hội thoại',
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');
        return component;
      },
      permissions: [],
    });

    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: Cog,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'AI Kanbot',
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [],
    });

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
