'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async login() {
    const { ctx, app } = this
    const { userName, password } = ctx.request.body
    const sql = `SELECT count(*) FROM user WHERE user_name = '${userName}' AND password = '${password}'`
    console.log("AdminController -> login -> sql", sql)

    try {
      const res = await app.mysql.query(sql)

      if (res.length > 0) {
        const openId = new Date().getTime()

        ctx.session.openId = { 'openId': openId }
        ctx.body = { 'data': '登录成功', 'openId': openId }
      } else {
        this.ctx.body = { data: '登录失败' }
      }
    } catch (error) {
      console.log("AdminController -> login -> error", error)
      this.ctx.body = { data: '系统错误' }
    }
  }
}

module.exports = AdminController
