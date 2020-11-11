/*
 * @Author: scoyzhao
 * @Date: 2020-11-07 16:38:37
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-11-11 15:34:46
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

  async getTagDataArryByIds(ids) {
    const { app } = this;
    const aBlogTagNumber = [];
    ids.map(id => {
      return aBlogTagNumber.push(Number.parseInt(id));
    });

    const result = await app.mysql.select('tag', {
      columns: [ 'id', 'name' ],
      where: { id: aBlogTagNumber },
    });

    return result;
  }
}

module.exports = TagService;
