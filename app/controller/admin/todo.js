/*
 * @Author: scoyzhao
 * @Date: 2020-10-23 10:21:11
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-10-23 10:37:06
 */

'use strict';

const Controller = require('egg').Controller;

class TodoController extends Controller {
  async addTodo() {
    const { ctx, app } = this;
    const { content } = ctx.request.body;

    if (!content) {
      ctx.body = {
        code: 1,
        msg: '缺少content字段',
      };

      return false;
    }

    try {
      const result = await app.mysql.insert('todo', { content });

      if (result) {
        ctx.body = {
          code: 0,
          data: {},
          msg: '添加成功',
        };
      } else {
        ctx.body = {
          code: 1,
          msg: '添加失败',
        };
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        data: error,
        msg: 'server error',
      };
    }
  }

  async deleteTodo() {
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
      const result = await app.mysql.get('todo', {
        id,
      });

      if (!result) {
        ctx.body = {
          code: 1,
          msg: '内容不存在',
        };
      } else {
        const result = await app.mysql.delete('todo', {
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

  async updateTodo() {
    const { ctx, app } = this;
    const { id, isCompleted } = ctx.request.body;

    if (!id || isCompleted === undefined) {
      ctx.body = {
        code: 1,
        msg: '缺少id或isCompleted',
      };

      return false;
    }

    try {
      const type = await app.mysql.get('todo', {
        id,
      });

      if (!type) {
        ctx.body = {
          code: 1,
          msg: '内容不存在',
        };
      } else {
        const result = await app.mysql.update('todo', {
          id,
          isCompleted,
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

  async getTodoList() {
    const { ctx, app } = this;

    try {
      const result = await app.mysql.select('todo');
      // * 根据id查找
      if (result) {
        ctx.body = {
          code: 0,
          data: result,
          msg: '获取todo列表成功',
        };
      }
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

module.exports = TodoController;
