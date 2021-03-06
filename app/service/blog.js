/*
 * @Author: scoyzhao
 * @Date: 2020-11-07 11:25:09
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-12-07 17:45:21
 */

'use strict';

const Service = require('egg').Service;

class BlogService extends Service {
  async getTopBlogList() {
    const { app, ctx } = this;
    const topBlogList = await app.mysql.select('blog', {
      where: { isTop: 1, isShow: 1 },
      columns: [ 'id', 'title', 'abstract', 'created_time', 'type', 'tags' ],
      orders: [[ 'created_time', 'desc' ]],
    });

    const result = await ctx.service.blog.formatBlogList(topBlogList);

    return result;
  }

  async getBlogListWithLimit({ limit = 5, isTop = 0 } = {}) {
    const { app, ctx } = this;
    const recentBlogList = await app.mysql.select('blog', {
      where: { isTop, isShow: 1 },
      columns: [ 'id', 'title', 'created_time', 'type', 'tags' ],
      orders: [[ 'created_time', 'desc' ]],
      limit,
    });

    const result = await ctx.service.blog.formatBlogList(recentBlogList);

    return result;
  }

  async getBlogList({ type, id, limit }) {
    const { app, ctx } = this;

    const blogList = await app.mysql.select('blog', {
      where: { isShow: 1 },
      columns: [ 'id', 'title', 'created_time', 'type', 'tags' ],
      orders: [[ 'created_time', 'desc' ]],
    });

    let filterBlogList = blogList;
    if (type) {
      if (type === 'type') {
        filterBlogList = blogList.filter(blog => {
          if (blog.type === id.toString()) {
            return true;
          }

          return false;
        });
      } else if (type === 'tag') {
        filterBlogList = blogList.filter(blog => {
          const tags = blog.tags.split(',');
          if (tags.includes(id.toString())) {
            return true;
          }

          return false;
        });
      }
    }

    if (limit) {
      filterBlogList = filterBlogList.slice(0, limit);
    }

    const result = await ctx.service.blog.formatBlogList(filterBlogList);

    return result;
  }

  async getBlogDetailById({ id }) {
    const { app, ctx } = this;

    const aBlog = await app.mysql.select('blog', {
      where: { id },
    });

    const aResult = await ctx.service.blog.formatBlogList(aBlog);
    return aResult[0];
  }

  async formatBlogList(blogList) {
    const { ctx } = this;

    return Promise.all(blogList.map(async blog => {
      return new Promise(async resolve => {
        const tags = await ctx.service.tag.getTagDataArryByIds(blog.tags.split(','));
        const type = await ctx.service.type.getTypeDataArryById(blog.type);

        Object.assign(blog, { tags, type });
        resolve(blog);
      });
    }));
  }
}

module.exports = BlogService;
