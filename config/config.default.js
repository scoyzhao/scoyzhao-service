/*
 * @Author: scoyzhao
 * @Date: 2020-10-14 21:31:37
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-11-07 14:26:09
 */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1601741082182_8664';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: '120.27.247.30',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'Asdf_123147',
      // database
      database: 'react_blog',
      dateStrings: true,
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
    // TODO optimize csrf
    csrf: { enable: false },
    domainWhiteList: [ '*' ],
  };

  config.cors = {
    origin: ctx => {
      // NOTE 支持多个域名的跨域，原本框架不支持
      const whiteList = [ 'http://localhost:3000', 'http://127.0.0.1:3000' ];
      const url = ctx.header.referer.substr(0, ctx.header.referer.length - 1);
      if (whiteList.includes(url)) {
        return url;
      }

      return 'http://120.27.247.30:3000';
    },
    credentials: true, // 开启认证
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  return {
    ...config,
    ...userConfig,
  };
};
