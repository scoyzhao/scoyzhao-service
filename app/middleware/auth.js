/*
 * @Author: scoyzhao
 * @Date: 2020-10-14 21:23:55
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-10-14 21:32:49
 */

'use strict';

module.exports = () => {
  return async function auth(ctx, next) {
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = {
        code: 403,
        msg: '账号未登录',
      };
    }
  };
};
