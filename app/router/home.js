/*
 * @Author: scoyzhao
 * @Date: 2020-10-04 00:29:15
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-10-16 01:38:35
 */

'use strict';

module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth();

  // * 测试auth接口
  router.get('/home', auth, controller.home.index.index);
};
