/*
 * @Author: scoyzhao
 * @Date: 2020-11-07 16:38:52
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-11-11 16:19:09
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

  async getTypeDataArryById(id) {
    const { app } = this;

    const result = await app.mysql.select('type', {
      columns: [ 'id', 'name' ],
      where: { id: Number.parseInt(id) },
    });

    return result[0];
  }
}

module.exports = TypeService;
