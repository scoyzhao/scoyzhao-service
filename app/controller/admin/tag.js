/*
 * @Author: scoyzhao
 * @Date: 2020-10-15 15:11:43
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-10-19 19:52:24
 */


'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
  async addTag() {
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
      const tag = await app.mysql.get('tag', {
        name,
      });

      if (tag) {
        ctx.body = {
          code: 1,
          msg: `标签${name}已存在`,
        };
      } else {
        const result = await app.mysql.insert('tag', payload);

        if (result) {
          ctx.body = {
            code: 0,
            data: {},
            msg: `添加标签${name}成功`,
          };
        } else {
          ctx.body = {
            code: 1,
            msg: `添加标签${name}失败`,
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

  async deleteTag() {
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
      const tag = await app.mysql.get('tag', {
        id,
      });

      if (!tag) {
        ctx.body = {
          code: 1,
          msg: '标签不存在',
        };
      } else {
        const result = await app.mysql.delete('tag', {
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

  async updateTag() {
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
      const tag = await app.mysql.get('tag', {
        id,
      });

      if (!tag) {
        ctx.body = {
          code: 1,
          msg: '标签不存在',
        };
      } else {
        const result = await app.mysql.update('tag', {
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

  async getTagList() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;

    let mysql = 'SELECT * FROM tag';
    if (id) {
      mysql += ` WHERE id = ${id}`;
    }

    try {
      const result = await app.mysql.query(mysql);
      ctx.body = {
        code: 0,
        data: result,
        msg: '获取标签列表成功',
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
