/*
 * @Author: scoyzhao
 * @Date: 2020-11-07 16:38:37
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-11-07 17:07:06
 */

'use strict';

const Service = require('egg').Service;

class TagService extends Service {
  async getTagList() {
    const { app } = this;
    const tagList = await app.mysql.select('tag', {
      columns: [ 'id', 'name' ],
    });

    return tagList;
  }
}

module.exports = TagService;
