/*
 * @Author: scoyzhao
 * @Date: 2020-11-07 17:01:41
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-11-07 17:05:53
 */

'use strict';

const Controller = require('egg').Controller;

class TypeController extends Controller {
  async getTypeList() {
    const { ctx } = this;

    try {
      const typeList = await ctx.service.type.getTypeList();
      ctx.body = {
        code: 0,
        data: {
          typeList,
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

module.exports = TypeController;
