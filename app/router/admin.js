/*
 * @Author: scoyzhao
 * @Date: 2020-10-04 00:29:15
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-10-22 17:19:36
 */

'use strict';

module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth();

  // * 用户相关
  router.post('/user/login', controller.admin.user.login);
  router.get('/user/logout', controller.admin.user.logout);

  // * 类型相关
  router.post('/type/addType', auth, controller.admin.type.addType);
  router.post('/type/deleteType', auth, controller.admin.type.deleteType);
  router.post('/type/updateType', auth, controller.admin.type.updateType);
  router.post('/type/getTypeList', auth, controller.admin.type.getTypeList);

  // * 标签相关
  router.post('/tag/addTag', auth, controller.admin.tag.addTag);
  router.post('/tag/deleteTag', auth, controller.admin.tag.deleteTag);
  router.post('/tag/updateTag', auth, controller.admin.tag.updateTag);
  router.post('/tag/getTagList', auth, controller.admin.tag.getTagList);

  // * 博客管理
  router.post('/blog/addBlog', auth, controller.admin.blog.addBlog);
  router.post('/blog/deleteBlog', auth, controller.admin.blog.deleteBlog);
  router.post('/blog/updateBlog', auth, controller.admin.blog.updateBlog);
};
