import config from './config';
import models from '../database/models';
import createUserService from '../services/UserServices';
import bcrypt from 'bcrypt';
import 'colors';

const { User } = models;

export default () => {
  return new Promise(async (resolve, reject) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(config.adminAccountPassword, salt);

    const admin = await User.findOne({
      where: { username: config.adminAccountUsername },
    });

    if (!admin) {
      createUserService({
        name: config.adminAccountName,
        phoneNumber: config.adminAccountPhone,
        username: config.adminAccountUsername,
        password: hashedPassword,
        isVerified: config.adminIsVerified,
        roleId: 4,
      });
      resolve('Admin Registered Successfully'.green.bgBlue);
    } else {
      reject('Admin Already Registered'.bgRed.green);
    }
  });
};
