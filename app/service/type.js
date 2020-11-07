/*
 * @Author: scoyzhao
 * @Date: 2020-11-07 16:38:52
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-11-07 17:06:55
 */

'use strict';

const Service = require('egg').Service;

class TypeService extends Service {
  async getTypeList() {
    const { app } = this;
    const typeList = await app.mysql.select('type', {
      columns: [ 'id', 'name' ],
    });

    return typeList;
  }
}

module.exports = TypeService;
