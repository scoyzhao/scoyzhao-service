/*
 * @Author: scoyzhao
 * @Date: 2020-10-15 11:58:10
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-10-19 17:52:16
 */

'use strict';

const Controller = require('egg').Controller;

class TypeController extends Controller {
  async addType() {
    const { ctx, app } = this;
    const { name, description } = ctx.request.body;

    if (!name) {
      ctx.body = {
        code: 1,
        msg: '缺少name字段',
      };

      return false;
    }

    const payload = description ?
      {
        name,
        description,
      }
      : {
        name,
      };

    try {
      const type = await app.mysql.get('type', {
        name,
      });

      if (type) {
        ctx.body = {
          code: 1,
          msg: `类型${name}已存在`,
        };
      } else {
        const result = await app.mysql.insert('type', payload);

        if (result) {
          ctx.body = {
            code: 0,
            data: {},
            msg: `添加类型${name}成功`,
          };
        } else {
          ctx.body = {
            code: 1,
            msg: `添加类型${name}失败`,
          };
        }
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        data: error,
        msg: 'server error',
      };
    }
  }

  async deleteType() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;

    if (!id) {
      ctx.body = {
        code: 1,
        msg: '缺少id字段',
      };

      return false;
    }

    try {
      const type = await app.mysql.get('type', {
        id,
      });

      if (!type) {
        ctx.body = {
          code: 1,
          msg: '类型不存在',
        };
      } else {
        const result = await app.mysql.delete('type', {
          id,
        });

        if (result) {
          ctx.body = {
            code: 0,
            data: {},
            msg: '删除成功',
          };
        } else {
          ctx.body = {
            code: 1,
            msg: '删除失败',
          };
        }
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        data: error,
        msg: 'server error',
      };
    }
  }

  async updateType() {
    const { ctx, app } = this;
    const { id, description } = ctx.request.body;

    if (!id || description === undefined) {
      ctx.body = {
        code: 1,
        msg: '缺少id或description',
      };

      return false;
    }

    try {
      const type = await app.mysql.get('type', {
        id,
      });

      if (!type) {
        ctx.body = {
          code: 1,
          msg: '类型不存在',
        };
      } else {
        const result = await app.mysql.update('type', {
          id,
          description,
        });

        if (result) {
          ctx.body = {
            code: 0,
            data: {},
            msg: '更新成功',
          };
        } else {
          ctx.body = {
            code: 1,
            msg: '更新失败',
          };
        }
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        data: error,
        msg: 'server error',
      };
    }
  }

  async getTypeList() {
    const { ctx, app } = this;

    try {
      const result = await app.mysql.select('type');
      ctx.body = {
        code: 0,
        data: {
          result,
        },
        msg: '获取类型列表成功',
      };
    } catch (error) {
      ctx.body = {
        code: 1,
        data: {
          error,
        },
        msg: 'server error',
      };
    }
  }
}

module.exports = TypeController;
