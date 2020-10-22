/*
 * @Author: scoyzhao
 * @Date: 2020-10-22 16:46:17
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-10-22 17:29:50
 */

'use strict';

const Controller = require('egg').Controller;

class BlogController extends Controller {
  async addBlog() {
    const { ctx, app } = this;
    const { title, abstract, type, tags, content } = ctx.request.body;

    if (!title) {
      ctx.body = {
        code: 1,
        msg: '缺少title字段',
      };

      return false;
    }

    if (!type) {
      ctx.body = {
        code: 1,
        msg: '缺少type字段',
      };

      return false;
    }

    const payload = {
      title,
      abstract,
      type,
      tags: tags ? tags.join(',') : '',
      content,
    };

    try {
      const result = await app.mysql.insert('blog', payload);
      console.log('BlogController -> addBlog -> result', result);
      if (result) {
        ctx.body = {
          code: 0,
          data: result.insertId,
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

  async deleteBlog() {
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
      const tag = await app.mysql.get('blog', {
        id,
      });

      if (!tag) {
        ctx.body = {
          code: 1,
          msg: '博客不存在',
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

  async updateBlog() {
    const { ctx, app } = this;
    const { id, payload } = ctx.request.body;

    if (!id || payload === undefined) {
      ctx.body = {
        code: 1,
        msg: '缺少id或修改的内容',
      };

      return false;
    }

    try {
      const blog = await app.mysql.get('blog', {
        id,
      });

      if (!blog) {
        ctx.body = {
          code: 1,
          msg: '博客不存在',
        };
      } else {
        if (payload.tags) {
          payload.tags = payload.tags.join(',');
        }

        const data = Object.assign({}, blog, payload);

        const result = await app.mysql.update('blog', {
          id,
          ...data,
        });
        console.log('BlogController -> updateBlog -> payload', payload);
        console.log('BlogController -> updateBlog -> Object.assign({}, payload, blog)', Object.assign({}, payload, blog));

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

  // TODO 多条件搜和单个搜
  async getBlogList() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;

    let mysql = 'SELECT * FROM blog';
    if (id) {
      mysql += ` WHERE id = ${id}`;
    }

    try {
      const result = await app.mysql.query(mysql);
      // * 根据id查找
      if (id) {
        if (!result.length) {
          ctx.body = {
            code: 1,
            data: {},
            msg: '标签不存在',
          };
        } else {
          ctx.body = {
            code: 0,
            data: result[0],
            msg: '获取标签成功',
          };
        }
      } else {
        ctx.body = {
          code: 0,
          data: result,
          msg: '获取标签列表成功',
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
}

module.exports = BlogController;
