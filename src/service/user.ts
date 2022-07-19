import { Provide, Inject } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { UserModel } from '../model/user.model';

@Provide()
export class UserService {
  @Inject()
  userModel: UserModel;

  // 将用户数据插入数据库
  async register(username: string, password: string) {
    return await this.userModel.add(username, password);
  }

  // 检查用户密码是否与数据库中匹配
  async login(username: string, password: string) {
    const user = await this.userModel.getUserByUsernameAndPassword(username, password);
    return user && user.password === password;

  }

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}
