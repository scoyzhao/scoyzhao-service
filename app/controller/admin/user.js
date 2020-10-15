/*
 * @Author: scoyzhao
 * @Date: 2020-10-14 01:05:26
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2020-10-16 01:19:21
 */
'use strict';

const Controller = require('egg').Controller;

class UserContorller extends Controller {
  async login() {
    const { ctx, app } = this;
    const { userName, password } = ctx.request.body;
    // const sql = `SELECT count(*) FROM user WHERE user_name = '${userName}' AND password = '${password}'`;
    // console.log('AdminController -> login -> sql', sql);

    try {
      const user = await app.mysql.get('user', {
        user_name: userName,
        password,
      });

      if (user) {
        const openId = new Date().getTime();

        ctx.session.openId = { openId };
        ctx.body = {
          code: 0,
          data: {
            openId,
          },
          msg: '登录成功',
        };
      } else {
        ctx.body = {
          code: 1,
          data: {},
          msg: '账号/密码错误',
        };
      }
    } catch (error) {
      // TODO 日志
      ctx.body = {
        code: 1,
        data: {
          error,
        },
        msg: 'server error',
      };
    }
  }

  async logout() {
    const { ctx } = this;
    try {
      ctx.session.openId = null;
      ctx.body = {
        code: 0,
        data: {},
        msg: '退出成功',
      };
    } catch (error) {
      ctx.body = {
        code: 1,
        data: {},
        msg: '退出失败',
      };
    }
  }
}

module.exports = UserContorller;
