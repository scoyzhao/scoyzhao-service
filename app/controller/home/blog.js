/*
 * @Author: scoyzhao
 * @Date: 2020-11-07 11:32:56
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-11-11 16:03:46
 */

'use strict';

const Controller = require('egg').Controller;


class BlogController extends Controller {
  async getBlogListWithTop() {
    const { ctx } = this;
    const { limit } = ctx.request.body;

    try {
      const topBlogList = await ctx.service.blog.getTopBlogList();
      const recentBlogList = await ctx.service.blog.getBlogListWithLimit({ limit });

      ctx.body = {
        code: 0,
        data: {
          topBlogList,
          recentBlogList,
        },
        msg: '获取数据成功',
      };
    } catch (error) {
      ctx.body = {
        code: 1,
        data: error,
        msg: 'server error',
      };
    }
  }

  async getBlogList() {
    const { ctx } = this;
    const { type, id } = ctx.request.body;
    try {
      const blogList = await ctx.service.blog.getBlogList({ type, id });
      ctx.body = {
        code: 0,
        data: {
          blogList,
        },
        msg: '获取数据成功',
      };
    } catch (error) {
      ctx.body = {
        code: 1,
        data: error,
        msg: 'server error',
      };
    }
  }
}

module.exports = BlogController;
