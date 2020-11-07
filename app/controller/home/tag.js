/*
 * @Author: scoyzhao
 * @Date: 2020-11-07 17:01:26
 * @Last Modified by:   scoyzhao
 * @Last Modified time: 2020-11-07 17:01:26
 */

'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
  async getTagList() {
    const { ctx } = this;

    try {
      const tagList = await ctx.service.tag.getTagList();
      ctx.body = {
        code: 0,
        data: {
          tagList,
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

module.exports = TagController;
