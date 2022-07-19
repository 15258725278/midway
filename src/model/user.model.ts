import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

export interface IUser {
  id: number;
  username: string;
  password: string;
}

@Scope(ScopeEnum.Singleton)
@Provide()
export class UserModel {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  async add(username: string, password: string) {
    // create a entity object
    const user = new UserEntity();
    user.username = username;
    user.password = password;

    // save entity
    const userResult = await this.userModel.save(user);

    // save success
    console.log('user id = ', userResult.id);
    return user;
  }

  async getUserByUsernameAndPassword(username: string, password: string) {
    const user = await this.userModel.findOne({
      where: {username, password},
    });
    if (user) {
      return user;
    }
    return null;
  }
}
