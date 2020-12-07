/*
 * @Author: scoyzhao
 * @Date: 2020-10-04 00:29:15
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-12-07 17:38:31
 */

'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/home/tag/getTagList', controller.home.tag.getTagList);
  router.get('/home/type/getTypeList', controller.home.type.getTypeList);

  router.post('/home/blog/getBlogListWithTop', controller.home.blog.getBlogListWithTop);
  router.post('/home/blog/getBlogList', controller.home.blog.getBlogList);
  router.post('/home/blog/getBlogDetailById', controller.home.blog.getBlogDetailById);
};
