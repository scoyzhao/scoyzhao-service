'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'scoyzhao-home api接口';
  }
}

module.exports = HomeController;
