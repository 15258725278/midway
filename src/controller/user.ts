import { Inject, Controller, Post, Provide } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user';

@Provide()
@Controller('/api/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/register')
  async register(): Promise<IGetUserResponse> {
    const { username, password } = this.ctx.request.body;
    console.log(this.ctx.request);
    console.log(this.ctx.request.body);
    if (!username || !password) {
      this.ctx.status = 500;
      return { success: false, message: '参数错误' };
    }
    const user = await this.userService.register(username, password);
    this.ctx.redirect('/login');
    return { success: true, message: 'OK', data: user };
  }

  @Post('/login')
  async login(): Promise<IGetUserResponse> {
    const { username, password } = this.ctx.request.body;
    const success = await this.userService.login(username, password);
    if (success) {
      // 成功登录
      this.ctx.cookies.set('my_session_data', JSON.stringify({ username }));
      this.ctx.redirect('/');
      // return {
      //   code: 200,
      //   result: "success",
      //   message: "登录成功",
      //   data: {
      //     token: "..."
      //   }
      // };
    } else {
      // 登录失败
      return ;
      // return {
      //   code: 400,
      //   result: "error",
      //   message: "账号或密码不正确",
      //   data: null
      // }
    }
  }
}
