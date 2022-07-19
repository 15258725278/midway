import { Controller, Get, Inject, Provide } from '@midwayjs/decorator';
import { Context } from 'egg';
import { RenderService } from '../model/service/render';

@Provide()
@Controller('/')
export class HomeController {
  @Inject()
  renderService: RenderService;

  @Inject()
  ctx: Context;

  @Get('/')
  async home() {
    return 'Hello word!';
  }

  @Get('/register')
  async register() {
    return this.renderService.render('register', {});
  }

  @Get('/login')
  async login() {
    return this.renderService.render('login', {});
  }
}

