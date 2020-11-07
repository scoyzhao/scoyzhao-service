/*
 * @Author: scoyzhao
 * @Date: 2020-11-07 11:25:09
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-11-07 16:36:13
 */

'use strict';

const Service = require('egg').Service;

class BlogService extends Service {
  async getTopBlogList() {
    const { app } = this;

    const topBlogList = await app.mysql.select('blog', {
      where: { isTop: 1, isShow: 1 },
      columns: [ 'id', 'title', 'abstract', 'created_time', 'type', 'tags' ],
      orders: [[ 'created_time', 'desc' ]],
    });

    return topBlogList;
  }

  async getBlogListWithLimit({ limit = 5, isTop = 0 } = {}) {
    console.log('BlogService -> getBlogListWithLimit -> limit', limit);
    const { app } = this;
    const recentBlogList = await app.mysql.select('blog', {
      where: { isTop, isShow: 1 },
      columns: [ 'id', 'title', 'created_time', 'type', 'tags' ],
      orders: [[ 'created_time', 'desc' ]],
      limit,
    });

    return recentBlogList;
  }

  async getBlogList({ type, id }) {
    const { app } = this;

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

    return filterBlogList;
  }
}

module.exports = BlogService;
