import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { UserEntity } from '../entity/user.entity';
// import * as path from "path";

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1658198795873_5994';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  config.orm = {
    type: "sqlite",
    // database: path.join(__dirname, '../../test.sqlite'),
    database: ":memory:",
    dropSchema: true,
    entities: [UserEntity],
    synchronize: true,
    logging: false,
  };

  // config.security = {
  //   csrf: false,
  // };

  return config;
};
