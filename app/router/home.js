/*
 * @Author: scoyzhao
 * @Date: 2020-10-04 00:29:15
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-11-07 17:04:37
 */

'use strict';

module.exports = app => {
  const { router, controller } = app;

  // * 测试auth接口
  router.get('/home', controller.home.index.index);

  router.get('/home/tag/getTagList', controller.home.tag.getTagList);
  router.get('/home/type/getTypeList', controller.home.type.getTypeList);

  router.post('/home/blog/getBlogListWithTop', controller.home.blog.getBlogListWithTop);
  router.post('/home/blog/getBlogList', controller.home.blog.getBlogList);
};
