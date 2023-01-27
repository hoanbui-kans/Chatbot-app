'use strict';

/**
 *  controller
 */

module.exports = ({strapi}) => ({
  async getSetting (ctx) {
    try {
      ctx.body = await strapi.plugin('kanbot')
                      .service('botsetting')
                      .findOne(ctx.params.id)
    } catch (error) {
      ctx.throw(403, error);
    }
  }
});
