/*
 * @Author: scoyzhao
 * @Date: 2020-10-04 00:29:15
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-10-13 21:48:03
 */

'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/home', controller.home.index.index);
};
