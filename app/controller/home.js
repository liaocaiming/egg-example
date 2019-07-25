'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const dataList = {
      list: [
        { id: 1, title: 'this is news 1', url: '/news/1' },
        { id: 2, title: 'this is news 2', url: '/news/2' },
      ],
    };

    // const result = await ctx.curl('h', {
    //   // 自动解析 JSON response
    //   dataType: 'json',
    //   // 3 秒超时
    //   timeout: 3000,
    // });
    // console.log(result);
    await ctx.render('home.nj', dataList);
  }
}

module.exports = HomeController;
